import React, { Component } from 'react';
import{ Button, Glyphicon , Well, Row, Col, Alert} from 'react-bootstrap';
import ProjectChargeCalculatorModule from './ProjectChargeCalculatorModule.js';
import ProjectChargeCalculatorUtils from './ProjectChargeCalculatorUtils.js';
import ProjectChargeCalculatorParamCoef from './ProjectChargeCalculatorParamCoef.js';
import FileSaver from 'file-saver';

class ProjectChargeCalculatorApp extends Component {
	constructor(props){
		super(props);

		this.state = {
			project : {
				label : 'Nouveau Projet',
				modules : [],
				param : {
					costCoef : {
						ihm : [
							0.25, 0.5, 1, 2
						],
						traitement : [
							0.25, 0.5, 1, 2
						]
					}
				}
			},
			isDragging : false,
			counterDrag : 0,
			showParam : false
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
		this.loadJson = this.loadJson.bind(this);
		this.dragOver = this.dragOver.bind(this);
		this.dragEnter = this.dragEnter.bind(this);
		this.dragLeave = this.dragLeave.bind(this);
		this.setParamCost = this.setParamCost.bind(this);
		this.toggleParam = this.toggleParam.bind(this);
		this.reset= this.reset.bind(this);
	}

	renderDroppingZone(){
		return (<Alert bsStyle="info">
          <h4>Vous pouvez glisser votre fichier pour qu'il soit pris en compte</h4>
        </Alert>);
	}
	render(){
		const modules = this.state.project.modules.map((module)=><ProjectChargeCalculatorModule key={module.id}
			module={module}
			onRemove={this.removeModule}
			onSetLabel={this.setModuleLabel}
			onAddFunction={this.addFunction}
			onRemoveFunction={this.removeFunction}
			onSetFunctionLabel={this.setFunctionLabel}
			onSetFunctionCost={this.setFunctionCost}
			param={this.state.project.param} />);
		const param = this.state.showParam ? <ProjectChargeCalculatorParamCoef param={this.state.project.param} onChangeCost={this.setParamCost} /> : "";

		const droppingAlert = this.state.isDragging=== true ? this.renderDroppingZone() : '';
		return	(
			<div onDrop={this.loadJson} onDragOver={this.dragOver} onDragEnter={this.dragEnter} onDragLeave={this.dragLeave}  >
				{droppingAlert}
				<Row>
					<Col xs={10}>
						<h1><input type="text" value={this.state.project.label} onChange={this.setProjectName} /></h1>
					</Col>
					<Col xs={2}>
						<Button onClick={this.toggleParam} className="pull-right"><Glyphicon glyph="wrench"></Glyphicon></Button>
						<Button onClick={this.saveAsJson}  className="pull-right"><Glyphicon glyph="save"></Glyphicon></Button>
						<Button onClick={this.reset} className="pull-right"><Glyphicon glyph="new-window"></Glyphicon></Button>
					</Col>
				</Row>
				{param}
				<Row>
					<Col xs={12}>
						<Well> Cout du projet : <b>{ProjectChargeCalculatorUtils.getProjectCost(this.state.project.modules,this.state.project.param.costCoef)}</b> JEH</Well>
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
			prev.project.label = name;

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
			prev.project.modules.push({id:uuid,label:'',functions:[]});

			return prev;
		});
	}

	/**
	 * Modifie le label d'un module
	 */
	setModuleLabel(uuid,label){
		this.setState((prev)=> {
			prev.project.modules = prev.project.modules.map((module)=>{
				// pour le bon module on mets a jours le label
				if(module.id===uuid){
					module.label = label
				}
				return module;
			})

			return prev;

		})
	}

	reset(){
		this.setState((prev)=>{
			prev.project.label = "Nouveau Projet";
			prev.project.modules = [];
		});
	}

	/**
	 * Supprime un module
	 */
	removeModule(uuid){
		this.setState((prev)=>{
			prev.project.modules = prev.project.modules.filter((el) => el.id !== uuid);

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
			prev.project.modules = prev.project.modules.map((module)=>{
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
				prev.project.modules = prev.project.modules.map((module)=>{
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
			prev.project.modules = prev.project.modules.map((module)=>{
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
			prev.project.modules = prev.project.modules.map((module)=>{
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
		var file = new File([JSON.stringify(this.state.project)],
		 	this.state.project.label+".json",
			{type: "text/plain;charset=utf-8"});
		// sauvegarde pour l'user
		FileSaver.saveAs(file);
	}

	loadJson(evt){
		var _this=  this;
		evt.preventDefault();
		console.log("drop");
		console.log(evt);
		var reader = new FileReader();
		reader.addEventListener("load",function(){
			_this.JsonLoaded(reader.result);
		})


    	try {
			reader.readAsText(evt.dataTransfer.files[0]);

    	} catch (e) {
      		// If the text data isn't parsable we'll just ignore it.
			console.log("error parsing");
      		return;
    	}

		this.setState({isDragging : false});

	}

	/**
	 *
	 */
	JsonLoaded(data){
		this.setState({project : JSON.parse(data)});
	}

	/**
	 * indique que le drag est over
	 */
	dragOver(evt){
		evt.preventDefault();
	}

	/**
	 * Indique qu'on rentre en drag dans la zone
	 */
	dragEnter(evt){
		evt.preventDefault();
		this.setState((prev)=>{
			prev.isDragging = true;
			prev.counterDrag += 1;
			return prev;
		});
		return false;
	}

	/**
	 * Reinitialise a la sortie de la zone
	 */
	dragLeave(evt){
		evt.preventDefault();
		this.setState((prev)=>{
			prev.counterDrag -= 1;
			prev.isDragging = (prev.counterDrag !== 0);
			return prev;
		});
		return false;
	}

	/**
	 * Mets à jours les costs dans le parametrage du project
	 */
	setParamCost(costs){
		this.setState((prev)=>{
			prev.project.param.costCoef = costs;

			return prev;
		});
	}

	/**
	 * Toggle le show param
	 */
	toggleParam(){
		this.setState((prev)=>{
			prev.showParam = !prev.showParam;
			return prev;
		})
	}
}

export default ProjectChargeCalculatorApp;
