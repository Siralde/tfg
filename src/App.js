import React, { Component } from 'react';
import './App.css';
import Layout from './components/layout';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Router>
        <Layout>
        </Layout>
      </Router>
    )
  }
}

export default App;