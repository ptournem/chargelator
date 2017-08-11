import React from 'react';
import{ Row, Col,Table} from 'react-bootstrap';
import Line from './GlobalLine.js';
import '../assets/css/Global.css';

const Global = ({cost, workflow,total, onSetConnexeCost, connexeCosts})=>{
	let lines = [];
	workflow.forEach((sumup)=> {
		lines.push(<Line key={lines.length + 1} type="sumup" charge={sumup.label} sum={sumup.total}/>);
		sumup.inner.forEach((item)=> {
			lines.push(<Line key={lines.length + 1} type="line" {...item} cost={cost} onSetConnexeCost={onSetConnexeCost} connexeCosts={connexeCosts} />);
		});
	});
	return (
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
	)
}

export default Global;
