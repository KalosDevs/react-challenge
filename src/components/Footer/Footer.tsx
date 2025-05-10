import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
    return (
        <footer className={styles['footer']}>
            <div className={styles['footer__container']}>
                <div className={styles['footer__logo']}></div>
                <div className={styles['footer__text']}>
                    © {new Date().getFullYear()} RIMAC Seguros y Reaseguros.
                </div>
            </div>
        </footer>
    );
};

export default Footer;