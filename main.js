function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function register() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (!name || !email || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Digite um e-mail válido!");
    return;
  }

  if (password.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres!");
    return;
  }

  let users = getUsers();

  if (users.some(user => user.email === email)) {
    alert("E-mail já cadastrado!");
    return;
  }

  users.push({ name, email, password });
  saveUsers(users);

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("usuarioLogado", JSON.stringify(user));
    window.location.href = "bemvindo.html";
  } else {
    alert("Email ou senha inválidos!");
  }
}

function mostrarUsuarioLogado() {
  const user = JSON.parse(localStorage.getItem("usuarioLogado"));
  const container = document.getElementById("usuarioLogadoContainer");

  if (user && container) {
    container.innerHTML = `
      <h2>Bem-vindo, ${user.name}!</h2>
      <button onclick="logout()">Sair</button>
    `;
  }
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}

window.onload = function () {
  if (document.getElementById("usuarioLogadoContainer")) {
    mostrarUsuarioLogado();
  }
};
