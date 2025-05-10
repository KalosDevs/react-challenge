# Reto Rimac Challenge

Este proyecto fue desarrollado como parte del Rimac Challenge utilizando [Create React App](https://github.com/facebook/create-react-app).

---

## 📦 Librerías y bibliotecas utilizadas

- **React**: Librería principal para la construcción de interfaces de usuario. Elegido por su eficiencia, modularidad y gran comunidad, ideal para construir interfaces de usuario modernas y escalables.
- **React Router DOM**: Para la navegación entre páginas y manejo de rutas.
- **Sass (SCSS)**: Para el manejo de estilos de forma modular y escalable.
- **classnames**: Para manejar clases condicionales en los componentes.
- **PropTypes / TypeScript**: (según configuración) Para tipado y validación de props.
- **Jest y React Testing Library**: Para pruebas unitarias y de integración.

### ¿Por qué estas librerías?
- **React** es el estándar de facto para SPAs modernas.
- **React Router DOM** facilita la navegación y el manejo de estados entre rutas.
- **Sass** permite escribir estilos más organizados y reutilizables.
- **classnames** simplifica la lógica de clases dinámicas.
- **Testing Library** y **Jest** aseguran la calidad del código mediante pruebas.

---

## 🛠️ División de tareas

- **Estructura y rutas**: Se definieron primero los componentes principales y las rutas usando React Router.
- **Componentes reutilizables**: Se crearon componentes como `HeaderPasos`, `OpcionSeleccion`, `Navbar`, etc., para mantener el código modular.
- **Estilos**: Se trabajó con SCSS Modules para aislar los estilos por componente y facilitar el mantenimiento.
- **Lógica de negocio**: Se implementó la lógica de filtrado de planes, manejo de estados y navegación.
- **Responsive y UX**: Se adaptó la interfaz para escritorio y mobile, incluyendo el carrusel de planes en mobile.
- **Testing**: Se agregaron pruebas unitarias para los componentes clave.

---

## 🚀 ¿Cómo levantar el proyecto?

1. **Clona el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd react-challenge