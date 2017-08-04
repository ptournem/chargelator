import React from 'react';
import{ Button, Glyphicon } from 'react-bootstrap';

const Function = ({fnc,cost, onSetFunctionLabel,onSetFunctionCosts, onRemoveFunction}) => {
	const  handleChangeCost = (cost,isIhm,index) => {
		const newCosts = fnc.get('costs').update(isIhm?'ihm':'traitement', v => v.update(index, ()=> parseInt(cost,10)));

		// on signale le changement au parent
		onSetFunctionCosts(newCosts);
	};

	return (
		<tr>
			<td>#</td>
			<td><input value={fnc.get('name')} type="text" onChange={(evt) => onSetFunctionLabel(evt.target.value)} /></td>
			<td><input type="number" min={0} value={fnc.get('costs').get('ihm').get(0)} onChange={(evt)=>handleChangeCost(evt.target.value,true,0)}/></td>
			<td><input type="number" min={0} value={fnc.get('costs').get('ihm').get(1)} onChange={(evt)=>handleChangeCost(evt.target.value,true,1)}/></td>
			<td><input type="number" min={0} value={fnc.get('costs').get('ihm').get(2)} onChange={(evt)=>handleChangeCost(evt.target.value,true,2) }/></td>
			<td><input type="number" min={0} value={fnc.get('costs').get('ihm').get(3)} onChange={(evt)=>handleChangeCost(evt.target.value,true,3)}/></td>
			<td><input type="number" min={0} value={fnc.get('costs').get('traitement').get(0)} onChange={(evt)=>handleChangeCost(evt.target.value,false,0)}/></td>
			<td><input type="number" min={0} value={fnc.get('costs').get('traitement').get(1)} onChange={(evt)=>handleChangeCost(evt.target.value,false,1)}/></td>
			<td><input type="number" min={0} value={fnc.get('costs').get('traitement').get(2)} onChange={(evt)=>handleChangeCost(evt.target.value,false,2)}/></td>
			<td><input type="number" min={0} value={fnc.get('costs').get('traitement').get(3)} onChange={(evt)=>handleChangeCost(evt.target.value,false,3)}/></td>
			<td><b>{cost}</b></td>
			<td><Button bsStyle="danger" onClick={()=>onRemoveFunction()}><Glyphicon glyph="trash" /></Button></td>
		</tr>
	);
};

export default Function;
