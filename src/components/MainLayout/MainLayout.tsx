import React from 'react';
import styles from './MainLayout.module.scss';
import Navbar from '../Navbar/Nabvar';
import Footer from '../Footer/Footer';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles['main-layout']}>
        <Navbar />
      <div className={styles['main-layout__background']}>
        <div className={`${styles['main-layout__blur']} ${styles['main-layout__blur--left']}`} />
        <div className={`${styles['main-layout__blur']} ${styles['main-layout__blur--right']}`} />
      </div>
      <div className={styles['main-layout__content']}>
        {children}
      </div>
       <Footer />
    </div>
  );
};

export default MainLayout;
