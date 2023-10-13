import styles from "./Home.module.css";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");
  const naviGate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return naviGate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.titleposts}>Veja os nossos posts mais recentes.</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div className={styles.homePosts}>
        {loading && <p>Carregando posts...</p>}
        {posts &&
          posts.map((posts) => <PostDetail post={posts} key={posts.id} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foi possível encontrar os posts.</p>
            <Link to="/posts/createpost" className="btn">
              Criar primeiro Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
