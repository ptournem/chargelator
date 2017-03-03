import React, { Component } from 'react';
import{ Button, Glyphicon , Well, Row, Col} from 'react-bootstrap';
import ProjectChargeCalculatorModule from './ProjectChargeCalculatorModule.js';
import ProjectChargeCalculatorUtils from './ProjectChargeCalculatorUtils.js';
import FileSaver from 'file-saver';

class ProjectChargeCalculatorApp extends Component {
	constructor(props){
		super(props);

		this.state = {
			project : 'Nouveau Projet',
			modules : []
		};

		this.setProjectName = this.setProjectName.bind(this);
		this.addModule = this.addModule.bind(this);
		this.setModuleLabel = this.setModuleLabel.bind(this);
		this.removeModule = this.removeModule.bind(this);
		this.addFunction = this.addFunction.bind(this);
		this.setFunctionLabel  = this.setFunctionLabel.bind(this);
		this.setFunctionCost = this.setFunctionCost.bind(this);
		this.removeFunction = this.removeFunction.bind(this);
		this.saveAsJson = this.saveAsJson.bind(this);
	}
	render(){
		const modules = this.state.modules.map((module)=><ProjectChargeCalculatorModule key={module.id}
			module={module}
			onRemove={this.removeModule}
			onSetLabel={this.setModuleLabel}
			onAddFunction={this.addFunction}
			onRemoveFunction={this.removeFunction}
			onSetFunctionLabel={this.setFunctionLabel}
			onSetFunctionCost={this.setFunctionCost} />);
		return	(
			<div>
				<Row>
					<Col xs={10}>
						<h1><input type="text" value={this.state.project} onChange={this.setProjectName} /></h1>
					</Col>
					<Col xs={2}>
						<Button onClick={this.saveAsJson}  className="pull-right"><Glyphicon glyph="save"></Glyphicon></Button>
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						<Well> Cout du projet : <b>{ProjectChargeCalculatorUtils.getProjectCost(this.state.modules)}</b> JEH</Well>
						<Button onClick={this.addModule}><Glyphicon glyph="plus"/> Ajouter</Button>
						{modules}
					</Col>
				</Row>
			</div>
		);
	}
	/**
	 * Met a jours le nom du projet
	 */
	setProjectName(evt){
		// on stocke la valeur
		const name  = evt.target.value;
		// on mets a jours l'etat
		this.setState((prev)=>{
			prev.project = name;

			return prev;
		});
	}

	/**
	 * Ajoute un module
	 */
	addModule(){
		// recuperation d' uuid
		const uuid= "mod_" + ProjectChargeCalculatorUtils.uuid();
		// ajout du module
		this.setState((prev) => {
			prev.modules.push({id:uuid,label:'',functions:[]});

			return prev;
		});
	}

	/**
	 * Modifie le label d'un module
	 */
	setModuleLabel(uuid,label){
		this.setState((prev)=> {
			prev.modules = prev.modules.map((module)=>{
				// pour le bon module on mets a jours le label
				if(module.id===uuid){
					module.label = label
				}
				return module;
			})

			return prev;

		})
	}

	/**
	 * Supprime un module
	 */
	removeModule(uuid){
		this.setState((prev)=>{
			prev.modules = prev.modules.filter((el) => el.id !== uuid);

			return prev;
		});
	}

	/**
	 * Ajoute une fonctionnalite a un module
	 */
	addFunction(mod){
		// on charge un uuid
		const uuid= "fct_" + ProjectChargeCalculatorUtils.uuid();
		this.setState((prev) => {
			prev.modules = prev.modules.map((module)=>{
				// pour le bon module
				if(module.id===mod){
					// on ajoute une fonctionnalite
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

	/**
	 * Supprime une fonctionnalite a un module
	 */
	removeFunction(mod,fct){
		this.setState((prev)=>{
				prev.modules = prev.modules.map((module)=>{
					// pour le bon module, on supprime la fonctionnalite
					if(module.id===mod){
						module.functions = module.functions.filter((el)=>el.id!==fct);
					}

					return module;
				});

				return prev;
		});
	}

	/**
	 * Set le label d'une fonctionnalite
	 */
	setFunctionLabel(mod,func,label){
		this.setState((prev) => {
			prev.modules = prev.modules.map((module)=>{
				// Pour le bon module
				if(module.id===mod){
					module.functions.map((fct)=>{
						// Pour la bonne fonctionnalite, on set le label
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

	/**
	 * Set les couts d'une fonctionnalite
	 */
	setFunctionCost(mod,func,ihm,traitement){
		this.setState((prev) => {
			prev.modules = prev.modules.map((module)=>{
				// pour le bon module
				if(module.id===mod){
					module.functions.map((fct)=>{
						// Pour la bonne fonctionnalite, on set les couts ihm et traitement
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

	/**
	* Propose de télécharger le fichier .json correspondant au projet
	*/
	saveAsJson(){
		// création du fichier
		var file = new File([JSON.stringify(this.state)], this.state.project+".json", {type: "text/plain;charset=utf-8"});
		// sauvegarde pour l'user
		FileSaver.saveAs(file);
	}
}

export default ProjectChargeCalculatorApp;
