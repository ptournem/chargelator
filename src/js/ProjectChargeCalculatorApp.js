import React, { Component } from 'react';
import{ Button, Glyphicon } from 'react-bootstrap';
import ProjectChargeCalculatorModule from './ProjectChargeCalculatorModule.js'
import ProjectChargeCalculatorUtils from './ProjectChargeCalculatorUtils.js'

class ProjectChargeCalculatorApp extends Component {
	constructor(props){
		super(props);

		this.state = {
			project : '',
			modules : [{id:1, label : 'test', functions : [
				{ id : 1 ,label : "fct 1", ihm : [0,1,2,4], traitement : [0,1,2,4]},
				{ id : 2 ,label : "fct 2", ihm : [0,1,2,4], traitement : [0,1,2,4]},
				{ id : 3 ,label : "fct 3", ihm : [0,1,2,4], traitement : [0,1,2,4]}
			]},{id:2, label : 'test 2',functions : [
				{ id : 1, label : "fct 1", ihm : [0,1,2,4], traitement : [0,1,2,4]},
				{ id : 2, label : "fct 2", ihm : [0,1,2,4], traitement : [0,1,2,4]},
				{ id : 3, label : "fct 3", ihm : [0,1,2,4], traitement : [0,1,2,4]}
			]}]
		};

		this.addModule = this.addModule.bind(this);
		this.setModuleLabel = this.setModuleLabel.bind(this);
		this.removeModule = this.removeModule.bind(this);
		this.addFunction = this.addFunction.bind(this);
		this.setFunctionLabel  = this.setFunctionLabel.bind(this);
	}
	render(){
		const modules = this.state.modules.map((module)=><ProjectChargeCalculatorModule key={module.id}
			module={module}
			onRemove={this.removeModule}
			onAddFunction={this.addFunction}
			onSetFunctionLabel={this.setFunctionLabel} />);
		return	(
			<div>
				<h1>ProjectChargeCalculator</h1>
				<Button onClick={this.addModule}><Glyphicon glyph="plus"/> Ajouter</Button>
				{modules}
			</div>
		);
	}

	addModule(){

		const uuid= "mod_" + ProjectChargeCalculatorUtils.uuid();
		this.setState((prev) => {
			prev.modules.push({id:uuid,label:'',functions:[]});

			return prev;
		});
		this.setModuleLabel(uuid,'test ' + uuid );
		return uuid;


	}

	setModuleLabel(uuid,label){
		this.setState((prev)=> {
			prev.modules = prev.modules.map((module)=>{
				if(module.id===uuid){
					module.label = label
				}
				return module;
			})

			return prev;

		})
	}

	removeModule(uuid){
		this.setState((prev)=>{
			prev.modules = prev.modules.filter(function(el){
				return el.id !==uuid;
			});

			return prev;
		});
	}

	addFunction(mod){
		const uuid= "fct_" + ProjectChargeCalculatorUtils.uuid();
		this.setState((prev) => {
			prev.module = prev.modules.map((module)=>{
				if(module.id===mod){

					module.functions.push({
						id : uuid ,
						label : "",
						ihm : [0,0,0,0],
						traitement : [0,0,0,0]
					});


				}
				return module;
			});

			return prev;
		});
	}

	setFunctionLabel(mod,func,label){
		this.setState((prev) => {
			prev.module = prev.modules.map((module)=>{
				if(module.id===mod){
					module.functions.map((fct)=>{
						if(fct.id===func){
							fct.label = label;
						}
						return fct;
					});

				}
				return module;
			});

			return prev;
		});
	}

	setFunctionCost(mod,func,ihm,traitement){
		this.setState((prev) => {
			prev.module = prev.modules.map((module)=>{
				if(module.id===mod){
					module.functions.map((fct)=>{
						if(fct.id===func){
							fct.ihm = ihm;
							fct.traitement= traitement;
						}
						return fct;
					});
				}
				return module;
			});

			return prev;
		});
	}
}

export default ProjectChargeCalculatorApp;
