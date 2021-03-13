import React, { Component } from 'react';
import web3 from '../ethereum/web3.js';
import CampaignFactory from '../ethereum/campaignFactory';
import DateTimePicker from 'react-datetime-picker';
import { Link } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify'
import { createRoundDetails as CreateRoundDetails } from '../graphql/mutations'
import { 
  Header, 
  Icon, 
  Input, 
  Label, 
  Button, 
  Form,
  Message,
  Dimmer,
  Segment,
  Loader
} from 'semantic-ui-react';

const zeros = "0x000000000000000000000000";

class CreateRoundPage extends Component {
  
  state = {
    etherToCollect: 0,
    tokenName: '' ,
    tokenSymbol: '',
    tokenRatio: 0,
    campaignOpeningTime: new Date(),
    campaignClosingTime: new Date(),
    loading: false,
    finish: false
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  openingTimeHandler = (openingTime) => {
    this.setState({ campaignOpeningTime: openingTime });
  }

  closingTimeHandler = (closingTime) => {
    this.setState({ campaignClosingTime: closingTime });
  }

  convertDateToSeconds(date)
  {
    let seconds = parseInt(new Date(date).getTime()/1000) + 120;
    return seconds;
  }

  onSubmit = async event => {
    event.preventDefault();

    let complete = true;

    const { etherToCollect, 
            tokenName, 
            tokenSymbol, 
            tokenRatio, 
            campaignOpeningTime, 
            campaignClosingTime 
          } = this.state;

    this.setState({ loading: true, errorMessage: '' });

    try 
    {
      const account = await window.ethereum.request(
        { method: 'eth_requestAccounts' }
      );
    
      const campaignFactory = CampaignFactory(
        '0xd47352a9d51600f17155850F878FFE62920fBb74',
        web3
      );

      const createCampaignResult = await campaignFactory.methods.createCampaign(
        tokenRatio,
        tokenName,
        tokenSymbol,
        this.convertDateToSeconds(campaignOpeningTime),
        this.convertDateToSeconds(campaignClosingTime),
        web3.utils.toWei(etherToCollect, 'ether')
      ).send({ from: account.toString().toLowerCase() });

      // let campaignAddressRaw = createCampaignResult.events[1].raw.data;
      let campaignAddressRaw = createCampaignResult.events[2].raw.topics[2];
      console.log("campaignAddressRaw!", campaignAddressRaw);

      let campaignAddress = campaignAddressRaw.replace(zeros, "0x");
      console.log("campaignAddress!", campaignAddress);


      // console.log("Campaña creada!", createCampaignResult);
      let roundDetails = this.props.location.companyDetails;
      roundDetails.id = campaignAddress;
      roundDetails.tokenValue = (this.state.etherToCollect/this.state.tokenRatio).toString();
      
      console.log("RoundDetail!",roundDetails);
      await API.graphql(graphqlOperation(CreateRoundDetails, { input: roundDetails }))
      console.log("Campaña creada!", createCampaignResult);
      this.setState({ campaignAddress: campaignAddress });
    } 
    catch (err) 
    {
      this.setState({ errorMessage: err.message });
      complete = false;
    }

    if(complete)
      this.setState({ loading: false, finish: true });
    else
      this.setState({ loading: false, finish: false });
  }

  render() {
    return (
      <div>
        {this.state.finish
        ? (
          <Segment>
            <h1>La Campaña ha sido creada.</h1>
            <h1>La dirección es</h1>
            <h1>{this.state.campaignAddress}</h1>
            <h1>Puedes consultar los detalles en siguiente 
              <Link to={`/roundDetails/${this.state.campaignAddress}`}>
                enlace                   
              </Link>
            </h1>
          </Segment>
          )
        : 
          ( this.state.loading
            ? (
              <Segment style={{height: "500px"}}>
                <Dimmer active inverted>
                  <Loader size='massive' inverted>Loading</Loader>
                </Dimmer>
              </Segment>
              )
            : (
              <Segment>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                  
                  <Header as='h2' icon textAlign='center'>
                    <Icon name='cny' circular />
                    <Header.Content>Creacion de la Campaña</Header.Content>
                  </Header>

                  <Form.Field>
                    <Input labelPosition='right' type='text' placeholder='Amount'>
                      <Label basic>¿Cuánto ETH se desea recaudar? </Label>
                        <input
                          name='etherToCollect'
                          onChange={this.onChange}
                          value={this.state.etherToCollect}
                          placeholder=''
                          type="number"
                          min="0"
                        />
                      <Label><Icon name='ethereum'/></Label>
                    </Input>
                  </Form.Field>

                  <Form.Field>
                    <Input labelPosition='right' type='text' placeholder='Amount'>
                      <Label basic>¿Qué nombre deseas darle al TOKEN? </Label>
                        <input
                          name='tokenName'
                          onChange={this.onChange}
                          value={this.state.tokenName}
                          placeholder=''
                          type="text"
                          maxLength="10"
                        />
                      <Label><Icon name='cny'/></Label>
                    </Input>
                  </Form.Field>

                  <Form.Field>
                    <Input labelPosition='right' type='text' placeholder='Amount'>
                      <Label basic>¿Qué acrónimo deseas darle al TOKEN? </Label>
                        <input
                          name='tokenSymbol'
                          onChange={this.onChange}
                          value={this.state.tokenSymbol}
                          placeholder=''
                          type='text'
                          maxLength="3"
                        />
                      <Label><Icon name='cny'/></Label>
                    </Input>
                  </Form.Field>

                  <Form.Field>
                    <Input labelPosition='right' type='text' placeholder='Amount'>
                      <Label basic>1 ETH equivale</Label>
                        <input
                          name='tokenRatio'
                          onChange={this.onChange}
                          value={this.state.tokenRatio}
                          placeholder=''
                          type="number"
                          min="0"
                        />
                      <Label>TOKEN</Label>
                    </Input>
                  </Form.Field>

                  <Form.Group widths='equal'>
                    <Form.Field>
                      <Label basic>Fecha de Inicio</Label>
                      <DateTimePicker
                        minDate={new Date()}
                        onChange={this.openingTimeHandler}
                        value={this.state.campaignOpeningTime}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Label basic>Fecha de Cierre</Label> 
                      <DateTimePicker
                        style={{
                          height: '10px'}
                        }
                        minDate={new Date()}
                        onChange={this.closingTimeHandler}
                        value={this.state.campaignClosingTime}
                      />
                    </Form.Field>
                  </Form.Group>


                  <Message error header="Oops!" content={this.state.errorMessage} />
                  <Button color='green'>
                    Create Campaing!
                  </Button>
                </Form> 
              </Segment>
              )
          )
        }
      </div>
    )
  }
}

export default CreateRoundPage;