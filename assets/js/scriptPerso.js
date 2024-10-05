const galleryButtonFilters = document.querySelectorAll(".gallery-button-filters")

galleryButtonFilters.forEach(filter => {
    filter.addEventListener("click", function(event){
        event.preventDefault();

        // Supprime la classe 'active-filters' de tous les boutons
        galleryButtonFilters.forEach(btn => btn.classList.remove("active-filters"))

        // Ajoute la classe 'active-filters' au bouton cliqué
        filter.classList.add("active-filters");

        const idFilter = event.target.id
        const allGaleryImages = document.querySelectorAll(".gallery-grid img")
        allGaleryImages.forEach(img => {
            img.closest('a').style.display = 'none'
            img.setAttribute('aria-hidden', 'true');
            const categoryId = img.getAttribute("categoryId")
            if (idFilter === categoryId) {
                img.closest('a').style.display = null
                img.removeAttribute('aria-hidden');
            } else if (idFilter === "0") {
                img.closest('a').style.display = null
                img.removeAttribute('aria-hidden');
            }
        })
    })
})

/*******************************************/
let modal = null

const openModal = function(event){
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

const nextImage = function(event){
    event.preventDefault()
    // Trouver l'index de l'image dans la modal correspondant à la gallery
    let index = findIndex()
    // Calculer l'index de l'image suivante
    const imageCollection = Array.from(document.querySelectorAll('.gallery-grid img'))
    const nextIndex = (index + 1 + imageCollection.length) % imageCollection.length;
    // Afficher l'image suivante
    const nextImage = imageCollection[nextIndex];
    modal.querySelector('.js-image img').src = nextImage.src
}

const prevImage = function(event){
    event.preventDefault()
    // Trouver l'index de l'image dans la modal correspondant à la gallery
    let index = findIndex()
    // Calculer l'index de l'image précédente
    const imageCollection = Array.from(document.querySelectorAll('.gallery-grid img'))
    const prevIndex = (index - 1 + imageCollection.length) % imageCollection.length;
    // Afficher l'image précédente
    const prevImage = imageCollection[prevIndex];
    modal.querySelector('.js-image img').src = prevImage.src
}

const findIndex = function() {
    const imageCollection = Array.from(document.querySelectorAll('.gallery-grid img'))
    let index = 0
    for (let i=0; i < imageCollection.length; i++) {
        if (imageCollection[i].src === modal.querySelector('.js-image img').src){
            index = i
        }
    }
    return index
}

const showImage = function(event){
    targetImage = event.target
    const imageContainer = modal.querySelector('.js-image')
    if (imageContainer.querySelector('img')){
        imageContainer.querySelector('img').remove()
    }
    const imageModal = document.createElement('img')
    imageModal.src = targetImage.src
    imageContainer.appendChild(imageModal)
}

const closeModal = function (event){
    if (modal === null) return
    event.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    // Réactive le scroll de l'arrière-plan
    document.body.classList.remove('no-scroll');
    modal.removeEventListener('click', closeModal)
    modal.querySelectorAll('.js-modal-stop').forEach(content => content.removeEventListener('click', stopPropagation))
    modal.querySelector('.prev-image').removeEventListener('click', prevImage)
    modal.querySelector('.prev-image').removeEventListener('click', nextImage)
    modal = null
}

const stopPropagation = function (event)  {
    event.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})