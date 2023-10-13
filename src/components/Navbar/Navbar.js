import { NavLink } from "react-router-dom";

import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

import styles from "../Navbar/Navbar.module.css";
import { useState } from "react";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={styles.headerNav}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <nav className={styles.navbar}>
        <ul
          className={`${styles.links_list} ${showMenu ? styles.show : ""}`}
          onClick={toggleMenu}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Home
            </NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Entrar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Cadastrar
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink
                  to="/posts/create"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Novo Post
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  DashBoard
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              About
            </NavLink>
          </li>
          {user && (
            <li>
              <button onClick={logout}>Sair</button>
            </li>
          )}
        </ul>
      </nav>
      <div className={styles.menuButton} onClick={toggleMenu}>
        <span className={styles.linha}></span>
        <span className={styles.linha}></span>
        <span className={styles.linha}></span>
      </div>
    </header>
  );
};

export default Navbar;
