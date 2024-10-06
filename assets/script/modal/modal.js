/*****************************************************************/
/****** Ce fichier contient le code javascript de la modale ******/
/*****************************************************************/

import {openModal} from "./modalFunctions.min.js";

document.querySelectorAll('.js-modal').forEach(linkImg => {
    linkImg.addEventListener('click', openModal)
})