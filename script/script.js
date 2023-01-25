//selecionando o número aleatório
var numAleatorio = Math.floor(Math.random() * 100) + 1;

//guardando variáveis
var palpites = document.querySelector('.palpites');
var ultimoResultado = document.querySelector('.ultimoResultado');
var baixoOuAlto = document.querySelector('.baixoOuAlto');

var envioPalpite = document.querySelector('.envioPalpite');
var campoPalpite = document.querySelector('.campoPalpite');

var campoReinicio = document.querySelector('.reinitButtonSet');

var contagemPalpites = 1;
var botaoReinicio;
campoPalpite.focus();

function conferirPalpites() {
    var palpiteUsuario = Number(campoPalpite.value); //armazena o valor informado no campoPalpite
    if(contagemPalpites === 1){
        palpites.textContent = 'Palpites anteriores: '; //se for a primeira tentativa, adiciona a string ao parágrafo
    }
    palpites.textContent += palpiteUsuario + ' '; //adiciona o valor do palpite e um espaço ao parágrafo

    if(palpiteUsuario === numAleatorio) {
        ultimoResultado.textContent = 'Parabéns, você acertou!';
        ultimoResultado.style.color = 'green';
        baixoOuAlto.textContent = ' ';
        configFimDeJogo();
    }
    else if(contagemPalpites === 10) {
        ultimoResultado.innerHTML = `<p>!!!FIM DE JOGO!!!</p>`;
        ultimoResultado.innerHTML += `<p>O número correto era: ${numAleatorio}!</p>`;
        baixoOuAlto.textContent = ' ';
        configFimDeJogo();
    }
    else {
        ultimoResultado.textContent = 'Errado!';
        ultimoResultado.style.color = 'red';

        if(palpiteUsuario < numAleatorio){
            baixoOuAlto.textContent = 'Seu palpite está baixo!';
        }
        else if(palpiteUsuario > numAleatorio) {
            baixoOuAlto.textContent = 'Seu palpite está alto!';
        }
    }//condição de acerto e erro
    contagemPalpites ++;
    campoPalpite.value = ' ';
    campoPalpite.focus(); //mantém o cursor focado no input
}
envioPalpite.addEventListener('click', conferirPalpites); //Coloca o escutador de eventos para iniciar a função ao clicar no botão

function configFimDeJogo() {
    campoPalpite.disabled = true; //desabilita a opção de campo de palpite
    envioPalpite.disabled = true; //desabilita o botão de envio de palpite
    
    botaoReinicio = document.createElement('button'); //cria um botão novo para reiniciar o jogo
    botaoReinicio.textContent = 'Iniciar novo jogo'; //string que vai ficar no texto do botão
    botaoReinicio.setAttribute('class', 'reinitButton');
    campoReinicio.parentNode.appendChild(botaoReinicio);
    botaoReinicio.addEventListener('click', reiniciarJogo); //escutador para iniciar a função de reiniciar jogo

    envioPalpite.setAttribute('class', 'btnOff');
}

function reiniciarJogo() {
    contagemPalpites = 1; //volta a contagem para 1
    envioPalpite.setAttribute('class', 'envioPalpite');

    var reiniciarParas = document.querySelectorAll('.resultadoParas p');
    for (var i = 0; i < reiniciarParas.length; i++) {
        reiniciarParas[i].textContent = ''; //limpa todos os parágrafos da classe resultadoParas
    }

    campoPalpite.disabled = false; //habilita o campo de palpites novamente
    envioPalpite.disabled = false; //habilita o botão de envio do palpite novamente
    campoPalpite.value = ''; //limpa o campo de palpites
    campoPalpite.focus(); //coloca o cursor em foco no campo palpite novamente

    ultimoResultado.style.backgroundColor = 'transparent';
    campoReinicio.parentNode.removeChild(botaoReinicio);

    numAleatorio = Math.floor(Math.random() * 100) + 1; //escolhe um novo número aleatório entre 1 e 100
}