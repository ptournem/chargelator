import React from 'react';
import{ Panel, Table, Button, Glyphicon ,Grid, Row, Col} from 'react-bootstrap';
import Function from '../containers/Function.js';

import '../assets/css/Module.css';

const Module = ({module, cost, functions ,onAddFunction, onRemoveModule, onSetModuleLabel}) => {
	const fonctions = functions.map((func)=> <Function key={func} id={func} />);

	return (
 		<Panel className="projectChargeCalculatorModule">
			<Grid>
				<Row>
					<Col xs={8}>
							<input type="text" value={module.get('name')} onChange={(evt) =>{onSetModuleLabel(evt.target.value)}}/>
					</Col>
					<Col xs={2}>
						{cost} JEH
					</Col>
					<Col xs={1}>
						<Button onClick={onAddFunction} bsStyle="primary"><Glyphicon glyph="plus"/></Button>
					</Col>
					<Col xs={1}>
						<Button onClick={onRemoveModule} bsStyle="danger"><Glyphicon glyph="trash"/></Button>
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
		</Panel>
	);
};


export default Module;
