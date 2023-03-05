import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.wrapper}>
      <Link to={'/'}><title className={styles.mainTitle}>Main title</title></Link>
      <nav className={styles.navbar}>
        <div className={styles.burgerButton} onClick={toggleMenu}>
          <span></span>
        </div>
        <ul className={isOpen ? styles.menuActive : styles.menu}>
          <li>about</li>
          <li>somethin else</li>
          <li>contacts</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
