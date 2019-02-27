import  {ADD_FUNCTION,SET_FUNCTION_LABEL, SET_FUNCTION_COSTS, REMOVE_FUNCTION, RESET_PROJECT, LOAD_JSON} from '../actions';
import {combineReducers} from 'redux';
import {List, Map, fromJS} from 'immutable';

const defaultCosts = {ihm: [0,0,0,0], traitement :[0,0,0,0]};

/**
 * [addEntry Add in byId]
 * @param {Map} state  [current state]
 * @param {Object} action [action to handle]
 */
function addEntry(state,action){
	const {payLoad} = action ;
	const {id} = payLoad;

	const o =  {id : id, name : "", costs : defaultCosts};

	return state.set(id,fromJS(o));
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
 * [removeId from allIds]
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

/**
 * [setName Update costs]
 * @param {Map} state  [current state]
 * @param {Object} action [action to handle]
 */
function setCosts(state,action){
	const {payLoad} = action;
	const{id,costs} = payLoad;

	return state.update(id,module => module.set("costs",fromJS(costs)));
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
	const{functions} = data;
	return fromJS(functions.byId);
}

function loadJsonId(state,action){
	const{payLoad} = action;
	const{data} = payLoad;
	const{functions} = data;
	return fromJS(functions.allIds);
}


/**
 * [byId Handle action for byId object]
 * @param {Map} [state=null]  [current state]
 * @param {Object} action [action to handle]
 * @return {Object}            [next state]
 */
function byId(state = null,action){
	if(state === null){
		state = Map();
	}
	switch (action.type) {
		case ADD_FUNCTION: return addEntry(state,action);
		case REMOVE_FUNCTION : return removeEntry(state,action);
		case SET_FUNCTION_LABEL : return setName(state,action);
		case SET_FUNCTION_COSTS : return setCosts(state,action);
		case RESET_PROJECT : return resetEntry(state,action);
		case LOAD_JSON : return loadJsonEntry(state,action);
		default: return state;

	}
}

/**
 * [all description]
 * @param {List} [state=null]  [current state]
 * @param {Object} action [action to handle]
 * @return {Array}            [next state]
 */
function all(state = null,action){
	if(state===null){
		state = List();
	}

	switch (action.type) {
		case ADD_FUNCTION: return addId(state,action);
		case REMOVE_FUNCTION : return removeId(state,action);
		case RESET_PROJECT : return resetId(state,action);
		case LOAD_JSON : return loadJsonId(state,action);
		default: return state;

	}
}

const functionsReducer = combineReducers({
	byId:  byId,
	allIds : all
});

export default functionsReducer;
