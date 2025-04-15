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
  document.getElementById("registerName").value = "";
  document.getElementById("registerEmail").value = "";
  document.getElementById("registerPassword").value = "";

  listarUsuarios();
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
    mostrarUsuarioLogado();
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
  document.getElementById("usuarioLogadoContainer").innerHTML = "";
}

function downloadUsers() {
  const users = getUsers();
  const blob = new Blob([JSON.stringify(users, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "users.json";
  a.click();

  URL.revokeObjectURL(url);
}

function listarUsuarios() {
  const users = getUsers();
  const listaContainer = document.getElementById("listaUsuarios");
  listaContainer.innerHTML = "<h2>Usuários Cadastrados</h2>";

  if (users.length === 0) {
    listaContainer.innerHTML += "<p>Nenhum usuário cadastrado.</p>";
    return;
  }

  users.forEach((user, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${user.name}</strong> - ${user.email}
      <button onclick="removerUsuario(${index})">Remover</button></p>
    `;
    listaContainer.appendChild(div);
  });
}

function removerUsuario(index) {
  let users = getUsers();
  users.splice(index, 1);
  saveUsers(users);
  listarUsuarios();
}

window.onload = function () {
  mostrarUsuarioLogado();
  listarUsuarios();
};
