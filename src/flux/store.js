import Constants from "./constants";
import AppDispatcher from "./dispatcher";
import {EventEmitter} from "events";

let _store = {
    filter: "0",
    sliderValue: {start: 0, end: 0},
    maxPoster: 100,
    sortOrder: 0,
};

class Store extends EventEmitter {
    constructor() {
        super();

        this.toggleFilter = this.toggleFilter.bind(this);
        this.updateSliders = this.updateSliders.bind(this);
        this.updatePageNum = this.updatePageNum.bind(this);
        this.reset = this.reset.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        AppDispatcher.register(this.registerActions.bind(this));
    }

    registerActions({action}) {
        switch (action.actionType) {
            case Constants.TOGGLE_FILTER:
                this.toggleFilter(action.data);
                break;
            case Constants.UPDATE_SLIDERS:
                this.updateSliders(action.data);
                break;
            case Constants.UPDATE_PAGENUM:
                this.updatePageNum(action.data);
                break;
            case Constants.UPDATE_ORDER:
                this.updateOrder(action.data);
                break;
            case Constants.RESET:
                this.reset();
                break;
            case Constants.GET_USER_DETAILS_RESPONSE:
                this.updateUser(action.response);
                break;
            case Constants.GET_TEMPLATES_RESPONSE:
                this.updateTemplates(action.response);
                break;
            case Constants.ADD_POLICY:
                this.addPolicy(action.data);
                break;
            case Constants.GET_POLICIES_RESPONSE:
                this.updatePolicies(action.response);
                break;
            case Constants.GET_OVERVIEW_RESPONSE:
                this.updateOverview(action.response);
                break;
            default:
                return true;
        }
    }

    addChangeListener(callback) {
        this.on(Constants.CHANGE, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(Constants.CHANGE, callback);
    }

    toggleFilter(data) {
        _store.filter = data;
        this.emit(Constants.CHANGE);
    }

    updateSliders(data) {
        _store.sliderValue = data;
        this.emit(Constants.CHANGE);
    }

    updatePageNum(data) {
        _store.maxPoster = data;
        this.emit(Constants.CHANGE);
    }

    reset() {
        _store = {
            filter: "0",
            sliderValue: {start: 0, end: 0},
            maxPoster: 100,
            sortOrder: 0,
        };
        this.emit(Constants.CHANGE);
    }

    updateOrder(data) {
        _store.sortOrder = data;
        this.emit(Constants.CHANGE);
    }

    updateOverview(data) {
        _store.overview = data;
        this.emit(Constants.CHANGE);
    }

    updateUser(data) {
        _store.user = data;
        this.emit(Constants.CHANGE);
    }


    updateTemplates(data) {
        _store.templates = [];
        data.map((item, idx) => {
            _store.templates.push(item);
        });
        this.emit(Constants.CHANGE);
    }


    updatePolicies(data) {
        _store.policies = [];
        data.map((item, idx) => {
            _store.policies.push(item);
        });
        this.emit(Constants.CHANGE);
    }

    toggleSidebar() {
        _store.menuVisible = !_store.menuVisible;
        this.emit(Constants.CHANGE);
    }

    switchResourceIndex(data) {
        _store.resourceIndex = data;
        this.emit(Constants.CHANGE);
    }

    getFilterIndex() {
        return _store.filter
    }

    getSliderValue() {
        return _store.sliderValue
    }

    getNumPages() {
        return _store.maxPoster
    }

    getSortOrder() {
        return _store.sortOrder;
    }

}

export default new Store();
