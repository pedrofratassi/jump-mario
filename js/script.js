const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const bullet = document.querySelector('.bullet'); 
const scoreElement = document.getElementById('score');

let pontos = 0;
let podePular = true; // Adiciona uma variável para controlar se o Mario pode pular



const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
  

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {


    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './imagem/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    clearInterval(loop);
  }
}, 10);

const jump = (puloAcertivo) => {
    mario.classList.add('jump');
  
    setTimeout(() => {
      mario.classList.remove('jump');
  
      if (puloAcertivo) {
        marcarPonto();
      }
  
      if (pontos >= 10) {
        // Quando o score atingir 10, adiciona o inimigo Bullet
        criarBullet(marioPosition);
      }
  
      podePular = true; // Permite pulos novamente após o término do pulo anterior
    }, 500);
  };

  const marcarPonto = () => {
    pontos++;
    scoreElement.innerText = pontos;

    if (pontos === 10) {
        // Quando o score atingir 10, torna o Bullet visível removendo a classe 'invisible'
        bullet.classList.remove('invisible');
    }

    if (pontos >= 10) {
        // Quando o score for maior ou igual a 10, adiciona o inimigo Bullet
        criarBullet(marioPosition);
    }
};

const criarBullet = (marioPosition) => {
    bullet.style.animation = 'bulletAnimation 5s infinite linear'; // Substitua 'bulletAnimation' pelo nome da sua animação
    bullet.style.left = '100%'; // Coloque a posição inicial à direita da tela
    bullet.style.bottom = `${marioPosition}px`; // Define a posição vertical igual à do Mario
};


const verificarColisaoBullet = (marioPosition) => {
    const bulletPosition = bullet.offsetLeft;

    // Lógica de verificação de colisão
    if (!bullet.classList.contains('invisible') && bulletPosition <= larguraDoMario && marioPosition <= alturaDoBullet) {
        // Colisão detectada, faça algo aqui (por exemplo, fim do jogo, redução de pontos, etc.)
    }
};

document.addEventListener('keydown', () => {
    if (podePular) {
      jump(true);
      podePular = false; // Impede pulos consecutivos enquanto o Mario estiver no ar
    }
  });