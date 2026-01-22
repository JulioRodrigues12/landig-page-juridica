document.getElementById('formContato').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nome = e.target.querySelector('input[type="text"]').value;
  const email = e.target.querySelector('input[type="email"]').value;
  const mensagem = e.target.querySelector('textarea').value;

  try {
    const response = await fetch('http://localhost:3000/res_form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, mensagem })
    });

    const data = await response.json();
    alert(data.mensagem);

    e.target.reset();
  } catch (error) {
    alert('Erro ao enviar mensagem');
    console.error(error);
  }
});
