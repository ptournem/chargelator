import {connect} from 'react-redux';
import {setProjectCosts} from '../actions';
import ParamCoefComponent from '../components/ParamCoef';

const mapStateToProps =  (state) => {
	const costs = state.projects.get('costs');

	return {
		costs : costs
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSetProjectCosts : (costs) => {
			dispatch(setProjectCosts(costs));
		}
	}
}

const ParamCoef = connect(
	mapStateToProps,
	mapDispatchToProps
)(ParamCoefComponent);

export default ParamCoef;
