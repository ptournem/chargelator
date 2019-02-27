import { combineReducers } from 'redux';

import projects from './projects';
import modules from './modules';
import functions from './functions';
import user from './user';

const reducer = combineReducers({
	projects,
	modules,
	functions,
	user
});

export default reducer;
