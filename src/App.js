import React, { Component } from 'react';
import './App.css';
import ProjectChargeCalculatorApp from './containers/App.js';
import { Grid, Navbar, Row, Col } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
	  	<Navbar inverse>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">React Project Charge Calculator</a>
              </Navbar.Brand>
            </Navbar.Header>
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
