import React from 'react';
import{ Row, Col,Table} from 'react-bootstrap';
import Line from './GlobalLine.js';
import '../assets/css/Global.css';

const Global = ({cost, workflow,total, onSetConnexeCost, connexeCosts, nbWeek, nbMonth, minWeek,minMonth, optWeek,optMonth,project,onSetProjectParam,margeSecu,margeSecuDay, margeComplexDay, totalAfterMarge})=>{
	let lines = [];
	workflow.forEach((sumup)=> {
		lines.push(<Line key={lines.length + 1} type="sumup" charge={sumup.label} sum={sumup.total}/>);
		sumup.inner.forEach((item)=> {
			lines.push(<Line key={lines.length + 1} type="line" {...item} cost={cost} onSetConnexeCost={onSetConnexeCost} connexeCosts={connexeCosts} />);
		});
	});

	let param = '';
	if(project.get('isParamShown')){
		param = (
			<Col xs={3} >
				<Table responsive striped bordered condensed>
					<thead>
						<tr>
							<th>Paramètre</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Délais du projet (semaines)</td>
							<td><input type="number" value={project.get('parameters').get('delay')} onChange={(evt) => onSetProjectParam('delay',evt.target.value)} /></td>
						</tr>
						<tr>
							<td>Complexité du projet </td>
							<td>
								<select onChange={(evt) => onSetProjectParam('complexite',evt.target.value)} value={project.get('parameters').get('complexite')} >
									<option value={0}>Aucune</option>
									<option value={3}>Faible</option>
									<option value={5}>Moyenne</option>
									<option value={7}>Forte</option>
								</select>
							</td>
						</tr>
					</tbody>
				</Table>
			</Col>
		);
	}
	return (
		<Row>
			<Col xs={project.get('isParamShown')?9:12}>
				<Row>
					<Col xs={12}>
						<Table responsive striped bordered condensed >
							<thead>
								<tr>
									<th>Partie</th>
									<th>Charges</th>
									<th>JEH</th>
									<th>%</th>
									<th>Charges : JEH</th>
								</tr>
							</thead>
							<tbody>
								{lines}
							</tbody>
							<tfoot>
								<tr>
									<th></th>
									<th></th>
									<th></th>
									<th>Total</th>
									<th>{total}</th>
								</tr>
							</tfoot>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col xs={6}>
						<Table responsive striped bordered condensed >
							<thead>
								<tr>
									<th>Marge</th>
									<th>%</th>
									<th>JEH</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>Complexité</th>
									<td>{project.get('parameters').get('complexite')}%</td>
									<td>{margeComplexDay}</td>
								</tr>
								<tr>
									<th>Sécurité</th>
									<td>{margeSecu}%</td>
									<td>{margeSecuDay}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
					<Col xs={6}>
						<Table responsive striped bordered condensed >
							<thead>
								<tr>
									<th>Partie</th>
									<th>Mois</th>
									<th>Semaine</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>Charges</th>
									<td>{nbMonth}</td>
									<td>{nbWeek}</td>
								</tr>
								<tr>
									<th>Temp minimum</th>
									<td>{minMonth}</td>
									<td>{minWeek}</td>
								</tr>
								<tr>
									<th>Temp optimal</th>
									<td>{optMonth}</td>
									<td>{optWeek}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						<Table responsive striped bordered condensed>
							<thead>
								<tr>
									<th>Total avant marges</th>
									<th>{total} JEH</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>Total marges</th>
									<th>{margeSecuDay + margeComplexDay} JEH</th>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<th>Total après marges</th>
									<th>{totalAfterMarge} JEH</th>
								</tr>
							</tfoot>
						</Table>
					</Col>
				</Row>
			</Col>
			{param}
		</Row>

	)
}

export default Global;
