import styles from "./Post.module.css";

import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  return (
    <div className={styles.post_container}>
      {post && (
        <>
          <img
            className={styles.image_preview}
            src={post.image}
            alt={post.title}
          />
          <div>
            <h1 className={styles.title}>{post.title}</h1>
            <h3>Este post é sobre:</h3>
            <p>{post.body}</p>
            <div className={styles.tags}>
              {post.tagsArray.map((tag) => (
                <p key={tag}>
                  <span>#</span>
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
