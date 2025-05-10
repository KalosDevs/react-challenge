import React, { useState } from 'react';
import styles from './Home.module.scss';
import { useFormValidation } from './hooks/useFormValidation';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { AfiliadoData } from './types/afiliado';


const Home: React.FC = () => {
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [hasValue, setHasValue] = useState({ 'document-number': false, phone: false });
    const [values, setValues] = useState({ 'document-number': '', phone: '' });
    const [checkboxes, setCheckboxes] = useState({
        privacy: false,
        communications: false,
    });
    const [checkboxErrors, setCheckboxErrors] = useState({
        privacy: "",
        communications: "",
    });
    const [docType, setDocType] = useState('dni');
    const { errors, validate, clearError } = useFormValidation();
    const { user} = useUser();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setValues(prev => ({ ...prev, [id]: value }));
        setHasValue(prev => ({ ...prev, [id]: value.length > 0 }));
        clearError(id as "document-number" | "phone");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let valid = validate(values, docType);

        let newCheckboxErrors = { privacy: "", communications: "" };
        if (!checkboxes.privacy) {
            newCheckboxErrors.privacy = "Debes aceptar la Política de Privacidad.";
            valid = false;
        }
        if (!checkboxes.communications) {
            newCheckboxErrors.communications = "Debes aceptar la Política de Comunicaciones Comerciales.";
            valid = false;
        }
        setCheckboxErrors(newCheckboxErrors);

        if (valid && user) {
            const afiliadoData: AfiliadoData = {
                documentType: docType,
                documentNumber: values["document-number"],
                phone: values.phone,
                communications: checkboxes.communications,
            };
            navigate("/cotizacion", { state: { user, afiliadoData } });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCheckboxes(prev => ({ ...prev, [name]: checked }));
        setCheckboxErrors(prev => ({ ...prev, [name]: "" }));
    };

    return (
        <div className={styles['home']}>
            <div className={styles['home__content']}>
                <div className={styles['home__grid']}>
                    <div className={styles['home__image-container']} />

                    <div className={styles['home__header']}>
                        <label className={styles['home__title']}>Seguro Salud Flexible</label>
                        <div className={styles['home__subtitle']}>Creado para ti y tu familia</div>
                    </div>

                    <div className={styles['home__divider']} />
                    <div className={styles['home__main-content']}>
                        <div className={styles['home__description']}>
                            Tú eliges cuanto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
                        </div>
                        {/* Aquí va el formulario */}
                        <form className={styles['home__form']} onSubmit={handleSubmit} noValidate>
                            <div className={styles['seguro-salud__form-group']}>
                                <div className={styles['seguro-salud__document-container']}>
                                    <select id="document-type"
                                        className={styles['seguro-salud__document-select']}
                                        value={docType}
                                        onChange={e => setDocType(e.target.value)}
                                    >
                                        <option value="dni">DNI</option>
                                        <option value="ce">CE</option>
                                        <option value="passport">Pasaporte</option>
                                        <option value="ruc">RUC</option>
                                    </select>
                                    <div className={styles['seguro-salud__input-container'] +
                                        (errors["document-number"] ? ` ${styles['input-error-space']}` : '')}>
                                        <input
                                            type="text"
                                            maxLength={8}
                                            className={
                                                styles['seguro-salud__input--documento'] +
                                                (errors["document-number"] ? ` ${styles['input-error']}` : '')
                                            }
                                            id="document-number"
                                            onFocus={() => setFocusedInput('document-number')}
                                            onBlur={() => setFocusedInput(null)}
                                            onChange={handleChange}
                                        />
                                        <label
                                            htmlFor="document-number"
                                            className={`${styles['seguro-salud__placeholder']} ${focusedInput === 'document-number' || hasValue['document-number'] ?
                                                styles['seguro-salud__placeholder--active'] : ''
                                                }`}
                                        >
                                            Nro. de documento
                                        </label>
                                    </div>
                                </div>
                                {errors["document-number"] && (
                                    <div className={styles['input-error-message']}>{errors["document-number"]}</div>
                                )}
                            </div>

                            <div className={styles['seguro-salud__form-group']}>
                                <div className={styles['seguro-salud__input-container'] +
                                    (errors.phone ? ` ${styles['input-error-space']}` : '')}>
                                    <input
                                        type="tel"
                                        maxLength={9}
                                        className={
                                            styles['seguro-salud__input'] +
                                            (errors.phone ? ` ${styles['input-error']}` : '')
                                        }
                                        id="phone"
                                        onFocus={() => setFocusedInput('phone')}
                                        onBlur={() => setFocusedInput(null)}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="phone"
                                        className={`${styles['seguro-salud__placeholder']} ${focusedInput === 'phone' || hasValue['phone'] ?
                                            styles['seguro-salud__placeholder--active'] : ''
                                            }`}
                                    >
                                        Celular
                                    </label>
                                </div>
                            </div>
                            {errors.phone && (
                                <div className={styles['input-error-message']}>{errors.phone}</div>
                            )}
                            <div className={styles['seguro-salud__checkbox-group'] +
                                (checkboxErrors.communications && checkboxErrors.privacy ? ` ${styles['input-group-error-checkbox']}` : '')}>
                                <label className={styles['seguro-salud__checkbox-label']}>
                                    <input type="checkbox"
                                        className={styles['seguro-salud__checkbox']}
                                        name="privacy"
                                        checked={checkboxes.privacy}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>Acepto la Política de Privacidad</span>
                                </label>
                                {checkboxErrors.privacy && (
                                    <div className={styles['input-error-message-checbox']}>{checkboxErrors.privacy}</div>
                                )}

                                <label className={styles['seguro-salud__checkbox-label']}>
                                    <input type="checkbox"
                                        className={styles['seguro-salud__checkbox']}
                                        name="communications"
                                        checked={checkboxes.communications}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>Acepto la Política de Comunicaciones Comerciales</span>
                                </label>
                                {checkboxErrors.communications && (
                                    <div className={styles['input-error-message-checbox']}>{checkboxErrors.communications}</div>
                                )}
                            </div>

                            <p className={styles['seguro-salud__terms']}>Aplican Términos y Condiciones.</p>

                            <button type="submit" className={styles['seguro-salud__submit']}>
                                Cotiza aquí
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;