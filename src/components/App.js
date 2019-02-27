import React from 'react';
import{ Button, Glyphicon , Row, Col, Alert, Nav, NavItem, Jumbotron} from 'react-bootstrap';
import Module from '../containers/Module.js';
import Global from '../containers/Global.js';
import ParamCoef from '../containers/ParamCoef.js';
import '../assets/css/grid-overview.css';

// hors de la constante pour quelle soit gardé en mémoire
let counter = 0;

const App = ({user,project,cost,globalCost, modules, onAddModule, onSetProjectLabel, onSaveAsJson, onReset, onToggleShowParam,setIsDragging,onLoadJson,onSetCurrentTab}) => {
	const mods = modules.map((module)=><Module key={module.get('id')} id={module.get('id')}/>);
	const param =  project.get('isParamShown')?<ParamCoef />:"";

	const renderDroppingZone= () => {
		return (<Alert bsStyle="info">
          <h4>Vous pouvez glisser votre fichier pour qu il soit pris en compte</h4>
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

	const renderTab = (tab) => {
		if(tab === 1){
			return (
				<Row>
					<Col xs={project.get('isParamShown')?9:12}>
						<Row>

								<Button onClick={onAddModule}><Glyphicon glyph="plus"/> Ajouter</Button>
								{mods}

						</Row>

					</Col>
					{param}
				</Row>
			);
		} else {
			return <Global />;
		}
	}

	const droppingAlert = project.get('isDragging')?renderDroppingZone():'';

	if(!user){
		return (
			<Jumbotron>
				<h1>Bienvenue sur l'application Chargelator !!!</h1>
				<p>
					Veuillez-vous connecter pour accéder à l'application !
				</p>
			</Jumbotron>
		);
	}
	return	(
		<div onDrop={loadJson} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave}>
			{droppingAlert}
			<Row>
				<Col xs={10}>
					<h1><input type="text" value={project.get('label')} onChange={evt =>{ onSetProjectLabel(evt.target.value)}} /></h1>
				</Col>
				<Col xs={2}>
					<Button title="Show/hide parameters" className="pull-right" onClick={onToggleShowParam}><Glyphicon glyph="cog"></Glyphicon></Button>
					<Button title="Save" className="pull-right" onClick={onSaveAsJson}><Glyphicon glyph="floppy-save"></Glyphicon></Button>
					<Button title="Reset" className="pull-right" onClick={onReset}><Glyphicon glyph="repeat"></Glyphicon></Button>
				</Col>
			</Row>
			<Row>
				<ul className="grid-overview grid-overview-2">
					<li>
						<span className='name'>Cout de réalisation</span>
						<span className='value'>{cost} JEH</span>
					</li>
					<li>
						<span className='name'>Cout global</span>
						<span className='value'>{globalCost} JEH</span>
					</li>
				</ul>
			</Row>
			<Nav bsStyle="tabs" activeKey={project.get('currentTab')} justified onSelect={onSetCurrentTab}>
				<NavItem eventKey={1}>Charges de réalisation</NavItem>
				<NavItem eventKey={2}>Charges globales</NavItem>
			</Nav>
			<br />
			{renderTab(project.get('currentTab'))}

		</div>

	);
};

export default App;
