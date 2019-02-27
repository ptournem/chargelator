import React from 'react';
import{ Panel, Table, Button, Glyphicon ,Grid, Row, Col} from 'react-bootstrap';
import Function from '../containers/Function.js';

import '../assets/css/Module.css';

const moduleDetail = (fonctions,isShown) => {
	if(!isShown){
		return ''
	}

	return (
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
						<th><span title="Faible">--</span></th>
						<th><span title="Simple">-</span></th>
						<th><span title="Moyen">+</span></th>
						<th><span title="Complexe">++</span></th>
						<th><span title="Faible">--</span></th>
						<th><span title="Simple">-</span></th>
						<th><span title="Moyen">+</span></th>
						<th><span title="Complexe">++</span></th>

			  </tr>
			</thead>
			<tbody>
				{fonctions}
			</tbody>
		</Table>
	);
}

const Module = ({module, cost,percentage, functions ,onAddFunction, onRemoveModule, onSetModuleLabel,onToggleShowModule}) => {
	const fonctions = functions.map((func)=> <Function key={func} id={func} />);

	return (
 		<Panel className="projectChargeCalculatorModule">
			<Grid fluid>
				<Row>
					<Col xs={8}>
						<input type="text" value={module.get('name')} onChange={(evt) =>{onSetModuleLabel(evt.target.value)}}/>
					</Col>
					<Col xs={1}>
						{cost} JEH
					</Col>
					<Col xs={1}>
						{Math.round(percentage*1000)/10} %
					</Col>
					<Col xs={2}>
						<Button onClick={onAddFunction} bsStyle="primary"><Glyphicon glyph="plus"/></Button>
						<Button onClick={onRemoveModule} bsStyle="danger"><Glyphicon glyph="trash"/></Button>
						<Button className='pull-right' onClick={onToggleShowModule} bsStyle="info"><Glyphicon glyph={module.get('isShown')?'chevron-up':'chevron-down'}/></Button>
					</Col>
				</Row>
			</Grid>
			{moduleDetail(fonctions, module.get('isShown'))}
		</Panel>
	);
};


export default Module;
