import React from 'react';
import{Col,Table, Panel} from 'react-bootstrap';

const ParamCoef = ({costs, onSetProjectCosts}) => {
	const  handleChangeCost = (cost,isIhm,index) => {
		if(isNaN(parseFloat(cost,10))){
			return;
		}
		const newCosts = costs.update(isIhm?'ihm':'traitement', v => v.update(index, ()=> parseFloat(cost.replace(',','.'),10)));
		// on signale le changement au parent
		onSetProjectCosts(newCosts);
	};

	return (
		<Col xs={3}>
	        <Panel title="Parametrage IHM">
	          <Table fill responsive striped bordered>
	            <thead>
	              <tr>
	                <th colSpan={2}>IHM</th>
	              </tr>
	            </thead>
	            <tbody>
	              <tr>
	                <td>
	                  Faible
	                </td>
	                <td>
	                  <input type="text" value={costs.get('ihm').get(0)} onChange={(evt)=>handleChangeCost(evt.target.value,true,0)}/>
	                </td>
	              </tr>
	              <tr>
	                <td>
	                  Simple
	                </td>
	                <td>
	                  <input type="text" value={costs.get('ihm').get(1)} onChange={(evt)=>handleChangeCost(evt.target.value,true,1)}/>
	                </td>
	              </tr>
	              <tr>
	                <td>
	                  Moyen
	                </td>
	                <td>
	                  <input type="text" value={costs.get('ihm').get(2)} onChange={(evt)=>handleChangeCost(evt.target.value,true,2)}/>
	                </td>
	              </tr>
	              <tr>
	                <td>
	                  Complexe
	                </td>
	                <td>
	                  <input type="text" value={costs.get('ihm').get(3)} onChange={(evt)=>handleChangeCost(evt.target.value,true,3)}/>
	                </td>
	              </tr>
	            </tbody>
	          </Table>
	        </Panel>
	        <Panel title="Parametrage traitement">
	          <Table fill responsive striped bordered>
	            <thead>
	              <tr>
	                <th colSpan={2}>Traitement</th>
	              </tr>
	            </thead>
	            <tbody>
	              <tr>
	                <td>
	                  Faible
	                </td>
	                <td>
	                  <input type="text" value={costs.get('traitement').get(0)} onChange={(evt)=>handleChangeCost(evt.target.value,false,0)}/>
	                </td>
	              </tr>
	              <tr>
	                <td>
	                  Simple
	                </td>
	                <td>
	                  <input type="text" value={costs.get('traitement').get(1)} onChange={(evt)=>handleChangeCost(evt.target.value,false,1)}/>
	                </td>
	              </tr>
	              <tr>
	                <td>
	                  Moyen
	                </td>
	                <td>
	                  <input type="text" value={costs.get('traitement').get(2)} onChange={(evt)=>handleChangeCost(evt.target.value,false,2)}/>
	                </td>
	              </tr>
	              <tr>
	                <td>
	                  Complexe
	                </td>
	                <td>
	                  <input type="text" value={costs.get('traitement').get(3)} onChange={(evt)=>handleChangeCost(evt.target.value,false,3)}/>
	                </td>
	              </tr>
	            </tbody>
	          </Table>
	        </Panel>
	      </Col>
	);
};


export default ParamCoef;
