(function () {
  const form = document.getElementById('loginForm');
  const errorEl = document.getElementById('error');

  function showError(msg) {
    errorEl.textContent = msg || 'Error desconocido';
    errorEl.style.display = 'block';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.style.display = 'none';

    const username = form.username.value.trim();
    const password = form.password.value.trim();

    try {
      const resp = await fetch(`${window.API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || `Error ${resp.status}`);
      }

      const { token } = await resp.json();
      localStorage.setItem('token', token);
      // Redirige al dashboard
      location.href = './dashboard.html';
    } catch (err) {
      showError(err.message);
    }
  });
})();
