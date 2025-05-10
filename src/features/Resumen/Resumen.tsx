import React from "react";
import { useLocation } from "react-router";
import { User } from "../../types/user";
import { AfiliadoData } from "../Home/types/afiliado";
import { Plan } from "../Cotizacion/types/plan";
import styles from "./Resumen.module.scss";
import Navbar from "../../components/Navbar";
import HeaderPasos from "../../components/HeaderPasos/HeaderPasos";

const Resumen: React.FC = () => {
    const location = useLocation();
    const { user, afiliadoData, cotizacion } = (location.state || {}) as {
        user: User;
        afiliadoData: AfiliadoData;
        cotizacion: Plan;
    };

    return (
        <>
            <Navbar />
            <div className={styles["header-pasos"]}>
<HeaderPasos paso={2} volverRuta="/cotizacion" user={user} afiliadoData={afiliadoData} />
            </div>
            
            <div className={styles["resumen"]}>
                <div className={styles["resumen__title"]}>Resumen del seguro</div>
                <div className={styles["resumen__content"]}>
                    <div className={styles["resumen__content__header"]}>
                        <div className={styles["resumen__content__header__title"]}>
                            Precios calculados para:
                        </div>
                        <div className={styles["resumen__content__header__subtitle"]}>
                            <div className={styles["resumen__content__header__subtitle__icon"]}></div>
                            <div className={styles["resumen__content__header__subtitle__text"]}>{user?.name} {user?.lastName}</div>
                        </div>
                    </div>
                    <div className={styles["resumen__content__body"]}>
                        <div className={styles["resumen__content__body__responsable"]}>
                            <div className={styles["resumen__content__body__responsable__item--title"]}>Responsable de pago</div>
                            <div className={styles["resumen__content__body__responsable__item"]}>
                            DNI: {afiliadoData?.documentNumber}
                            </div>
                            <div className={styles["resumen__content__body__responsable__item"]}>
                            Celular: {afiliadoData?.phone}
                            </div>
                        </div>
                        <div className={styles["resumen__content__body__plan-elegido"]}>
                            <div className={styles["resumen__content__body__plan-elegido__item--title"]}>Plan elegido</div>
                            <div className={styles["resumen__content__body__plan-elegido__item"]}>
                            {cotizacion?.name}
                            </div>
                            <div className={styles["resumen__content__body__plan-elegido__item"]}>
                            Costo del Plan: ${cotizacion?.price} al mes
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className={styles.resumen}>
      <h1>Resumen de Cotización</h1>
      <h2>Afiliado</h2>
      <p>Nombre: {user?.name}</p>
      <p>Documento: {afiliadoData?.documentType} {afiliadoData?.documentNumber}</p>
      <p>Teléfono: {afiliadoData?.phone}</p>
      <h2>Plan Seleccionado</h2>
      <p>Nombre: {cotizacion?.name}</p>
      <p>Precio: S/ {cotizacion?.price}</p>
      <ul>
        {cotizacion?.description?.map((desc, i) => (
          <li key={i}>{desc}</li>
        ))}
      </ul>
    </div> */}
        </>
    );
};

export default Resumen;