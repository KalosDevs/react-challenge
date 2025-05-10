// components/Navbar/Navbar.tsx
import React from 'react';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar__logo']}>
      </div>
      <ul className={styles['navbar__links']}>
        <li className={styles['navbar__item']}>
          <a className={styles['navbar__link']} href="/">¡Compra por este medio!</a>
        </li>
        <li className={styles['navbar__item']}>
          <a className={styles['navbar__link--phone']} href="/contacto">
           <span className={styles['navbar__phone-icon']}></span>
            (01) 411 6001
           
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
