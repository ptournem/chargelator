import React, { Component } from 'react';
import{ Panel, Table, Button, Glyphicon } from 'react-bootstrap';
import ProjectChargeCalculatorFunction from './ProjectChargeCalculatorFunction.js';
import ProjectChargeCalculatorUtils from './ProjectChargeCalculatorUtils.js'

import './../css/ProjectChargeCalculatorModule.css';

class ProjectChargeCalculatorModule extends Component {
	constructor(props){
		super(props);

		this.handleRemove = this.handleRemove.bind(this);
		this.handleAddFunction = this.handleAddFunction.bind(this);
		this.handleSetLabel= this.handleSetLabel.bind(this);
	}
	render(){
		var nb = 1;
		const fonctions = this.props.module.functions.map((func)=> <ProjectChargeCalculatorFunction key={func.id}
			module={this.props.module.id}
			num={nb++}
			function={func}
			onSetLabel={this.props.onSetFunctionLabel}
			onSetCost={this.props.onSetFunctionCost} />);
		return <Panel>
			<Table fill responsive striped bordered className="moduleTable">
			    <thead>
						<tr>
							<th colSpan={7}>
								<input type="text" value={this.props.module.label} onChange={this.handleSetLabel}/>
							</th>
							<th>
								Cost : {ProjectChargeCalculatorUtils.getModuleCost(this.props.module)}
							</th>
							<th>
								<Button onClick={this.handleAddFunction}><Glyphicon glyph="plus"/> Ajouter Fonctionnalité</Button>
							</th>
							<th colSpan={2}>
								<Button onClick={this.handleRemove}><Glyphicon glyph="trash"/> Supprimer Module</Button>
							</th>
						</tr>
			      <tr>
				  		<th rowSpan={2}>#</th>
			        <th rowSpan={2}>Fonctionnalité</th>
			        <th colSpan={4}>IHM</th>
			        <th colSpan={4}>Traitement</th>
							<th rowSpan={2}><b>Cout</b></th>
			      </tr>
				  	<tr>
			        <th>Faible</th>
							<th>Simple</th>
							<th>Moyen</th>
							<th>Complexe</th>
							<th>Faible</th>
							<th>Simple</th>
							<th>Moyen</th>
							<th>Complexe</th>
			      </tr>
			    </thead>
				<tbody>
					{fonctions}
				</tbody>
			</Table>
		</Panel>;
	}

	handleRemove(){
		this.props.onRemove(this.props.module.id);
	}

	handleAddFunction(){
		this.props.onAddFunction(this.props.module.id);
	}

	handleSetLabel(evt){
		this.props.onSetLabel(this.props.module.id,evt.target.value);
	}
}

export default ProjectChargeCalculatorModule;
