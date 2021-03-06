import uuid from 'uuid/v1';

/*
 * Action types
 */

// Project
export const SET_PROJECT_LABEL = 'SET_PROJECT_LABEL';
export const RESET_PROJECT = 'RESET_PROJECT';
export const SET_PROJECT_COSTS = 'SET_PROJECT_COSTS';
export const TOGGLE_SHOW_PARAM = 'TOGGLE_SHOW_PARAM';
export const SET_IS_DRAGGING = 'SET_IS_DRAGGING';
export const LOAD_JSON = 'LOAD_JSON';
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';
export const SET_CONNEXE_COST = 'SET_CONNEXE_COST';
export const SET_PROJECT_PARAM = 'SET_PROJECT_PARAM';

// Modules
export const ADD_MODULE = 'ADD_MODULE';
export const SET_MODULE_NAME = 'SET_MODULE_NAME';
export const REMOVE_MODULE = 'REMOVE_MODULE';
export const TOGGLE_SHOW_MODULE = 'TOGGLE_SHOW_MODULE';

// Function
export const ADD_FUNCTION = 'ADD_FUNCTION';
export const SET_FUNCTION_LABEL = 'SET_FUNCTION_LABEL';
export const SET_FUNCTION_COSTS = 'SET_FUNCTION_COSTS';
export const REMOVE_FUNCTION = 'REMOVE_FUNCTION';

// user
export const SET_USER = "SET_USER";


/**
 * other constant
 */

const MODULE_PREFIX_NAME = 'module';
const FUNCTION_PREFIX_NAME = 'function';

/**
 * [actionCreator create an action]
 * @param  {String} type    [type]
 * @param  {Object} payLoad [payLoad object]
 * @return {Object}    [Action]
 */
const actionCreator = (type, payLoad) => {
    return {
        type: type,
        payLoad: payLoad
    };
};

// Project

/**
 * [setProjectLabel action creator to set project label ]
 * @param {String} label [project label]
 * @return {Object}    [Action]
 */
export const setProjectLabel = (label) => {
    return actionCreator(SET_PROJECT_LABEL, {
        label: label
    });
};

/**
 * [setProjectCosts action creator to set project param costs]
 * @param {Object} costs [costs]
 * @return {Object}    [Action]
 */
export const setProjectCosts = (costs) => {
    return actionCreator(SET_PROJECT_COSTS, {
        costs: costs
    });
};


/**
 * [resetProject action creator to reset the project ]
 * @return {Object}    [Action]
 */
export const resetProject = () => {
    return actionCreator(RESET_PROJECT, {});
};

// Module

/**
 * [addModule action creator to add a module]
 * @return {Object}    [Action]
 */
export const addModule = () => {
    return actionCreator(ADD_MODULE, {
        id: MODULE_PREFIX_NAME + "_" + uuid()
    });
};

/**
 * [setModuleName action creator to set a module name]
 * @param  {String} id [module id]
 * @param {String} name [name]
 * @return {Object}    [Action]
 */
export const setModuleName = (id, name) => {
    return actionCreator(SET_MODULE_NAME, {
        id: id,
        name: name
    });
};

/**
 * [removeModule action creator to remove a module]
 * @param  {String} id [module id]
 * @return {Object}    [Action]
 */
export const removeModule = (id) => {
    return actionCreator(REMOVE_MODULE, {
        id: id,
    });
};

// Functions

/**
 * [addFunction action creator to add a function]
 * @param  {String} id [parent module id]
 * @return {Object}    [Action]
 */
export const addFunction = (moduleId) => {
    return actionCreator(ADD_FUNCTION, {
        id: FUNCTION_PREFIX_NAME + "_" + uuid(),
		moduleId : moduleId
    });
};

/**
 * [setFunctionName action creator to set a function name]
 * @param  {String} id [function id]
 * @param {String} name [name]
 * @return {Object}    [Action]
 */
export const setFunctionName = (id, name) => {
    return actionCreator(SET_FUNCTION_LABEL, {
        id: id,
        name: name
    });
};

/**
 * [setFunctionCosts action creator to set a function costs]
 * @param  {String} id [function id]
 * @param {Object} costs [function costs]
 * @return {Object}    [Action]
 */
export const setFunctionCosts = (id, costs) => {
    return actionCreator(SET_FUNCTION_COSTS, {
        id: id,
        costs: costs
    });
};

/**
 * [removeFunction action creator to remove a function]
 * @return {Object}    [Action]
 * @param  {String} id [function id]
 */
export const removeFunction = (id) => {
    return actionCreator(REMOVE_FUNCTION, {
        id: id,
    });
};

/**
 * [toggleShowParam action creator to toggle the param panel]
 * @return {Object}    [Action]
 */
export const toggleShowParam = () => {
    return actionCreator(TOGGLE_SHOW_PARAM, {});
};

/**
 * [setIsDragging action creator to set is dragging boolean ]
 * @return {Object}    [Action]
 * @param  {Boolean} isDragging [isDragging]
 */
export const setIsDragging = (isDragging) => {
    return actionCreator(SET_IS_DRAGGING, {
		isDragging : isDragging
	});
};

/**
 * [loadJson action creator to load json ]
 * @return {Object}    [Action]
 * @param  {Object} data [data]
 */
export const loadJson = (data) => {
    return actionCreator(LOAD_JSON, {
		data: data
	});
};

/**
 * [toggleShowModule action creator to toggle a module shown param ]
 * @return {Object}    [Action]
 * @param  {String} id [Module id]
 */
export const toggleShowModule = (id) => {
    return actionCreator(TOGGLE_SHOW_MODULE, {
		id : id
	});
};

/**
 * [setCurrentTab action creator to set current tab ]
 * @return {Object}    [Action]
 * @param  {String} id [tab id]
 */
export const setCurrentTab = (id) => {
    return actionCreator(SET_CURRENT_TAB, {
		id : id
	});
};

/**
 * [setConnexeCost action creator to set a connexe cost ]
 * @return {Object}    [Action]
 * @param  {String} label [connexe label]
 * @param  {Float} cost [connexe cost]
 */
export const setConnexeCost = (label, cost) => {
    return actionCreator(SET_CONNEXE_COST, {
		label : label,
		cost : cost
	});
};


/**
 * [setProjectParam action creator to set a project parameter ]
 * @return {Object}    [Action]
 * @param  {String} key [parameter key]
 * @param  {Float} value [parameter value]
 */
export const setProjectParam = (key,value) => {
	return actionCreator(SET_PROJECT_PARAM, {
			key,
			value
	});
}

/**
 * [set user ]
 * @param {Object} user [user object]
 * @return {Object}    [action]
 */
export const setUser = (user)=> {
  return actionCreator(SET_USER,{user});
};
