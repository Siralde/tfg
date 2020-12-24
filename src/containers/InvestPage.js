import React, { Component } from 'react';
import { listRoundDetailss as listRoundDetails } from '.././graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class HomePage extends Component {

  constructor(props){
    super(props);
    this.state = {
        rounds : []
    };
    this.renderRounds = this.renderRounds.bind(this);
  }  

  // execute the query in componentDidMount
  async componentDidMount() {
    try 
    {
      const roundsData = await API.graphql(graphqlOperation(listRoundDetails));
      this.setState({rounds : roundsData.data.listRoundDetailss.items});
    } 
    catch (err) 
    {
      console.log('error fetching talks...', err)
    }
  }

  renderRounds() {
    
    if(this.state.rounds === [])
    {
      return <div>Loading</div>
    }
    else
    {
      
      const roundDetails = this.state.rounds.map(round => {
        return {
            header: round.companyName,
            key: round.id,
            image: '',
            description: (
              <div>
                <Link to={`/roundDetails/${round.id}`}>
                  Ver Detalles
                </Link>
                <p>{round.companyDescription}</p>
              </div>
            )
        };
      });
      return <Card.Group items={roundDetails}/>;
    }
  }

  render() {
    return (
      <div>
        <h1>Nombre de la Empresa</h1>
        <h2>Wallet Address</h2>
        <h3>Input con Tokens a Recibir</h3>
        <h3>Input con Tokens a Enviar</h3>
        <h3>Boton de Imprimir que llama a Metamask</h3>
        <h3>Politica y Disclaimer</h3>
      </div>
    )
  }
}
  
export default HomePage;