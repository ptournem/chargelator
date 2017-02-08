import React, { Component } from 'react';

class ProjectChargeCalculatorFunction extends Component {
	render(){
		return <tr>
			<td>{this.props.function.id}</td>
			<td>{this.props.function.label}</td>
			<td>{this.props.function.ihm[0]}</td>
			<td>{this.props.function.ihm[1]}</td>
			<td>{this.props.function.ihm[2]}</td>
			<td>{this.props.function.ihm[3]}</td>
			<td>{this.props.function.traitement[0]}</td>
			<td>{this.props.function.traitement[1]}</td>
			<td>{this.props.function.traitement[2]}</td>
			<td>{this.props.function.traitement[3]}</td>
		</tr>;
	}
}

export default ProjectChargeCalculatorFunction;
