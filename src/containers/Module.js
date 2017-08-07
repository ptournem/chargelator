import {connect} from 'react-redux';
import {setModuleName,removeModule, addFunction, toggleShowModule} from '../actions';
import Utils from '../Utils/Utils';
import ModuleComponent from '../components/Module';

const mapStateToProps = (state,{id}) => {
	const module = state.modules.byId.get(id);
	const functions = module.get('fncs');
	const functionsCosts = functions.map(fnc => state.functions.byId.get(fnc).get('costs')).toJS();
	const param = state.projects.get('costs').toJS();

	return {
		module : module,
		functions : functions,
		cost : Utils.getFunctionsCost(functionsCosts,param)
	};
};

const mapDispatchToProps = (dispatch,{id}) => {
	return {
		onSetModuleLabel : (label) => {
		  dispatch(setModuleName(id,label));
		},
		onRemoveModule : () => {
		  dispatch(removeModule(id));
		},
		onAddFunction : () => {
			dispatch(addFunction(id));
		},
		onToggleShowModule: () => {
			dispatch(toggleShowModule(id));
		}

	};
};

const Module = connect(
	mapStateToProps,
	mapDispatchToProps
)(ModuleComponent);

export default Module;
