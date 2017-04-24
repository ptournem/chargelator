import React, { Component } from 'react';
import{Col,Table, Panel} from 'react-bootstrap';

class ProjectChargeCalculatorParamCoef extends Component {
  constructor(props){
    super(props);

    this.handleChangeCost = this.handleChangeCost.bind(this);
  }

  render(){
    return <Col xs={3}>
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
                  <input type="text" value={this.props.param.costCoef.ihm[0]} onChange={(evt)=>this.handleChangeCost(evt,true,0)}/>
                </td>
              </tr>
              <tr>
                <td>
                  Simple
                </td>
                <td>
                  <input type="text" value={this.props.param.costCoef.ihm[1]} onChange={(evt)=>this.handleChangeCost(evt,true,1)}/>
                </td>
              </tr>
              <tr>
                <td>
                  Moyen
                </td>
                <td>
                  <input type="text" value={this.props.param.costCoef.ihm[2]} onChange={(evt)=>this.handleChangeCost(evt,true,2)}/>
                </td>
              </tr>
              <tr>
                <td>
                  Complexe
                </td>
                <td>
                  <input type="text" value={this.props.param.costCoef.ihm[3]} onChange={(evt)=>this.handleChangeCost(evt,true,3)}/>
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
                  <input type="text" value={this.props.param.costCoef.traitement[0]} onChange={(evt)=>this.handleChangeCost(evt,false,0)}/>
                </td>
              </tr>
              <tr>
                <td>
                  Simple
                </td>
                <td>
                  <input type="text" value={this.props.param.costCoef.traitement[1]} onChange={(evt)=>this.handleChangeCost(evt,false,1)}/>
                </td>
              </tr>
              <tr>
                <td>
                  Moyen
                </td>
                <td>
                  <input type="text" value={this.props.param.costCoef.traitement[2]} onChange={(evt)=>this.handleChangeCost(evt,false,2)}/>
                </td>
              </tr>
              <tr>
                <td>
                  Complexe
                </td>
                <td>
                  <input type="text" value={this.props.param.costCoef.traitement[3]} onChange={(evt)=>this.handleChangeCost(evt,false,3)}/>
                </td>
              </tr>
            </tbody>
          </Table>
        </Panel>
      </Col>;
  }

  handleChangeCost(evt,isIhm,index){
   // copie des valeurs actuelle
   let ihm = this.props.param.costCoef.ihm;
   let traitement = this.props.param.costCoef.traitement;

   // traitement de la valeur
   // valeur abs + verification de float
   let value = evt.target.value.replace(",",".");
   if(isNaN(parseFloat(value)) && evt.target.value!==""){
     return;
   } else if(evt.target.value === "") {
     value= "";
   }

   // mise a jours selon isIhn et l'index de la bonne valeur
   if(isIhm){
     ihm[index] = value;
   } else {
     traitement[index] = value;
   }

   // on signale le changement au parent
   this.props.onChangeCost({ihm:ihm,traitement:traitement});
 }
}

export default ProjectChargeCalculatorParamCoef;
