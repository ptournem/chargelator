import React from 'react';
const GlobalLine = ({label,charge,cost,percentage,type,editable,sum,connexeCosts, onSetConnexeCost}) => {
	let value = '';
	if(editable){
		value = <input value={connexeCosts.has(label)?connexeCosts.get(label):0} onChange={(evt) => {
				let v = parseInt(evt.target.value,10);
				if(!v){
					v = 0;
				}
				onSetConnexeCost(label,v);
			}} />
	} else if(type === 'line') {
		value = Math.ceil((cost/47)*percentage);
	}

	return (
		<tr className={type}>
			<th>{type!=='sumup'?label:''}</th>
			<th>{type==='sumup'?charge:''}</th>
			<td>{sum}</td>

			<td>{editable || type === 'sumup'?'':(percentage+ ' %')}</td>
			<td>{value}</td>
		</tr>
	);
}

export default GlobalLine;
