# JWT Demo con Node.js + XAMPP (Frontend/Backend separados)

Este proyecto es un **ejemplo educativo** que muestra cómo integrar un **login con JSON Web Tokens (JWT)** usando:

- **Frontend**: HTML, CSS y JS plano (servido por XAMPP/Apache).
- **Backend**: Node.js + Express + JWT para autenticación.

---

## 📌 Flujo de la aplicación
1. El usuario abre `index.html` (login).
2. Introduce usuario y contraseña (credenciales hardcodeadas en el backend).
3. El backend valida las credenciales y genera un **JWT**.
4. El frontend guarda el JWT en `localStorage` y redirige a `dashboard.html`.
5. En el **Dashboard**:
   - Se muestra el token JWT.
   - Se consulta un endpoint protegido (`/api/profile`) que requiere el JWT.
6. Si el usuario intenta entrar en `dashboard.html` sin token válido, será redirigido a `denied.html`.

---

## 📂 Estructura de carpetas

```
jwt-xampp-demo/
├─ front/                 # Archivos del frontend
│  ├─ index.html          # Pantalla de login
│  ├─ dashboard.html      # Panel protegido
│  ├─ denied.html         # Acceso denegado
│  ├─ css/styles.css      # Estilos
│  └─ js/                 # Lógica del cliente
│     ├─ login.js
│     └─ dashboard.js
└─ back/                  # Servidor Node.js (API REST JWT)
   ├─ server.js
   ├─ package.json
   └─ .env
```

---

## ⚙️ Requisitos

- Node.js (v18 o superior recomendado)  
- XAMPP (para servir el frontend en `htdocs`)  

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/jwt-xampp-demo.git
cd jwt-xampp-demo
```

### 2. Backend (Node.js)
Entra en la carpeta `back`:
```bash
cd back
```

Instala dependencias:
```bash
npm install
```

Crea un archivo `.env` en `back/` con el contenido:
```env
JWT_SECRET=mi_super_secreto
JWT_EXPIRES_IN=1h
PORT=3001
```

Arranca el servidor:
```bash
npm start
```

La API quedará disponible en:
```
http://localhost:3001
```

### 3. Frontend (XAMPP)
Copia la carpeta `front/` dentro de la carpeta `htdocs` de tu instalación de XAMPP.

Ejemplo en Windows:
```
C:\xampp\htdocs\jwt-xampp-demo\front\
```

Ejemplo en Linux/Mac:
```
/opt/lampp/htdocs/jwt-xampp-demo/front/
```

Arranca Apache desde el panel de control de XAMPP y accede en tu navegador a:
```
http://localhost/jwt-xampp-demo/front/index.html
```

---

## 👤 Usuarios de prueba

- **Admin**  
  Usuario: `admin`  
  Contraseña: `1234`

- **Usuario demo**  
  Usuario: `user`  
  Contraseña: `1234`

---

## 🔒 Seguridad (nota educativa)

Este proyecto está pensado **solo con fines educativos**:
- No usa base de datos (usuarios hardcodeados).
- El JWT se guarda en `localStorage` (para demo, no recomendado en producción).
- No implementa HTTPS ni rotación de tokens.

En producción deberías:
- Usar **HTTPS** obligatorio.
- Guardar tokens en cookies **HttpOnly + Secure**.
- Integrar base de datos de usuarios con contraseñas encriptadas.
- Usar refresh tokens y expiración corta.

---

## 📖 Licencia
Este proyecto se distribuye bajo licencia MIT.
