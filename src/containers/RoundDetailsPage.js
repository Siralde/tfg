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
  };
  
  getStringFecha = (date) => {
    let dat = new Date(parseInt(date));
    let day = dat.getDay();
    let month = dat.getMonth();
    let year = dat.getFullYear();

    let hour = dat.getHours();
    let min = dat.getMinutes();

    return ( (day+1) + '/' + month + '/' + year + '\n' + hour + ':' + min );

  }

  render()
  {
    let { companyName, email, url, direction, companyDescription, youtube, membersNames, membersLinkedin, bussinesModel, roundPurpose, id, tokenValue } = this.state.details;
    let { weiRaise, goal, openingTime, closingTime } = this.state;

    return ( 
      <Segment>
        <script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h2>{companyName}</h2>
            </Grid.Column>
          </Grid.Row>
        
          <Grid.Row>
            <Grid.Column textAlign="center">

              <iframe width="560" height="315" src="https://www.youtube.com/embed/-AoFMcOHlpY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              
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
              <h4 style={{ fontSize: '1.33em' }}>{companyDescription}</h4>
            </Grid.Column>
              
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Detalles de la Ronda
              </Header>
                <h4>ETH Recaudado: {web3.utils.fromWei(weiRaise)}</h4> 
                <h4>ETH Meta: {web3.utils.fromWei(goal)}</h4>
                <h4>Fecha de Inicio: {this.getStringFecha(openingTime*1000)}</h4>
                <h4>Fecha de Fin: {this.getStringFecha(closingTime*1000)}</h4>
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
            <Grid.Column textAlign="center" width='5'>
              URL: <h4>{url}</h4>
            </Grid.Column>
            <Grid.Column textAlign="center" width='3'>
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

        {/* <Divider
          as='h1'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        > */}
          {/* Detalles
        </Divider> */}

        {/* <Grid celled='internally' columns='equal' stackable>
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
        </Grid> */}

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
          <Link 
            style={{color: 'white'}}
            to={{
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