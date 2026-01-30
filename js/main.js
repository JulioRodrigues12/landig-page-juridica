// DARK MODE
const darkToggle = document.getElementById('darkToggle');

darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// TOAST
function showToast(message, type) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}

// FORM + VALIDAÇÃO
document.getElementById('formContato').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nome = e.target.querySelector('input[type="text"]').value.trim();
  const email = e.target.querySelector('input[type="email"]').value.trim();
  const mensagem = e.target.querySelector('textarea').value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nome || !email || !mensagem) {
    showToast('Preencha todos os campos!', 'error');
    return;
  }

  if (!emailRegex.test(email)) {
    showToast('E-mail inválido!', 'error');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/res_form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, mensagem })
    });

    const data = await response.json();
    showToast(data.mensagem || 'Mensagem enviada!', 'success');
    e.target.reset();

  } catch (error) {
    showToast('Erro ao enviar mensagem', 'error');
    console.error(error);
  }
});
