import { detailsTemplate } from "./detailsTemplate.js";
import furnitureService from "./../../services/furnitureService.js";
import authService from "./../../services/authService.js";

async function getView(context) {
    let id = context.params.id;
    let detailsFurniture = await furnitureService.get(id);
    detailsFurniture = changeUrlImage(detailsFurniture);
    let isOwner = authService.getUserId() === detailsFurniture._ownerId;
    let templateResult = detailsTemplate(detailsFurniture, isOwner);
    context.renderView(templateResult);
}
function changeUrlImage(detailsFurniture) {
    detailsFurniture.img = `./.${detailsFurniture.img}`;
    return detailsFurniture;
}

export default {
    getView
}