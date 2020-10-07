import React, { Component } from 'react';
import { getRoundDetails } from '.././graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { Grid, Divider, Button, Segment, Container, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class RoundDetailsPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      details: {}
    }
  }  

  componentWillMount () {
    const script = document.createElement("script");

    script.setAttribute('type','text/javascript');
    script.setAttribute('src','https://platform.linkedin.com/badges/js/profile.js');
    // script.setAttribute('async');
    // script.setAttribute('defer')

    document.head.appendChild(script);
  }

  async componentDidMount() {
    try 
    {
      const roundsData = await API.graphql(graphqlOperation(getRoundDetails, { id: this.props.match.params.id }));
      this.setState({ details : roundsData.data.getRoundDetails});
    } 
    catch (err) 
    {
      console.log('error fetching talks...', err)
    }
  }

  renderMembers = (names, linkedins) => {
    
    console.log(names, linkedins);

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

  render() {

    const {companyName, email, url, direction, companyDescription, youtube, membersNames, membersLinkedin, bussinesModel, roundPurpose } = this.state.details;

    return (

      <Segment style={{ padding: '0em' }} vertical>
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h2>{companyName}</h2>
          </Grid.Column>
        </Grid.Row>
       
        <Grid.Row>
          <Grid.Column textAlign="center">
            <iframe 
              title={companyName}
              width="560" 
              height="315" 
              src={youtube} 
              allow='autoplay; encrypted-media; picture-in-picture' 
              allowFullScreen
            >
            </iframe>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider
        as='h4'
        className='header'
        horizontal
        style={{ margin: '3em 0em', textTransform: 'uppercase' }}
      >
        <Icon style={{ 'margin-right': '0'}} name="angle down"/>
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
            <p style={{ fontSize: '1.33em' }}>
              
              <b>Nan</b> Mucho Ether
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
      
      <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <h1>Información de la Empresa</h1>
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
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <h1>Equipo</h1>
        </Divider>
        
        <Grid>
          <Grid.Row columns='2'>
            {this.renderMembers(membersNames, membersLinkedin)}
          </Grid.Row>
        </Grid>

      <Divider
        as='h4'
        className='header'
        horizontal
        style={{ margin: '3em 0em', textTransform: 'uppercase' }}
      >
        <h1>Detalles</h1>
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
        <Link to={`/${this.props.match.params.id}/invest`}>
          Invertir
        </Link>
      </Button>

    </Segment>
    )
  }
}
  
export default RoundDetailsPage;