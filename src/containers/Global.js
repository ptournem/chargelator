import {connect} from 'react-redux';
import GlobalComponent from '../components/Global';
import {setConnexeCost} from '../actions';
import Utils from '../Utils/Utils';

const mapStateToProps = (state,{id}) => {
	const costs = state.functions.byId.map(fnc => fnc.get('costs')).toList().toJS();
	const param = state.projects.get('costs').toJS();
	const cost = Utils.getFunctionsCost(costs,param)
	const connexeCosts = state.projects.get('connexeCosts');

	let total =  0;
	const workflow = [
		{label : 'Charges projetées', inner : [
			{ label : 'Spécification', percentage : 10, editable : false},
			{ label : 'Conception', percentage : 21, editable : false},
			{ label : 'Réalisation + TU', percentage : 47, editable : false},
			{ label : 'Intégration', percentage : 11, editable : false},
			{ label : 'Validation', percentage : 11, editable : false}
		]},
		{label : 'Charges connexes', inner : [
			{ label : 'Formation', percentage : null, editable : true},
			{ label : 'Support démarrage', percentage : null, editable : true},
			{ label : 'Installation sur site', percentage : null, editable : true},
			{ label : 'Documentation', percentage : 5, editable : false},
		]},
		{label : 'Charges transversales', inner : [
			{ label : "Maitrise d'oeuvre", percentage : 5, editable : false},
			{ label : "Encadrement des équipes", percentage : 7, editable : false},
			{ label : "Qualité", percentage : 5, editable : false},
		]},
	].map((item)=> {
		item["total"] = Utils.getSectionCost(item.inner,cost,connexeCosts)
		total += item["total"];
		return item;
	})

	return {
		cost : cost,
		workflow : workflow,
		total : total,
		connexeCosts : connexeCosts
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSetConnexeCost : (label,cost) => {
			dispatch(setConnexeCost(label,cost));
		}
	};
};

const Global = connect(
	mapStateToProps,
	mapDispatchToProps
)(GlobalComponent);

export default Global;
