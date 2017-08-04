import React from 'react';
import{ Button, Glyphicon , Well, Row, Col, Alert} from 'react-bootstrap';
import Module from '../containers/Module.js';
import ParamCoef from '../containers/ParamCoef.js';

// hors de la constante pour quelle soit gardé en mémoire
let counter = 0;

const App = ({project,cost, modules, onAddModule, onSetProjectLabel, onSaveAsJson, onReset, onToggleShowParam,setIsDragging,onLoadJson}) => {
	const mods = modules.map((module)=><Module key={module.get('id')} id={module.get('id')}/>);
	const param =  project.get('isParamShown')?<ParamCoef />:"";

	const renderDroppingZone= () => {
		return (<Alert bsStyle="info">
          <h4>Vous pouvez glisser votre fichier pour qu'il soit pris en compte</h4>
        </Alert>);
	}

	const loadJson = (evt) => {
		evt.preventDefault();
		counter = 0;

		var reader = new FileReader();
		reader.addEventListener("load",function(){
			let data =null;
			try {
				data = JSON.parse(reader.result);
			} catch (e){
				console.log('error parsing JSON');
				console.log(reader.result);
				return ;
			}

			onLoadJson(data);

		})


		try {
			reader.readAsText(evt.dataTransfer.files[0]);
		} catch (e) {
			console.log("error reading file");
			return;
		}

		setIsDragging(false);
	};
	const dragOver = (evt) => {
		evt.preventDefault();
	};
	const dragEnter = (evt) => {
		evt.preventDefault();
		counter++ ;
		if(counter === 1){
			setIsDragging(true);
		}
		return false;
	};
	const dragLeave = (evt) => {
		evt.preventDefault();
		counter--;
		if(counter<=0){
			setIsDragging(false);
		}
		return false;
	};

	const droppingAlert = project.get('isDragging')?renderDroppingZone():'';
	return	(
		<div onDrop={loadJson} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave}>
			{droppingAlert}
			<Row>
				<Col xs={10}>
					<h1><input type="text" value={project.get('label')} onChange={evt =>{ onSetProjectLabel(evt.target.value)}} /></h1>
				</Col>
				<Col xs={2}>
					<Button  className="pull-right" onClick={onToggleShowParam}><Glyphicon glyph="wrench"></Glyphicon></Button>
					<Button  className="pull-right" onClick={onSaveAsJson}><Glyphicon glyph="save"></Glyphicon></Button>
					<Button  className="pull-right" onClick={onReset}><Glyphicon glyph="new-window"></Glyphicon></Button>
				</Col>
			</Row>
			<Row>
				<Col xs={project.get('isParamShown')?9:12}>
					<Row>
						<Col xs={12}>
							<Well> Cout du projet : <b>{}</b>{cost} JEH</Well>
							<Button onClick={onAddModule}><Glyphicon glyph="plus"/> Ajouter</Button>
							{mods}
						</Col>
					</Row>

				</Col>
				{param}
			</Row>
		</div>

	);
};

export default App;
