import { dashboardTemplate } from "./dashboardTemplate.js";
import furnitureService from "./../../services/furnitureService.js";

async function getView(context) {
    let allFurniture = await furnitureService.getAll();
    let templateResult = dashboardTemplate(allFurniture);
    context.renderView(templateResult);
}

export default {
    getView
}