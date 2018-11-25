import React, { Component } from 'react';
import './App.css';
import Chart from './components/chart/chart'
import SearchBar from './components/searchbar/searchbar'

class App extends Component {

  constructor(){
    super();
    this.state = {
      company : ''
    }
  }

  updateCompanyValue = (val) => {
    this.setState({
        company: val
    })
  };

  render() {
    return (
      <div className="App">
        <SearchBar companyUpdate={this.updateCompanyValue} />
        <Chart company={this.state.company} />
      </div>
    );
  }
}

export default App;
