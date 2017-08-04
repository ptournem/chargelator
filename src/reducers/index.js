import { combineReducers } from 'redux';

import projects from './projects';
import modules from './modules';
import functions from './functions';

const reducer = combineReducers({
	projects,
	modules,
	functions
});

export default reducer;
