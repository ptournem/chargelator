import React, { Component } from 'react';
import{ Panel, Table, Button, Glyphicon ,Grid, Row, Col} from 'react-bootstrap';
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
			onRemove={this.props.onRemoveFunction}
			onSetCost={this.props.onSetFunctionCost} />);
		return <Panel>
			<Grid>
				<Row>
					<Col xs={8}>
							<input type="text" value={this.props.module.label} onChange={this.handleSetLabel}/>
					</Col>
					<Col xs={2}>
						{ProjectChargeCalculatorUtils.getModuleCost(this.props.module)} JEH
					</Col>
					<Col xs={1}>
						<Button onClick={this.handleAddFunction} bsStyle="primary"><Glyphicon glyph="plus"/></Button>
					</Col>
					<Col xs={1}>
						<Button onClick={this.handleRemove} bsStyle="danger"><Glyphicon glyph="trash"/></Button>
					</Col>
				</Row>
			</Grid>
			<Table fill responsive striped bordered className="moduleTable">
			    <thead>
			      <tr>
				  		<th rowSpan={2}>#</th>
			        <th rowSpan={2}>Fonctionnalité</th>
			        <th colSpan={4}>IHM</th>
			        <th colSpan={4}>Traitement</th>
							<th rowSpan={2}><b>Cout</b></th>
							<th rowSpan={2}></th>
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
