document.addEventListener("DOMContentLoaded", function () {
    const ratings = document.querySelectorAll(".rating");

    ratings.forEach((rating) => {
        const stars = rating.querySelectorAll(".star");
        const notaTexto = rating.nextElementSibling; // O próximo elemento é o parágrafo da nota
        const usuario = rating.getAttribute("data-user"); // Obtém o usuário (Pedro ou Raissa)

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
                // Atualiza a nota novamente (para a nota salva)
                const value = getCurrentRating(stars); 
                updateStars(stars, value); // Atualiza as estrelas com a nota final

                // Atualiza a nota no texto
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
