document.addEventListener("DOMContentLoaded", function () {
    const ratings = document.querySelectorAll(".rating");

    ratings.forEach((rating) => {
        const stars = rating.querySelectorAll(".star");
        const notaTexto = rating.nextElementSibling; // O próximo elemento é o parágrafo da nota
        const usuario = rating.getAttribute("data-user"); // Obtém o usuário (Pedro ou Raissa)
        const filme = rating.closest('.image').querySelector('.titulo').textContent.trim(); // Pega o título do filme

        // Gerar uma chave única para cada filme e usuário no localStorage
        const storageKey = `${usuario}-${filme}-rating`;

        // Carregar a nota salva do localStorage
        const savedRating = localStorage.getItem(storageKey);
        if (savedRating) {
            updateStars(stars, parseFloat(savedRating));
            notaTexto.innerText = `Nota: ${savedRating}`;
        } else {
            notaTexto.innerText = `Nota: 0`;
        }

        stars.forEach((star) => {
            // Quando o mouse passa sobre a estrela
            star.addEventListener("mouseenter", function () {
                const value = parseFloat(this.getAttribute("data-value"));
                updateStars(stars, value); // Atualiza as estrelas

                // Atualiza a nota dinamicamente
                notaTexto.innerText = `Nota: ${value}`;
            });

            // Quando o mouse sai da estrela, desfaz a marcação
            star.addEventListener("mouseleave", function () {
                const value = getCurrentRating(stars);
                updateStars(stars, value); // Atualiza as estrelas com a nota final

                // Atualiza a nota no texto
                notaTexto.innerText = `Nota: ${value}`;
            });

            // Quando a estrela é clicada, salva a nota no localStorage
            star.addEventListener("click", function () {
                const value = parseFloat(this.getAttribute("data-value"));
                localStorage.setItem(storageKey, value); // Salva a nota no localStorage com a chave única
                updateStars(stars, value);
                notaTexto.innerText = `Nota: ${value}`;
            });
        });
    });

    // Função para atualizar as estrelas
    function updateStars(stars, value) {
        stars.forEach((star) => {
            const starValue = parseFloat(star.getAttribute("data-value"));
            star.classList.remove("active", "full", "half");

            if (starValue <= Math.floor(value)) {
                star.classList.add("active", "full");
            } else if (starValue > Math.floor(value) && starValue < value) {
                star.classList.add("half");
            }
        });
    }

    // Função para obter a avaliação atual
    function getCurrentRating(stars) {
        let rating = 0;
        stars.forEach((star) => {
            if (star.classList.contains("full")) {
                rating += 1;
            } else if (star.classList.contains("half")) {
                rating += 0.5;
            }
        });
        return rating;
    }
});
