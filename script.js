const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('/sons/racionais vida loka parte 1 e 2_7OO5HMsEl4E.mp3') //Criar um objeto de áudio: Aprendemos a criar uma instância da classe de áudio usando a palavra-chave 'new';
const sonPlay = new Audio('/sons/play.wav')
const sonPause = new Audio('/sons/pause.mp3')
const sonFinalizando = new Audio('/sons/beep.mp3')


let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true //Configurar áudio para loop: Fizemos com que o áudio fique em loop contínuo ao definir a propriedade "loop" para "true".

//"Change" = evento de interruptor, Ligar e Desligar a Musica do Projeto"
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
 //Criar um objeto de áudio: Aprendemos a criar uma instância da classe de áudio usando a palavra-chave 'new';
})

focoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos = 1500
    alternarContexto('foco')
    focoBt.classList.add('active')

})

curtoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos = 300
    alternarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos = 900
    alternarContexto('descanso-longo')
    longoBt.classList.add('active')
})

//Refatorar o código: Identificamos linhas de código repetidas e refatoramos o código criando a primeira função do projeto alterarContexto.
function alternarContexto(contexto){
    mostrarTempo() 
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`/imagens/${contexto}.png`)
    //Utilizar o método switch: Aplicamos o método switch para alternar contextos e alterar a exibição de textos de acordo com o contexto;
    switch (contexto) {
        case "foco":
            //Alterar textos HTML com innerHTML: Aprendemos a alterar estrutura de conteúdo HTML com textos, tags e classes;
            titulo.innerHTML = `
            Otmize sua pordutividade,<br>
            <strong class="app__title-strong"> mergulhe no que importa. </strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?,
            <strong class="app__title-strong"> faça uma pausa curta. </strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superficie.
            <strong class="app__title-strong"> faça uma pausa longa. </strong>
            `
            break;    
        default:
            break;
    }
}

//Referente a "Contagem Regressiva"
const contagemRegressiva = () =>{
   if(tempoDecorridoEmSegundos <=0){
      sonFinalizando.play() //som no termino da contagem regressiva
      alert('Tempo finalizado')
      zerar()
      return
   }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()

}
startPauseBt.addEventListener('click', iniciarOuPausar)
    
//Refrente a Função do Botão "COMEÇAR"
function iniciarOuPausar(startPauseBt) {    
    if(intervaloId){
      sonPause.play() //Som no ato do "click" para Pausar a contagem regressiva - Add dentro do "If"
      zerar() 
      return   
    } 
    sonPlay.play() //Som no ato do "click" para início da contagem regressiva
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    iniciarOuPausarBtIcone.setAttribute('src',`/imagens/pause.png`)
}

//Referente Função para "PARAR" a contagem regressiva
function zerar(sonFinalizando){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Começar'
    iniciarOuPausarBtIcone.setAttribute('src',`/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pr-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`//Inserir temporizador na tela: Criamos a função “mostrarTempo()” e utilizamos o método innerHTML para mostrar o temporizador na tela.
}

mostrarTempo()