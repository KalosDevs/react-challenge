import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeaderPasos.module.scss";
import { AfiliadoData } from "../../features/Home/types/afiliado";
import { User } from "../../types/user";

type HeaderPasosProps = {
  paso: 1 | 2;
  volverRuta: string;
  user?: User;
  afiliadoData?: AfiliadoData;
};

const HeaderPasos: React.FC<HeaderPasosProps> = ({ paso, volverRuta, user, afiliadoData }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.paso}>
          <div
            className={
              paso === 1 ? styles.circuloActivo : styles.circulo
            }
          >
            1
          </div>
          <div
            className={
              paso === 1 ? styles.labelActivo : styles.label
            }
          >
            Planes y coberturas
          </div>
        </div>
        <div className={styles.divider}>- - - -</div>
        <div className={styles.paso}>
          <div
            className={
              paso === 2 ? styles.circuloActivo : styles.circulo
            }
          >
            2
          </div>
          <div
            className={
              paso === 2 ? styles.labelActivo : styles.label
            }
          >
            Resumen
          </div>
        </div>
      </div>
      <div
        className={styles.volver}
        onClick={() => navigate(volverRuta, { state: { user, afiliadoData } })}
      >
        <div className={styles.volverIcon}></div>
        <div className={styles.volverText}>Volver</div>
      </div>
    </>
  );
};

export default HeaderPasos;