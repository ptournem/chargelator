import React, { Component } from 'react';
import './App.css';
import ProjectChargeCalculatorApp from './containers/App.js';
import UserConnection from './containers/UserConnection';
import { Grid, Navbar, Nav, NavItem, Row, Col, Glyphicon } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
	  	<Navbar inverse fluid={true}>
          <Grid fluid={true}>
            <Navbar.Header>
			  	<Nav>
		  			<NavItem>
						<div id="logo">
            				<Glyphicon glyph="usd" />
							hargelator
						</div>
					</NavItem>
				</Nav>
			  	<Navbar.Toggle />
            </Navbar.Header>
			<Navbar.Collapse>
				<Nav pullRight>
					<NavItem id="user-box">
						<UserConnection />
					</NavItem>
				</Nav>
			</Navbar.Collapse>
          </Grid>
	  	</Navbar>
		<Grid bsClass="container-fluid">
			<Row>
				<Col xs={10} xsOffset={1}>
					<ProjectChargeCalculatorApp />
				</Col>
			</Row>
		</Grid>
      </div>
    );
  }
}

export default App;
