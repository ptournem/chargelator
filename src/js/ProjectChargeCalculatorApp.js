import React, { Component } from 'react';
import ProjectChargeCalculatorModule from './ProjectChargeCalculatorModule.js'

class ProjectChargeCalculatorApp extends Component {
	constructor(props){
		super(props);

		this.state = {
			project : '',
			modules : [{id:1, label : 'test', functions : [
				{ id : 1 ,label : "fct 1", ihm : [0,1,2,4], traitement : [0,1,2,4]},
				{ id : 2 ,label : "fct 2", ihm : [0,1,2,4], traitement : [0,1,2,4]},
				{ id : 3 ,label : "fct 3", ihm : [0,1,2,4], traitement : [0,1,2,4]}
			]},{id:1, label : 'test 2',functions : [
				{ id : 1, label : "fct 1", ihm : [0,1,2,4], traitement : [0,1,2,4]},
				{ id : 2, label : "fct 2", ihm : [0,1,2,4], traitement : [0,1,2,4]},
				{ id : 3, label : "fct 3", ihm : [0,1,2,4], traitement : [0,1,2,4]}
			]}]
		};
	}
	render(){
		const modules = this.state.modules.map((module)=><ProjectChargeCalculatorModule module={module} />);
		return	(
			<div>
				<h1>ProjectChargeCalculator</h1>
				{modules}
			</div>
		);
	}
}

export default ProjectChargeCalculatorApp;
