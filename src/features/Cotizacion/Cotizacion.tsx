// src/features/Cotizacion/Cotizacion.tsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Nabvar'; // Asegúrate de que la ruta sea correcta
import styles from './Cotizacion.module.scss';
import { usePlans } from './hooks/usePlans';
import { User } from '../../types/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { AfiliadoData } from '../Home/types/afiliado';
import OpcionSeleccion from './components/OpcionSeleccion';
import HeaderPasos from '../../components/HeaderPasos/HeaderPasos';

const Cotizacion: React.FC = () => {
  const [selected, setSelected] = useState<'parami' | 'paraotro' | null>(null);
  const [currentPlan, setCurrentPlan] = useState(0);
  const { plans, loading } = usePlans();
  const location = useLocation();
  const { user, afiliadoData } = (location.state || {}) as { user: User; afiliadoData: AfiliadoData };
  const navigate = useNavigate();

  function getAgeFromBirthday(birthday: string) {
    const [day, month, year] = birthday.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const getPlanPrice = (planPrice: number) => {
    if (selected === "paraotro") {
      return (planPrice * 0.95).toFixed(2); // 5% de descuento
    }
    return planPrice.toFixed(2);
  };

  const userAge = user?.birthDay ? getAgeFromBirthday(user.birthDay) : null;

  const filteredPlans = userAge !== null
    ? plans.filter(plan => userAge <= plan.age)
    : [];

  return (
    <>
      <Navbar />
      <div className={styles["planes-coberturas"]}>
        <div className={styles["planes-coberturas__header"]}>
          <HeaderPasos paso={1} volverRuta="/" user={user} afiliadoData={afiliadoData} />
        </div>

        <div className={styles["header-mobile"]}>
          <button
            className={styles["header-mobile__volver"]}
            onClick={() => navigate("/")}
            aria-label="Volver"
          >
            {"<"}
          </button>
          <span className={styles["header-mobile__paso"]}>PASO 1 DE 2</span>
          <div className={styles["header-mobile__progress"]}>
            <div className={styles["header-mobile__progress-bar"]}></div>
          </div>
        </div>
        <div className={styles["planes-coberturas__body"]}>

          <div className={styles["planes-coberturas__body__title"]}>
            {user?.name} ¿Para quién deseas cotizar?
          </div>
          <div className={styles["planes-coberturas__body__subtitle"]}>
            Selecciona la opción que se ajuste más a tus necesidades.
          </div>
          <div className={styles["planes-coberturas__body__content"]}>
            <div className={styles["planes-coberturas__body__content__seleccion"]}>
              <OpcionSeleccion
                selected={selected === "parami"}
                onClick={() => setSelected("parami")}
                iconClass={styles["planes-coberturas__body__content__seleccion__opcion__parami"]}
                title="Para mi"
                subtitle="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
              />
              <OpcionSeleccion
                selected={selected === "paraotro"}
                onClick={() => setSelected("paraotro")}
                iconClass={styles["planes-coberturas__body__content__seleccion__opcion__paraotro"]}
                title="Para alguien más"
                subtitle="Realiza una cotización para uno de tus familiares o cualquier persona."
              />
            </div>
            {selected && (
              <div className={styles["planes-coberturas__body__content__planes"]}>
                {loading ? (
                  <div>Cargando planes...</div>
                ) : (
                  <>
                    {/* Desktop: muestra todos */}
                    <div className={styles["planes-list-desktop"]}>
                      {filteredPlans.map((plan) => (
                        <div
                          className={styles["planes-coberturas__body__content__planes__plan"]}
                          key={plan.name}
                        >
                          <div className={styles["planes-coberturas__body__content__planes__plan__header"]}>
                            {plan.name === "Plan en Casa y Clínica" && (
                                <div className={styles["plan-recomendado"]}>
                                  Plan recomendado
                                </div>
                              )}
                            <div className={styles["planes-coberturas__body__content__planes__plan__header__title"]}>
                              
                              <div className={styles["planes-coberturas__body__content__planes__plan__header__title__text"]}>
                                {plan.name}
                              </div>
                              <div
                                className={[
                                  styles["planes-coberturas__body__content__planes__plan__header__title__icon"],
                                  plan.name === "Plan en Casa"
                                    ? styles["planes-coberturas__body__content__planes__plan__header__title__icon--casa"]
                                    : plan.name === "Plan en Casa y Clínica"
                                      ? styles["planes-coberturas__body__content__planes__plan__header__title__icon--clinica"]
                                      : plan.name === "Plan en Casa + Chequeo "
                                        ? styles["planes-coberturas__body__content__planes__plan__header__title__icon--chequeo"]
                                        : ""
                                ].join(" ")}
                              ></div>
                            </div>
                            <div className={styles["planes-coberturas__body__content__planes__plan__header__subtitle"]}>
                              <div className={styles["planes-coberturas__body__content__planes__plan__header__subtitle__text"]}>
                                COSTO DEL PLAN
                              </div>
                              <div className={styles["planes-coberturas__body__content__planes__plan__header__subtitle__price"]}>
                                $ {getPlanPrice(plan.price)} al mes
                              </div>
                            </div>
                            <div className={styles["planes-coberturas__body__content__planes__plan__header__linea"]}></div>
                          </div>
                          <div className={styles["planes-coberturas__body__content__planes__plan__beneficios"]}>
                            <ul className={styles["planes-coberturas__body__content__planes__plan__beneficios_list"]}>
                              {plan.description.map((desc, i) => (
                                <li
                                  className={styles["planes-coberturas__body__content__planes__plan__beneficios_list_item"]}
                                  key={i}
                                >
                                  {desc}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div
                            className={styles["planes-coberturas__body__content__planes__plan__confirmar"]}
                            onClick={() => navigate("/resumen", { state: { user, afiliadoData, cotizacion: plan } })}
                            style={{ cursor: "pointer" }}
                          >
                            <div className={styles["planes-coberturas__body__content__planes__plan__confirmar__text"]}>
                              Seleccionar Plan
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Mobile: solo el plan actual */}
                    <div className={styles["planes-list-mobile"]}>
                      <div className={styles["planes-carrusel-slider"]}
                        style={{
                          transform: `translateX(-${currentPlan * 100}%)`,
                          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)"
                        }}
                      >
                        {filteredPlans.map((plan) => (
                          <div
                            className={styles["planes-carrusel-slide"]}
                            key={plan.name}
                          >
                            <div className={styles["planes-coberturas__body__content__planes__plan"]}>
                              <div className={styles["planes-coberturas__body__content__planes__plan__header"]}>
                                <div className={styles["planes-coberturas__body__content__planes__plan__header__title"]}>
                                  <div className={styles["planes-coberturas__body__content__planes__plan__header__title__text"]}>
                                    {plan.name}
                                  </div>
                                  <div
                                    className={[
                                      styles["planes-coberturas__body__content__planes__plan__header__title__icon"],
                                      plan.name === "Plan en Casa"
                                        ? styles["planes-coberturas__body__content__planes__plan__header__title__icon--casa"]
                                        : plan.name === "Plan en Casa y Clínica"
                                          ? styles["planes-coberturas__body__content__planes__plan__header__title__icon--clinica"]
                                          : plan.name === "Plan en Casa + Chequeo "
                                            ? styles["planes-coberturas__body__content__planes__plan__header__title__icon--chequeo"]
                                            : ""
                                    ].join(" ")}
                                  ></div>
                                </div>
                                <div className={styles["planes-coberturas__body__content__planes__plan__header__subtitle"]}>
                                  <div className={styles["planes-coberturas__body__content__planes__plan__header__subtitle__text"]}>
                                    COSTO DEL PLAN
                                  </div>
                                  <div className={styles["planes-coberturas__body__content__planes__plan__header__subtitle__price"]}>
                                    $ {getPlanPrice(plan.price)} al mes
                                  </div>
                                </div>
                                <div className={styles["planes-coberturas__body__content__planes__plan__header__linea"]}></div>
                              </div>
                              <div className={styles["planes-coberturas__body__content__planes__plan__beneficios"]}>
                                <ul className={styles["planes-coberturas__body__content__planes__plan__beneficios_list"]}>
                                  {plan.description.map((desc, i) => (
                                    <li
                                      className={styles["planes-coberturas__body__content__planes__plan__beneficios_list_item"]}
                                      key={i}
                                    >
                                      {desc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div
                                className={styles["planes-coberturas__body__content__planes__plan__confirmar"]}
                                onClick={() => navigate("/resumen", { state: { user, afiliadoData, cotizacion: plan } })}
                                style={{ cursor: "pointer" }}
                              >
                                <div className={styles["planes-coberturas__body__content__planes__plan__confirmar__text"]}>
                                  Seleccionar Plan
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Controles carrusel */}
                      <div className={styles["planes-carrusel-controls"]}>
                        <button
                          className={styles["planes-carrusel-btn"]}
                          onClick={() => setCurrentPlan((prev) => Math.max(prev - 1, 0))}
                          disabled={currentPlan === 0}
                        >
                          {"<"}
                        </button>
                        <span className={styles["planes-carrusel-indicador"]}>
                          {filteredPlans.length > 0 ? `${currentPlan + 1} / ${filteredPlans.length}` : null}
                        </span>
                        <button
                          className={styles["planes-carrusel-btn"]}
                          onClick={() => setCurrentPlan((prev) => Math.min(prev + 1, filteredPlans.length - 1))}
                          disabled={currentPlan === filteredPlans.length - 1}
                        >
                          {">"}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cotizacion;