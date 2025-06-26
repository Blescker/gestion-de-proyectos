# 🧠 Plataforma de Gestión de Proyectos con IA – PGP-IA-TP2

Proyecto del curso **Taller de Proyectos 2** – Universidad Continental  
Aplicación web MERN con integración de **Inteligencia Artificial** y contenedores Docker.

---

## 🌐 Tecnologías

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB + Socket.IO
- **IA:** LangChain + OpenAI
- **Infraestructura:** Docker + Docker Compose
- **Pruebas:** Jest, Cypress, Postman

---

## 📁 Estructura del Proyecto

```bash
PGP-IA-TP2/
├── gestion-APP/        # Frontend en React
├── backend/            # Backend en Node.js + Express
└── langchain-api/      # Servicio de IA con LangChain
```

---

## 🔧 Requisitos Previos

- Tener instalado [Docker](https://www.docker.com/products/docker-desktop)
- Tener instalado [Node.js](https://nodejs.org/) para ejecutar `npm install` localmente

> ⚠️ **IMPORTANTE**: Aunque Docker maneja las dependencias internas, **debes ejecutar `npm install` en tu máquina local** si deseas trabajar desde tu editor (VS Code, WebStorm, etc.), ya que los paquetes del contenedor **no se reflejan fuera** y podrías ver una carpeta `node_modules` vacía.

---

## 🚀 Pasos para Ejecutar el Proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/GiovannyLESM/PGP-IA-TP2.git
cd PGP-IA-TP2
```

---

### 2. Frontend (`gestion-APP`)

```bash
cd gestion-APP
npm install        # Instalación local para evitar errores en el editor
docker-compose up --build
```

Accede a: [http://localhost:5173](http://localhost:5173)

---

### 3. Backend (`backend`)

```bash
cd backend
npm install
docker-compose up --build
```

---

### 4. Servicio de IA (`langchain-api`)

```bash
cd langchain-api
npm install
docker-compose up --build
```

---

### 🔁 Reiniciar sin reconstruir contenedores

```bash
docker-compose up
```

Usa este comando si **no cambiaste dependencias ni el Dockerfile**.

---

### 🛑 Detener contenedores

```bash
docker-compose down
```

---

## 🔐 Variables de Entorno

- `backend/.env`:

  ```env
    PORT=5000
    MONGO_URI=url_de_tu_base_mongo
    JWT_SECRET=clave_secreta_segura
    LANGCHAIN_URL=http://tu-ip-actual-de-la-pc
  ```

- `langchain-api/.env`:

  ```env
  OPENAI_API_KEY=tu_api_key_de_openai
  ```

- `gestion-APP/.env` (Frontend):
  ```env
  VITE_API_BASE_URL=http://localhost:5000/api
  VITE_SOCKET_URL=http://localhost:5000
  ```

Estas variables permiten una fácil configuración para despliegue local y remoto. Asegúrate de actualizarlas según el entorno.

---

## 🧪 Pruebas

- **Frontend (Cypress):**
  ```bash
  cd gestion-APP
  npm run cypress:open
  ```

---

## 🛠️ Problemas Comunes

| Error                                         | Solución                                                                         |
| --------------------------------------------- | -------------------------------------------------------------------------------- |
| `Connection refused` entre frontend y backend | Asegúrate de que todos los contenedores están activos y usan la misma red Docker |
| `401 Unauthorized`                            | Verifica que se está enviando correctamente el token JWT                         |
| `docker-compose up` falla                     | Ejecuta `docker system prune -a` y verifica los archivos `Dockerfile` y `.env`   |

---

## 📚 Enlaces de Documentación

- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Docker](https://docs.docker.com/)
- [LangChain](https://js.langchain.com/docs/)

---

## 👨‍💻 Autor

**Braulio Cesar Ortega Batalla**  
📧 75142209@continental.edu.pe

---
