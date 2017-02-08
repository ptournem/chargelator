import React, { Component } from 'react';
import{ Panel, Table } from 'react-bootstrap';
import ProjectChargeCalculatorFunction from './ProjectChargeCalculatorFunction.js';

import './../css/ProjectChargeCalculatorModule.css';

class ProjectChargeCalculatorModule extends Component {
	render(){
		const fonctions = this.props.module.functions.map((func)=> <ProjectChargeCalculatorFunction function={func} />);
		return <Panel header={this.props.module.label}>
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
}

export default ProjectChargeCalculatorModule;
