/*****************************************************************/
/****** Ce fichier contient le code javascript de la modale ******/
/*****************************************************************/

import {openModal} from "./modalFunctions.js";

console.log('modal.js chargé')

document.querySelectorAll('.js-modal').forEach(linkImg => {
    linkImg.addEventListener('click', openModal)
})