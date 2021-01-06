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

class InvestPage extends Component {
  
  state = {
    etherToCollect: 0,
    tokenName: '' ,
    tokenSymbol: '',
    tokenSupply: '',
    tokenValue: 0,
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

    // const campaign = Campaign(this.props.address);
    const { etherToCollect, 
            tokenName, 
            tokenSymbol, 
            tokenSupply, 
            tokenValue, 
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
        // '0x55Cb7280531F02E398F603BbCc9430734b4B88dA',
        '0x43b8cE6c399483F4203F38Ecfd49Bd59F3A04acb', 
        web3
      );

      const createCampaignResult = await campaignFactory.methods.createCampaign(
        tokenSupply,
        tokenName,
        tokenSymbol,
        this.convertDateToSeconds(campaignOpeningTime),
        this.convertDateToSeconds(campaignClosingTime),
        web3.utils.toWei(etherToCollect, 'ether')
      ).send({ from: account.toString().toLowerCase() });

      let roundDetails = this.props.location.newRound;
      let campaignAddressRaw = createCampaignResult.events[1].raw.data;
      let campaignAddress = campaignAddressRaw.replace(zeros, "0x");

      roundDetails.id = campaignAddress;
      
      console.log(roundDetails);

      await API.graphql(graphqlOperation(CreateRoundDetails, { input: roundDetails }))
      console.log("Campaña creada!");
      this.setState({ campaignAddress: campaignAddress });
    } 
    catch (err) 
    {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, finish: true });
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
              // <Button fluid basic size='massive' loading={this.state.loading}/>
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
                    <Label basic>¿Qué nombre deseas darle a tu TOKEN? </Label>
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
                    <Label basic>Indica el simbolo de  </Label>
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
                    <Label basic>Indica la cantidad de TOKEN que deseas generar</Label>
                      <input
                        name='tokenSupply'
                        onChange={this.onChange}
                        value={this.state.tokenSupply}
                        placeholder=''
                        type="number"
                        min="0"
                      />
                    <Label></Label>
                  </Input>
                </Form.Field>

                <Form.Field>
                  <Input labelPosition='right' type='text' placeholder='Amount'>
                    <Label basic>1 ETH equivale</Label>
                      <input
                        name='tokenValue'
                        onChange={this.onChange}
                        value={(this.state.etherToCollect/this.state.tokenSupply).toString()}
                        placeholder=''
                        type="number"
                        readOnly
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
                  <Form.Field >
                    <Label basic>Fecha de Cierre</Label> 
                    <DateTimePicker
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

export default InvestPage;