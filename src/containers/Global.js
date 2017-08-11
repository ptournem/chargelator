import {connect} from 'react-redux';
import GlobalComponent from '../components/Global';
import {setConnexeCost, setProjectParam} from '../actions';
import Utils from '../Utils/Utils';

const mapStateToProps = (state,{id}) => {
	const costs = state.functions.byId.map(fnc => fnc.get('costs')).toList().toJS();
	const param = state.projects.get('costs').toJS();
	const cost = Utils.getFunctionsCost(costs,param)
	const project = state.projects;
	const connexeCosts = project.get('connexeCosts');


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

	const nbMonth = total / 20;
	const nbWeek = Math.ceil(nbMonth *4.3);
	const minMonth = Utils.ceilDecimal(2.5*Math.pow(nbMonth,1/3),1);
	const minWeek = Math.ceil(minMonth*4.3);
	const optMonth = Utils.ceilDecimal(1.4 * minMonth,1) ;
	const optWeek = Math.ceil(optMonth  * 4.3);

	const delay = project.get('parameters').get('delay') - minWeek;
	const complexite = project.get('parameters').get('complexite');
	const margeSecu = delay < 0 ? -delay : 0;

	const margeSecuDay = Math.ceil(total*margeSecu/100);
	const margeComplexDay = Math.ceil(total*complexite/100);

	const totalAfterMarge = total + margeSecuDay + margeComplexDay;

	return {
		cost,
		workflow,
		total,
		connexeCosts,
		nbMonth,
		nbWeek,
		minMonth,
		minWeek,
		optMonth,
		optWeek,
		project,
		margeSecu,
		margeSecuDay,
		margeComplexDay ,
		totalAfterMarge
	};
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
