import styles from "./DashBoard.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useState } from "react";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;

  const { documents: posts } = useFetchDocuments("posts", null, uid);
  const { deleteDocument } = useDeleteDocument("posts");

  const totalPages = posts ? Math.ceil(posts.length / documentsPerPage) : 0;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  console.log(uid);
  console.log(posts);

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie o(s) seu(s) post(s).</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts.</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post.
          </Link>
        </div>
      ) : (
        <div className={styles.post_header}>
          <span>Título</span>
          <span>Ações</span>
        </div>
      )}

      {posts &&
        posts
          .slice(
            (currentPage - 1) * documentsPerPage,
            currentPage * documentsPerPage
          )
          .map((post) => (
            <div className={styles.post_row} key={post.id}>
              <p>{post.title}</p>
              <div className={styles.actions}>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">
                  Ver
                </Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                  Editar
                </Link>
                <button
                  onClick={() => deleteDocument(post.id)}
                  className="btn btn-outline btn-danger"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
      {posts && (
        <div className={styles.pagination}>
          <button
            className={
              currentPage === 1 ? styles.disabledPage : styles.activePage
            }
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <div className={styles.pageNumbers}>
            {pageNumbers.map((pageNumber) => (
              <button
                className={
                  currentPage === pageNumber
                    ? styles.disabledPageNumber
                    : styles.activePageNumber
                }
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                disabled={currentPage === pageNumber}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <button
            className={
              currentPage * documentsPerPage >= posts.length
                ? styles.disabledPage
                : styles.activePage
            }
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * documentsPerPage >= posts.length}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
