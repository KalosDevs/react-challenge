import React from "react";
import styles from "./OpcionSeleccion.module.scss";

type OpcionSeleccionProps = {
  selected: boolean;
  onClick: () => void;
  iconClass: string;
  title: string;
  subtitle: string;
};

const OpcionSeleccion: React.FC<OpcionSeleccionProps> = ({
  selected,
  onClick,
  iconClass,
  title,
  subtitle,
}) => (
  <div
    className={
      styles["planes-coberturas__body__content__seleccion__opcion"] +
      (selected ? ` ${styles["planes-coberturas__body__content__seleccion__opcion--selected"]}` : "")
    }
  >
    <div className={styles["planes-coberturas__body__content__seleccion__opcion__check-row"]}>
      <div
        className={
          selected
            ? `${styles["planes-coberturas__body__content__seleccion__opcion__check"]} ${styles["planes-coberturas__body__content__seleccion__opcion__check--selected"]}`
            : styles["planes-coberturas__body__content__seleccion__opcion__check"]
        }
        onClick={onClick}
      />
    </div>
    <div className={iconClass}></div>
    <div className={styles["planes-coberturas__body__content__seleccion__opcion__title"]}>{title}</div>
    <div className={styles["planes-coberturas__body__content__seleccion__opcion__subtitle"]}>{subtitle}</div>
  </div>
);

export default OpcionSeleccion;