import {connect} from 'react-redux';
import {setProjectLabel,addModule,resetProject,toggleShowParam,setIsDragging,loadJson,setCurrentTab} from '../actions';
import AppComponent from '../components/App';
import Utils from '../Utils/Utils';
import FileSaver from 'file-saver';

const mapStateToProps = (state,{id}) => {
	const modules = state.modules.allIds.map(id => state.modules.byId.get(id));
	const project = state.projects;

	const {cost :realCost,totalAfterMarge : globalCost} = Utils.getGlobalCost(state);

	return {
		user : state.user.get('user'),
		modules : modules,
		project : project,
		cost : realCost,
		globalCost : globalCost,
		onSaveAsJson : () => {
			// création du fichier
			var file = new File([JSON.stringify(state)],
			 	state.projects.get('label')+".json",
				{type: "text/plain;charset=utf-8"});
			// sauvegarde pour l'user
			FileSaver.saveAs(file);
		}
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSetProjectLabel : label => {
			dispatch(setProjectLabel(label));
		},
		onAddModule : () => {
			dispatch(addModule());
		},
		onReset : () => {
			dispatch(resetProject());
		},
		onToggleShowParam : ()=> {
			dispatch(toggleShowParam());
		},
		setIsDragging : isDragging => {
			dispatch(setIsDragging(isDragging));
		},
		onLoadJson : data => {
			dispatch(loadJson(data));
		},
		onSetCurrentTab : id => {
			dispatch(setCurrentTab(id));
		}
	};
};

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppComponent);

export default App;
