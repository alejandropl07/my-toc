# 🌱 Theory of Change (React + Tailwind)

Aplicación desarrollada en **React + Tailwind CSS** que permite construir, editar y visualizar una **Theory of Change (Teoría del Cambio)**.  
El proyecto incluye campos principales, gestión de supuestos (Assumptions), resultados directos e indirectos, impactos a largo plazo y guardado del estado.

---

## 🚀 Características principales

- 🧭 **Secciones principales:**
  - **The reason we exist** → Texto libre editable (textarea)
  - **The people we serve** → Etiquetas dinámicas (tags)
  - **Assumptions table** → Tabla editable y paginada con niveles de certeza
  - **Programmes, Direct outcomes, Indirect outcomes, Ultimate impact** → Cards con scroll y contenido dinámico

- 🧠 **Gestión de Assumptions:**
  - Añadir, editar o eliminar supuestos.
  - Control de certeza con colores de borde:  
    - 🟢 Very certain  
    - 🟡 Moderately certain  
    - 🔴 Uncertain

- 💾 **Botón de guardado (`Save`)** que muestra en consola los datos.

- 🧱 **Diseño modular** con componentes reutilizables:
  - `DirectResultsCard`
  - `OutcomeCard`
  - `ProgrammesCard`
  - `TimeLine`

- 🎨 **UI moderna con Tailwind CSS**
  - Bordes suaves, sombras ligeras, diseño responsive.
  - Paleta principal con color de marca `#7E1E9B`.

---

## 🧩 Tecnologías utilizadas

- **React 18+**
- **TypeScript**
- **Tailwind CSS**
- **Heroicons** (íconos de edición y eliminación)
- **Vite** (entorno de desarrollo rápido)

---

## ⚙️ Instalación y ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/alejandropl07/my-toc.git
   cd my-toc

2.  **Instalar dependencias**
npm install

3.  **Ejecutar el proyecto**
npm run dev

4.  **Abrir en el navegador**

http://localhost:5173


Desarrollado por: Alejandro Prieto León