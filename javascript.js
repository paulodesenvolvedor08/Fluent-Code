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
  
  function verificar(tipo) {
    if (tipo === "java") {
      alert("Resposta Java enviada!");
    } else {
      alert("Resposta Inglês enviada!");
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