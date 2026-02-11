// Estado do jogo
    let numeroSecreto = gerarNumero(0, 50);
    let tentativas = 5;
    let jogoAtivo = true;

    // Elementos
    const input = document.getElementById("guess");
    const statusEl = document.getElementById("status");
    const triesEl = document.getElementById("tries");
    const btnGuess = document.getElementById("btnGuess");
    const btnReset = document.getElementById("btnReset");

    function gerarNumero(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function atualizarTentativas() {
      triesEl.textContent = String(tentativas);
    }

    function setStatus(msg, tipo = "") {
      statusEl.classList.remove("danger", "success");
      if (tipo) statusEl.classList.add(tipo);
      statusEl.textContent = msg;
    }

    function finalizarJogoPerdeu() {
      jogoAtivo = false;
      btnGuess.disabled = true;
      btnReset.style.display = "inline-flex";
      input.disabled = true;

      // Mensagem pedida pelo enunciado
      setStatus("Infelizmente as suas tentativas acabaram, jogar novamente?!", "danger");

      // (Opcional, mas legal): pergunta e reinicia automaticamente se aceitar
      const quer = window.confirm("Infelizmente as suas tentativas acabaram, jogar novamente?!");
      if (quer) reiniciar();
    }

    function finalizarJogoGanhou() {
      jogoAtivo = false;
      btnGuess.disabled = true;
      btnReset.style.display = "inline-flex";
      input.disabled = true;

      // Mensagem pedida pelo enunciado
      setStatus(`Parabéns! Você acertou, o número era ${numeroSecreto}.`, "success");
    }

    function processarChute() {
      if (!jogoAtivo) return;

      const valor = input.value.trim();
      const chute = Number(valor);

      if (valor === "" || Number.isNaN(chute) || chute < 0 || chute > 50) {
        setStatus("Por favor, digite um número válido entre 0 e 50.");
        input.focus();
        return;
      }

      if (chute === numeroSecreto) {
        finalizarJogoGanhou();
        return;
      }

      // Errou
      tentativas--;

      if (tentativas > 0) {
        atualizarTentativas();
        // Mensagem pedida pelo enunciado
        setStatus(`Você errou! Você ainda possui ${tentativas} tentativa(s).`);
      } else {
        atualizarTentativas();
        finalizarJogoPerdeu();
      }

      input.select();
      input.focus();
    }

    function reiniciar() {
      numeroSecreto = gerarNumero(0, 50);
      tentativas = 5;
      jogoAtivo = true;

      atualizarTentativas();
      btnGuess.disabled = false;
      btnReset.style.display = "none";
      input.disabled = false;
      input.value = "";
      setStatus("Novo jogo! Faça um chute para começar!");
      input.focus();
    }

    // Eventos
    btnGuess.addEventListener("click", processarChute);
    btnReset.addEventListener("click", reiniciar);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") processarChute();
    });

    // Inicial
    atualizarTentativas();
    input.focus();
