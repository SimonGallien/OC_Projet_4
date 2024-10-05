/*****************************************************************/
/**** Ce fichier contient les fonctions javascript de l'index ****/
/*****************************************************************/

/*** Gestion des filtres de la gallerie ***/

const galleryButtonFilters = document.querySelectorAll(".gallery-button-filters")

galleryButtonFilters.forEach(filter => {
    filter.addEventListener("click", function(event){
        event.preventDefault();

        // active-filters : background color dorée
        // Supprime la classe 'active-filters' de tous les boutons
        galleryButtonFilters.forEach(btn => btn.classList.remove("active-filters"))

        // Ajoute la classe 'active-filters' au bouton cliqué
        filter.classList.add("active-filters");

        const idFilter = event.target.id
        const allGaleryImages = document.querySelectorAll(".gallery-grid img")

        allGaleryImages.forEach(img => {
            img.closest('a').style.display = 'none'
            img.closest('a').setAttribute('aria-hidden', 'true');
            img.setAttribute('aria-hidden', 'true');
            const categoryId = img.getAttribute("categoryId")
            if (idFilter === categoryId) {
                img.closest('a').style.display = null
                img.closest('a').setAttribute('aria-hidden', 'false');
                img.setAttribute('aria-hidden', 'false');
            } else if (idFilter === "0") {
                img.closest('a').style.display = null
                img.closest('a').setAttribute('aria-hidden', 'false');
                img.setAttribute('aria-hidden', 'false');
            }
        })
    })
})