import React, { Component } from 'react';
import ProjectChargeCalculatorUtils from './ProjectChargeCalculatorUtils.js';

class ProjectChargeCalculatorFunction extends Component {
	constructor(props){
		super(props);

		this.handleSetLabel = this.handleSetLabel.bind(this);
		this.handleChangeCost = this.handleChangeCost.bind(this);
	}
	render(){
		return <tr>
			<td>{this.props.num}</td>
			<td><input value={this.props.function.label} type="text" onChange={this.handleSetLabel} /></td>
			<td><input type="number" value={this.props.function.ihm[0]} onChange={(evt)=>this.handleChangeCost(evt,true,0)}/></td>
			<td><input type="number" value={this.props.function.ihm[1]} onChange={(evt)=>this.handleChangeCost(evt,true,1)}/></td>
			<td><input type="number" value={this.props.function.ihm[2]} onChange={(evt)=>this.handleChangeCost(evt,true,2) }/></td>
			<td><input type="number" value={this.props.function.ihm[3]} onChange={(evt)=>this.handleChangeCost(evt,true,3)}/></td>
			<td><input type="number" value={this.props.function.traitement[0]} onChange={(evt)=>this.handleChangeCost(evt,false,0)}/></td>
			<td><input type="number" value={this.props.function.traitement[1]} onChange={(evt)=>this.handleChangeCost(evt,false,1)}/></td>
			<td><input type="number" value={this.props.function.traitement[2]} onChange={(evt)=>this.handleChangeCost(evt,false,2)}/></td>
			<td><input type="number" value={this.props.function.traitement[3]} onChange={(evt)=>this.handleChangeCost(evt,false,3)}/></td>
			<td><b>{ProjectChargeCalculatorUtils.getFunctionCost(this.props.function)}</b></td>
		</tr>;
	}

	handleSetLabel(evt){
		this.props.onSetLabel(this.props.module,this.props.function.id,evt.target.value);
	}

	handleChangeCost(evt,isIhm,index){
		// copie des valeurs actuelle
		let ihm = this.props.function.ihm;
		let traitement = this.props.function.traitement;

		// mise a jours selon isIhn et l'index de la bonne valeur
		if(isIhm){
			ihm[index] = evt.target.value;
		} else {
			traitement[index] = evt.target.value;
		}

		// on signale le changement au parent
		this.props.onSetCost(this.props.module, this.props.function.id,ihm,traitement);
	}
}

export default ProjectChargeCalculatorFunction;
