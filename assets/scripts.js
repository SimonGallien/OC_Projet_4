$(document).ready(function() {
    /*Cette ligne initialise le plugin MauGallery sur l'élément qui a la classe gallery. 
    MauGallery est un plugin jQuery qui permet de créer des galeries d'images responsives 
    avec des fonctionnalités supplémentaires comme le mode Lightbox et le filtrage par tags.*/
    $('.gallery').mauGallery({ 
        columns: {
            xs: 1, // Pour les très petits écrans (extra-small), la galerie affiche 1 colonne.
            sm: 2, // Pour les petits écrans, 2 colonnes.
            md: 3, // Pour les écrans de taille moyenne, 3 colonnes.
            lg: 3, // Pour les grands écrans, 3 colonnes.
            xl: 3  // Pour les très grands écrans, 3 colonnes.
        },
        lightBox: true, // Ouvre l'image dans une modale lorsque l'utilisateur clique dessus
        lightboxId: 'myAwesomeLightbox', // id de la lightbox
        showTags: true, // Les tags sont des catégories ou des filtres que l'utilisateur peut utiliser pour trier ou filtrer les images dans la galerie.
        tagsPosition: 'top' // Les tags seront affichés en haut de la galerie.
    });
});
