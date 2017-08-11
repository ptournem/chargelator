import  {SET_PROJECT_LABEL, RESET_PROJECT, SET_PROJECT_COSTS, TOGGLE_SHOW_PARAM, SET_IS_DRAGGING, LOAD_JSON, SET_CURRENT_TAB, SET_CONNEXE_COST} from '../actions';
import {fromJS} from 'immutable';

const defaultCosts=  {
	ihm : [
		0.25, 0.5, 1, 2
	],
	traitement : [
		0.25, 0.5, 1, 2
	]
};

const defaultLabel = "Nouveau Projet";

function setProjectLabel(state,action){
	const {payLoad} = action ;
	const {label} = payLoad;
	return state.update('label', () => label);
}

function setProjectCosts(state,action){
	const {payLoad} = action ;
	const {costs} = payLoad;

	return state.update('costs', () => fromJS(costs));
}

function resetProject(state,action){
	return getDefaultState();
}

function toggleShowParam(state,action){
	return state.update('isParamShown', p => !p);
}

function setIsDragging(state,action){
	const {payLoad} = action ;
	const {isDragging} = payLoad;

	return state.update('isDragging', p => isDragging);
}

function loadJson(state,action){
	const{payLoad} = action;
	const{data} = payLoad;
	const{projects} = data;
	return fromJS(projects);
}

function setCurrentTab(state,action){

	const{payLoad} = action;
	const{id} = payLoad;
	return state.update('currentTab', p => id)
}

function setConnexeCost(state,action){
	const{payLoad} = action;
	const{label,cost} = payLoad;

	return state.update('connexeCosts', c => c.set(label,cost));
}

function getDefaultState(){
	return 	fromJS({
			label : defaultLabel,
			costs : defaultCosts,
			isParamShown : false,
			isDragging : false,
			currentTab : 1,
			connexeCosts : {}
		});
}


const  projectReducer = (state = null,action) => {
	if(state === null){
		state = getDefaultState();
	}

	switch (action.type) {
		case SET_PROJECT_LABEL: return setProjectLabel(state,action);
		case SET_PROJECT_COSTS : return setProjectCosts(state,action);
		case RESET_PROJECT : return resetProject(state,action);
		case TOGGLE_SHOW_PARAM : return toggleShowParam(state,action);
		case SET_IS_DRAGGING : return setIsDragging(state,action);
		case LOAD_JSON : return loadJson(state,action);
		case SET_CURRENT_TAB : return setCurrentTab(state,action);
		case SET_CONNEXE_COST : return setConnexeCost(state,action);
		default: return state;

	}
}

export default projectReducer;
