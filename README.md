# Tidy

## Problemática

Los estudiantes con TDAH tienen dificultad para concentrarse, lo que lleva a que no puedan organizar sus actividades escolares con regularidad.

## Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)
- MySQL (si estás usando Supabase, asegúrate de tener las credenciales)

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/Tidy-Team/Tidy
   cd Tidy/backend
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en el directorio `backend/` y añade las siguientes variables:

   ```env
   PORT=3000
   CORS_ORIGIN="http://localhost:4000, http://localhost:3000"
   SECRET_KEY=your_secret_key
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_PORT=your_db_port
   API_KEY_RESEND=your_api_key_resend
   ```

## Uso

1. Inicia el servidor:

```sh
npm run dev
```

2. El servidor estará corriendo en `http://localhost:3000`.

## Endpoints

Puedes encontrar la documentación de los endpoints en el archivo [swagger.yaml](backend/config/swagger.yaml). Para ver la documentación en formato Swagger UI, navega a `http://localhost:3000/api-docs`.

## Estructura de Carpetas

- `src/app.js`: Punto de entrada de la aplicación.
- `src/modules/`: Contiene los diferentes módulos de la aplicación como `activities`, `auth`, `email`, etc.
- `src/config/`: Configuraciones de la base de datos, entorno, Swagger, etc.
- `src/helpers/`: Funciones de ayuda como `createError.js` y `generateJwt.js`.
- `src/middlewares/`: Middlewares de la aplicación como `corsMiddleware.js`, `sessionMiddleware.js`, etc.

## Contribuir

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
