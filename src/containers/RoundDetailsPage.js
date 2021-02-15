import React, { Component } from 'react';
import { getRoundDetails } from '.././graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import web3 from '../ethereum/web3.js';
import Campaign from '../ethereum/campaign';
import { Link } from 'react-router-dom';
import { Grid, Divider, Button, Segment, Container, Header, Icon } from 'semantic-ui-react';


class RoundDetailsPage extends Component {

  state = {
    weiRaise: '',
    goal: '',
    openingTime: new Date().getTime().toString(),
    closingTime: new Date().getTime().toString(),
    details: {
      companyName: '', 
      email: '', 
      url: '', 
      direction: '', 
      companyDescription: '', 
      youtube: '', 
      membersNames: [''], 
      membersLinkedin: [''], 
      bussinesModel: '', 
      roundPurpose: '',
      id: '',
      tokenValue: ''
    }
  }

  async componentDidMount() {

    //Linkedin Plugin
    const script = document.createElement("script");
    script.setAttribute('type','text/javascript');
    script.setAttribute('src','https://platform.linkedin.com/badges/js/profile.js');
    // script.setAttribute('async');
    // script.setAttribute('defer')
    document.head.appendChild(script);
    //Linkedin Plugin



    const campaignID = this.props.match.params.id;

    try {
      const campaign = Campaign(campaignID, web3);
      const weiRaise = await campaign.methods.weiRaised().call();
      const goal = await campaign.methods.cap().call();
      const openingTime = await campaign.methods.openingTime().call();
      const closingTime = await campaign.methods.closingTime().call();

      this.setState({ weiRaise, goal, openingTime, closingTime });
      console.log("Ethereum Data: " + weiRaise, goal, openingTime, closingTime);

    } 
    catch (err) 
    {
      console.log('error fetching data from Ethereum...', err)
    }

    try 
    {
      console.log("Props Data ", this.props.match );
      const roundsData = await API.graphql(graphqlOperation(getRoundDetails, { id: this.props.match.params.id }));
      console.log("GraphQl Data: ", roundsData.data.getRoundDetails);
      this.setState({ details : roundsData.data.getRoundDetails });
    } 
    catch (err) 
    {
      console.log('error fetching data from GraphQL...', err)
    }
  }

  renderMembers = (names, linkedins) => {
    
    console.log(names, linkedins); //error aqui

    if(names === undefined || linkedins === undefined)
    {
      return <div>loading</div>
    }
    else{
      const members = names.map( (name, index) => {
        let lbl = "" + name + index;
        return (           
            <Grid.Column key={lbl}>
              <div 
                className="LI-profile-badge"  
                data-version="v1" 
                data-size="medium" 
                data-locale="es_ES" 
                data-type="vertical" 
                data-theme="dark" 
                data-vanity="aldemaro-gonzalez"
              >
                <a 
                  className="LI-simple-link" 
                  href='https://es.linkedin.com/in/aldemaro-gonzalez?trk=profile-badge'
                >
                  {name}
                </a>
              </div>
            </Grid.Column>
        )
      });
      return members;
    }
  }

  renderEthereumDetails = () => {
    return (
      <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Detalles de la Ronda
        </Header>
        
          Mucho Ether
      </Grid.Column>
    )
  }


  render()
  {
    let { companyName, email, url, direction, companyDescription, youtube, membersNames, membersLinkedin, bussinesModel, roundPurpose, id, tokenValue } = this.state.details;
    let { weiRaise, goal, openingTime, closingTime } = this.state;

    return ( 
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h2>{companyName}</h2>
            </Grid.Column>
          </Grid.Row>
        
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h1>Video de Youtube que me recarga la pagina y hace que los parametros de la url cambien</h1>
              {/* <iframe 
                title={companyName}
                width="560" 
                height="315" 
                src={youtube} 
                allow='autoplay; encrypted-media; picture-in-picture' 
                allowFullScreen
              >
              </iframe> */}
              {youtube}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <Icon style={{ 'marginRight': '0'}} name="angle down"/>
        </Divider>
      
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Descripción de la Idea
              </Header>
              <p style={{ fontSize: '1.33em' }}>{companyDescription}</p>
            </Grid.Column>
              
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Detalles de la Ronda
              </Header>
                {/* <h2>ETH Recaudado: {web3.utils.fromWei(weiRaise)}</h2> 
                <h2>ETH Meta: {web3.utils.fromWei(goal)}</h2> */}
                <h2>Fecha de Inicio: {new Date(parseInt(openingTime*1000)).toUTCString()}</h2>
                <h2>{openingTime}</h2>

                <h2>Fecha de Fin: {new Date(parseInt(closingTime*1000)).toUTCString()}</h2>
                <h2>{closingTime}</h2>


                {/* <h2>Closing Time: {dateCT.getDay()} de {months[dateCT.getMonth()]} de {dateCT.getFullYear()}</h2> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider
            as='h1'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            Información de la Empresa
        </Divider>

        <Container text>
          <Grid>
          <Grid.Row columns='12'>
            <Grid.Column textAlign="center" width='4'>
              EMAIL: <h4>{email}</h4>
            </Grid.Column>
            <Grid.Column textAlign="center" width='4'>
              URL: <h4>{url}</h4>
            </Grid.Column>
            <Grid.Column textAlign="center" width='4'>
              Direccion: <h4>{direction}</h4>
            </Grid.Column>
          </Grid.Row>
          </Grid>

          <Divider
            as='h1'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            Equipo
          </Divider>
          
          <Grid>
            <Grid.Row columns='2'>
              {this.renderMembers(membersNames, membersLinkedin)}
            </Grid.Row>
          </Grid>

        <Divider
          as='h1'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          Detalles
        </Divider>

        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Modelo de Negocio
              </Header>
              <p style={{ fontSize: '1.33em' }}>{bussinesModel}</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Propósito de la Ronda
              </Header>
              {roundPurpose}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        </Container>

        <Button 
          size='massive' 
          style={
            { 
              position: "fixed",
              margin: "2em",
              bottom: "0px",
              left: "0px",
              animation: "1.5s ease-in-out 0s infinite normal none running back-to-docs",
            }
          }
          color='green'
        >
          <Link to={{
              pathname: `/${id}/invest`,
              roundDetails: {
                companyName,
                tokenValue
              } 
            }}
          >
            Invertir
          </Link>
        </Button>
      </Segment>)
  }

}



export default RoundDetailsPage;