import {connect} from 'react-redux';
import {setFunctionName,removeFunction,setFunctionCosts} from '../actions';
import Utils from '../Utils/Utils';
import FunctionComponent from '../components/Function';

const mapStateToProps = (state,{id}) => {
	const fnc = state.functions.byId.get(id);
	const param = state.projects.get('costs');
	return {
		fnc : fnc,
		cost : Utils.getFunctionCost(fnc.get('costs').toJS(),param.toJS())
	};
};

const mapDispatchToProps = (dispatch,{id}) => {
	return {
		onSetFunctionLabel : (label) => {
		  dispatch(setFunctionName(id,label));
		},
		onRemoveFunction : ()=> {
		  dispatch(removeFunction(id));
		},
		onSetFunctionCosts : (costs) => {
		  dispatch(setFunctionCosts(id,costs));
		}
	};
};

const Function = connect(
	mapStateToProps,
	mapDispatchToProps
)(FunctionComponent);

export default Function;
