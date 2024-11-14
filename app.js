// Espera a que todo el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const cuadros = document.querySelectorAll('.cuadricula div');
    
    const resultadoMuestra = document.getElementById('vidas1');
    const resultadoMuestra2 = document.getElementById('vidas2');
    let win = document.getElementById('win');
    let ancho = 15;
    let posicionNave = 217;
    let posicionNave2 = 7;
    
    let vidas = 3;
    let vidas2 = 3;
    
    let naveActiva = true;
    let nave2Activa = true;

    cuadros[posicionNave].classList.add("nave");
    cuadros[posicionNave2].classList.add("nave2");

    function moverNave(e) {
        cuadros[posicionNave].classList.remove("nave");
        cuadros[posicionNave2].classList.remove("nave2");

        switch (e.code) {
            case 'ArrowLeft':
                if (posicionNave % ancho !== 0) posicionNave -= 1;
                break;
            case 'ArrowRight':
                if (posicionNave % ancho < ancho - 1) posicionNave += 1;
                break;
            case 'KeyA':
                if (posicionNave2 % ancho !== 0) posicionNave2 -= 1;
                break;
            case 'KeyD':
                if (posicionNave2 % ancho < ancho - 1) posicionNave2 += 1;
                break;
        }

        cuadros[posicionNave].classList.add("nave");
        cuadros[posicionNave2].classList.add("nave2");
    }
    
    document.addEventListener("keydown", moverNave);

    function disparo(e) {
        let laserId, laserId2;
        let posicionLaser = posicionNave;
        let posicionLaser2 = posicionNave2;

        function moverLaser() {
            cuadros[posicionLaser].classList.remove('laser');
            posicionLaser -= ancho;
            cuadros[posicionLaser].classList.add('laser');

            if (cuadros[posicionLaser].classList.contains('nave2') && nave2Activa) {
                cuadros[posicionLaser].classList.remove('laser');
                cuadros[posicionLaser].classList.add('boom');
                setTimeout(() => cuadros[posicionLaser].classList.remove("boom"), 250);
                clearInterval(laserId);
                vidas2--;
                resultadoMuestra2.textContent = vidas2;

                if (vidas2 <= 0) {
                    nave2Activa = false;
                    cuadros[posicionNave2].classList.remove('nave2');
                    verificarGanador();
                }
            }

            if (posicionLaser < ancho) {
                clearInterval(laserId);
                setTimeout(() => cuadros[posicionLaser].classList.remove('laser'), 100);
            }
        }

        function moverLaser2() {
            cuadros[posicionLaser2].classList.remove('laser');
            posicionLaser2 += ancho;
            cuadros[posicionLaser2].classList.add('laser');

            if (cuadros[posicionLaser2].classList.contains('nave') && naveActiva) {
                cuadros[posicionLaser2].classList.remove('laser');
                cuadros[posicionLaser2].classList.add('boom');
                setTimeout(() => cuadros[posicionLaser2].classList.remove("boom"), 250);
                clearInterval(laserId2);
                vidas--;
                resultadoMuestra.textContent = vidas;

                if (vidas <= 0) {
                    naveActiva = false;
                    cuadros[posicionNave].classList.remove('nave');
                    verificarGanador();
                }
            }

            if (posicionLaser2 > ancho * (ancho - 1)) {
                clearInterval(laserId2);
                setTimeout(() => cuadros[posicionLaser2].classList.remove('laser'), 100);
            }
        }

        switch (e.code) {
            case 'Space':
                laserId = setInterval(moverLaser, 100); 
                break;
            case 'KeyS':
                laserId2 = setInterval(moverLaser2, 100); 
                break;
        }
    }

    document.addEventListener('keyup', disparo);

    function verificarGanador() {
        if (vidas === 0) {
            win.textContent = "Ganaron los astronautas, estas fuera de esta orbita 🤪";
            cuadros[posicionNave].classList.add("boom");
            bloquearJuego();
        } else if (vidas2 === 0) {
            win.textContent = "Ganaron los aliens, una victoria fuera de esta galaxia 🤩";
            cuadros[posicionNave2].classList.add("boom");
            bloquearJuego();
        }
    }

    function bloquearJuego() {
        // Remover todos los láseres de la pantalla
        cuadros.forEach(cuadro => cuadro.classList.remove('laser'));

        // Remover las naves que perdieron
        if (vidas === 0) {
            cuadros[posicionNave].classList.remove('nave');
        } else if (vidas2 === 0) {
            cuadros[posicionNave2].classList.remove('nave2');
        }

        // Bloquear las teclas eliminando los event listeners
        document.removeEventListener("keydown", moverNave);
        document.removeEventListener("keyup", disparo);
    }
});
