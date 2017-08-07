import  {ADD_MODULE, SET_MODULE_NAME, REMOVE_MODULE, ADD_FUNCTION, REMOVE_FUNCTION, RESET_PROJECT, LOAD_JSON, TOGGLE_SHOW_MODULE} from '../actions';
import {combineReducers} from 'redux';
import {List, Map, fromJS} from 'immutable';

/**
 * [addEntry Add in byId]
 * @param {Map} state  [current state]
 * @param {Object} action [action to handle]
 */
function addEntry(state,action){
	const {payLoad} = action ;
	const {id} = payLoad;

	const module =  {id : id, name : "",isShown : true, fncs : []};

	return state.set(id,fromJS(module));
}

/**
 * [addId Add in allIds]
 * @param {List} state  [current state]
 * @param {Object} action [action to handle]
 */
function addId(state,action){
	const {payLoad} = action ;
	const {id} = payLoad;

	return state.push(id);
}

/**
 * [removeEntry Remove from byId]
 * @param {Map} state  [current state]
 * @param {Object} action [action to handle]
 */
function removeEntry(state,action){
	const {payLoad} = action ;
	const {id} = payLoad;

	return state.delete(id);
}

/**
 * [removeId Remove from allIds]
 * @param {List} state  [current state]
 * @param {Object} action [action to handle]
 */
function removeId(state,action){
	const {payLoad} = action ;
	const {id} = payLoad;

	return state.delete(state.indexOf(id));
}

/**
 * [setName Update name ]
 * @param {Map} state  [current state]
 * @param {Object} action [action to handle]
 */
function setName(state,action){
	const {payLoad} = action;
	const{id,name} = payLoad;

	return state.update(id,module => module.set("name",name));
}

function addFunction(state,action){
	const {payLoad} = action;
	const{id,moduleId} = payLoad;
	return state.update(moduleId, (m) => m.update("fncs",f => f.push(id)));
}

function removeFunction(state,action){
	const {payLoad} = action;
	const{id} = payLoad;

	return state.map(m=> m.update("fncs", f => f.delete(f.indexOf(id))));
}

function resetEntry(state,action){
	return state.clear();
}

function resetId(state,action){
	return state.clear();
}

function loadJsonEntry(state,action){
	const{payLoad} = action;
	const{data} = payLoad;
	const{modules} = data;
	return fromJS(modules.byId);
}

function loadJsonId(state,action){
	const{payLoad} = action;
	const{data} = payLoad;
	const{modules} = data;
	return fromJS(modules.allIds);
}

function toggleShowModule(state,action){
	const{payLoad} = action;
	const{id} = payLoad;

	return state.update(id,module => module.update("isShown", p=> !p));
}


/**
 * [modulesById Handle action for byId object]
 * @param {Map} [state=null]  [current state]
 * @param {Object} action [action to handle]
 * @return {Object}            [next state]
 */
function modulesById(state = null,action){
	if(state === null){
		state = Map();
	}
	switch (action.type) {
		case ADD_MODULE: return addEntry(state,action);
		case REMOVE_MODULE : return removeEntry(state,action);
		case SET_MODULE_NAME : return setName(state,action);
		case ADD_FUNCTION : return addFunction(state,action);
		case REMOVE_FUNCTION : return removeFunction(state,action);
		case RESET_PROJECT : return resetEntry(state,action);
		case LOAD_JSON : return loadJsonEntry(state,action);
		case TOGGLE_SHOW_MODULE : return toggleShowModule(state,action);
		default: return state;

	}
}

/**
 * [allModules description]
 * @param {List} [state=null]  [current state]
 * @param {Object} action [action to handle]
 * @return {Array}            [next state]
 */
function allModules(state = null,action){
	if(state===null){
		state = List();
	}
	switch (action.type) {
		case ADD_MODULE: return addId(state,action);
		case REMOVE_MODULE : return removeId(state,action);
		case RESET_PROJECT : return resetId(state,action);
		case LOAD_JSON : return loadJsonId(state,action);
		default: return state;

	}
}

const modulesReducer = combineReducers({
	byId:  modulesById,
	allIds : allModules
});

export default modulesReducer;
