function irParaAtividades(tipo) {
  localStorage.setItem("atividade", tipo);
  window.location.href = "atividades.html";
}

function mostrarTela(tela) {
  const java = document.getElementById("java");
  const ingles = document.getElementById("ingles");

  if (!java || !ingles) return;

  java.classList.add("hidden");
  ingles.classList.add("hidden");

  if (tela === "java") {
    java.classList.remove("hidden");
  }

  if (tela === "ingles") {
    ingles.classList.remove("hidden");
  }
}

async function verificar(tipo) {
  // Alerta de confirmação para o usuário
  if (tipo === "java") {
    alert("Resposta Java enviada!");
  } else {
    alert("Resposta Inglês enviada!");
  }

  // Pega o ID do usuário logado gravado no localStorage
  const idUsuario = localStorage.getItem("id_usuario");
  
  // Associa o tipo da atividade ao id_atividades do seu banco
  // Altere os números 1 e 2 caso seus IDs sejam diferentes no MySQL
  const idAtividades = tipo === "java" ? 1 : 2; 

  if (!idUsuario) {
    console.error("Usuário não identificado no localStorage.");
    return;
  }

  try {
    // Envia os dados para a API Node.js salvar na tabela Usuario_realiza_Atividades
    const resposta = await fetch("http://localhost:3000/atividades/realizar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_usuario: idUsuario,
        id_atividades: idAtividades
      })
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      console.error("Erro ao registrar no banco de dados:", resultado.erro);
    } else {
      console.log("Atividade registrada com sucesso!");
    }
  } catch (erro) {
    console.error("Erro de conexão com o servidor:", erro);
  }
}

window.addEventListener("load", () => {
  const tipo = localStorage.getItem("atividade");

  if (tipo) {
    mostrarTela(tipo);
    localStorage.removeItem("atividade");
  } else {
    mostrarTela("java"); // padrão
  }
});
