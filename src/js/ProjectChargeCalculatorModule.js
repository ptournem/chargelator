import React, { Component } from 'react';
import{ Panel, Table, Button, Glyphicon } from 'react-bootstrap';
import ProjectChargeCalculatorFunction from './ProjectChargeCalculatorFunction.js';

import './../css/ProjectChargeCalculatorModule.css';

class ProjectChargeCalculatorModule extends Component {
	constructor(props){
		super(props);

		this.handleRemove = this.handleRemove.bind(this);
		this.handleAddFunction = this.handleAddFunction.bind(this);
	}
	render(){
		var nb = 1;
		const fonctions = this.props.module.functions.map((func)=> <ProjectChargeCalculatorFunction key={func.id}
			module={this.props.module.id}
			num = {nb++}
			function={func}
			onSetLabel={this.props.onSetFunctionLabel} />);
		return <Panel header={this.props.module.label}>

			<Button onClick={this.handleRemove}><Glyphicon glyph="trash"/> Supprimer Module</Button>
			<Button onClick={this.handleAddFunction}><Glyphicon glyph="plus"/> Ajouter Fonctionnalité</Button>

			<Table fill responsive striped bordered className="moduleTable">
			    <thead>
			      <tr>
				  	<th rowSpan={2}>#</th>
			        <th rowSpan={2}>Fonctionnalité</th>
			        <th colSpan={4}>IHM</th>
			        <th colSpan={4}>Traitement</th>
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
}

export default ProjectChargeCalculatorModule;
