import Constants from "./constants";
import AppDispatcher from "./dispatcher";


class Actions {
    addResource(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.ADD_RESOURCE,
            data: data
        });
    }

    addTemplate(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.ADD_TEMPLATE,
            data: data
        });
    }

    addPolicy(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.ADD_POLICY,
            data: data
        });
    }

    toggleFilter(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.TOGGLE_FILTER,
            data: data
        });
    }

    updateSliders(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.UPDATE_SLIDERS,
            data: data
        });
    }

    updatePageNums(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.UPDATE_PAGENUM,
            data: data
        });
    }

    updateOrder(data) {
        AppDispatcher.handleViewAction({
            actionType: Constants.UPDATE_ORDER,
            data: data
        });
    }

    resetFilters() {
        AppDispatcher.handleViewAction({
            actionType: Constants.RESET,
        });
    }


}


export default new Actions();