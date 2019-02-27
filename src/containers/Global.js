import {connect} from 'react-redux';
import GlobalComponent from '../components/Global';
import {setConnexeCost, setProjectParam} from '../actions';
import Utils from '../Utils/Utils';

const mapStateToProps = (state) => {
	return Utils.getGlobalCost(state);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSetConnexeCost : (label,cost) => {
			dispatch(setConnexeCost(label,cost));
		},
		onSetProjectParam : (key,value) => {
			dispatch(setProjectParam(key,value));
		}
	};
};

const Global = connect(
	mapStateToProps,
	mapDispatchToProps
)(GlobalComponent);

export default Global;
