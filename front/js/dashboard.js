(function () {
  const token = localStorage.getItem('token');

  // Si no hay token, fuera
  if (!token) {
    location.href = './denied.html';
  }

  function isExpired(jwt) {
    try {
      const base64 = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(decodeURIComponent(escape(atob(base64))));
      if (!payload.exp) return false;
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch (e) {
      return true;
    }
  }

  if (isExpired(token)) {
    localStorage.removeItem('token');
    location.href = './denied.html';
  }

  const contentEl = document.getElementById('content');
  const roleBadge = document.getElementById('roleBadge');
  const logoutBtn = document.getElementById('logoutBtn');
  const tokenBox = document.getElementById('tokenBox');

  async function loadProfile() {
    try {
      const resp = await fetch(`${window.API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!resp.ok) {
        localStorage.removeItem('token');
        location.href = './denied.html';
        return;
      }

      const data = await resp.json();
      const user = data.user || {};
      roleBadge.textContent = (user.roles && user.roles.join(', ')) || 'usuario';

      contentEl.innerHTML = `
        <p><b>Bienvenido:</b> ${user.name || user.sub}</p>
        <p><b>Usuario:</b> ${user.sub}</p>
        <p><b>Roles:</b> ${(user.roles || []).join(', ')}</p>
        <p>Este contenido proviene de un endpoint <i>protegido</i> validando tu JWT en el servidor.</p>
      `;

      // Pintamos el token en pantalla
      tokenBox.textContent = token;
    } catch (err) {
      localStorage.removeItem('token');
      location.href = './denied.html';
    }
  }

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    location.href = './index.html';
  });

  loadProfile();
})();
