/*****************************************************************/
/*** Ce fichier contient les fonctions javascript de la modale ***/
/*****************************************************************/
let modal = null

/**
 * Fonction principale
 * @param {Event} event - L'événement déclenché par l'utilisateur
 */
export const openModal = function(event){
    event.preventDefault()
    const link = event.target.closest('a')
    modal = document.querySelector(link.getAttribute('href'))
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    // Désactive le scroll de l'arrière-plan
    document.body.classList.add('no-scroll');
    modal.addEventListener('click', closeModal)
    modal.querySelectorAll('.js-modal-stop').forEach(content => content.addEventListener('click', stopPropagation))
    showImage(event)
    modal.querySelector('.prev-image').addEventListener('click', prevImage)
    modal.querySelector('.next-image').addEventListener('click', nextImage)
}

/**
 * Affiche l'image suivante lors du click sur l'icone '>'
 * @param {Event} event - L'événement déclenché par l'utilisateur 
 */
const nextImage = function(event){
    event.preventDefault()
    // Trouver l'index de l'image dans la modal correspondant à la gallery
    let index = findIndex()
    // Calculer l'index de l'image suivante
    const imageCollection = Array.from(document.querySelectorAll(".gallery-grid img[aria-hidden='false']"))
    const nextIndex = (index + 1 + imageCollection.length) % imageCollection.length;
    // Afficher l'image suivante
    const nextImage = imageCollection[nextIndex];
    modal.querySelector('.js-image img').src = nextImage.src
}

/**
 * Affiche l'image précédente lors du click sur l'icone '<'
 * @param {Event} event - L'événement déclenché par l'utilisateur 
 */
const prevImage = function(event){
    event.preventDefault()
    // Trouver l'index de l'image dans la modal correspondant à la gallery
    let index = findIndex()
    // Calculer l'index de l'image précédente
    const imageCollection = Array.from(document.querySelectorAll(".gallery-grid img[aria-hidden='false']"))
    const prevIndex = (index - 1 + imageCollection.length) % imageCollection.length;
    // Afficher l'image précédente
    const prevImage = imageCollection[prevIndex];
    modal.querySelector('.js-image img').src = prevImage.src
}

/**
 * Trouve l'index de l'image actuelle dans la modale dans la gallerie
 * @returns {number} - Numéro de l'index de l'image dans la gallerie
 */
const findIndex = function() {
    const imageCollection = Array.from(document.querySelectorAll(".gallery-grid img[aria-hidden='false']"))
    let index = 0
    for (let i=0; i < imageCollection.length; i++) {
        if (imageCollection[i].src === modal.querySelector('.js-image img').src){
            index = i
        }
    }
    return index
}

/**
 * Affiche l'image cliqué par l'utilisateur de la gallerie dans la modale
 * @param {Event} event - L'événement déclenché par l'utilisateur
 */
const showImage = function(event){
    const targetImage = event.target
    const imageContainer = modal.querySelector('.js-image')
    if (imageContainer.querySelector('img')){
        imageContainer.querySelector('img').remove()
    }
    const imageModal = document.createElement('img')
    imageModal.src = targetImage.src
    imageContainer.appendChild(imageModal)
}

/**
 * Ferme la modale et supprime les écouteurs
 * @param {Event} event - L'événement déclenché par l'utilisateur
 * @returns - Si la modale est null
 */
const closeModal = function (event){
    if (modal === null) return
    event.preventDefault()
    window.setTimeout(function () {
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    // Réactive le scroll de l'arrière-plan
    document.body.classList.remove('no-scroll');
    modal.removeEventListener('click', closeModal)
    modal.querySelectorAll('.js-modal-stop').forEach(content => content.removeEventListener('click', stopPropagation))
    modal.querySelector('.prev-image').removeEventListener('click', prevImage)
    modal.querySelector('.prev-image').removeEventListener('click', nextImage)
}

/**
 * Stop la propagation pour éviter de fermer la modale lorsque l'utilisateur click à l'intérieur
 * @param {Event} event - L'événement déclenché par l'utilisateur
 */
const stopPropagation = function (event)  {
    event.stopPropagation()
}