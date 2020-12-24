import React, { Component } from 'react';
import web3 from '../ethereum/web3.js';
import CampaignFactory from '../ethereum/campaignFactory';
import { DateTimePicker } from 'react-widgets';
import { 
  Header, 
  Icon, 
  Input, 
  Label, 
  Button, 
  Form,
  Message, Container
} from 'semantic-ui-react';

class InvestPage extends Component {

  state = {
    etherToCollect: 0,
    tokenName: '' ,
    tokenSymbol: '',
    tokenSupply: '',
    tokenValue: 0,
    campaignOpeningTime: new Date(),
    campaignClosingTime: new Date()
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  openingTimeHandler = (event) => {
    console.log(event.target.name);
    // this.setState({ campaignOpeningTime: event });
  }

  closignTimeHandler = (event) => {
    console.log(event.target.value);
    // this.setState({ campaignClosingTime: event });
  }

  converDateToSeconds(date)
  {
    let seconds = parseInt(new Date(date).getTime()/1000);
    return seconds;
  }

  onSubmit = async event => {
    event.preventDefault();

    // const campaign = Campaign(this.props.address);
    const { etherToCollect, tokenName, tokenSymbol, tokenSupply, tokenValue, campaignOpeningTime, campaignClosingTime } = this.state;


    this.setState({ loading: true, errorMessage: '' });

    try 
    {
      const accounts = await window.ethereum.request(
        { method: 'eth_requestAccounts' }
      );
      const campaignFactory = CampaignFactory(
        '0x55Cb7280531F02E398F603BbCc9430734b4B88dA', 
        web3
      );

      await campaignFactory.methods.createCampaign(
        tokenSupply,
        tokenName,
        tokenSymbol,
        campaignOpeningTime,
        campaignClosingTime,
        web3.utils.toWei(etherToCollect, 'ether')
      );
    } 
    catch (err) 
    {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  }

  render() {
    return (
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
                />
              <Label><Icon name='cny'/></Label>
            </Input>
          </Form.Field>

          <Form.Field>
            <Input labelPosition='right' type='text' placeholder='Amount'>
              <Label basic>Indica la cantidad de TOKEN que deseas generar</Label>
                <input
                  name='tokenValue'
                  onChange={this.onChange}
                  value={this.state.tokenValue}
                  placeholder=''
                  type="number"
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
                  value={(this.state.etherToCollect/this.state.tokenValue).toString()}
                  placeholder=''
                  type="number"
                />
              <Label>TOKEN</Label>
            </Input>
          </Form.Field>

          <Form.Group widths='equal'>
            <Form.Field>
              <Label basic>Fecha de Inicio</Label>
              <input 
                value={this.state.campaignOpeningTime}
                type="datetime" 
                name="campaignOpeningTime"
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field >
              <Label basic>Fecha de Cierre</Label> 
              <input 
                value={this.state.campaignClosingTime}
                type="datetime" 
                name="campaignClosingTime"
                onChange={this.onChange}
              />
            </Form.Field>
          </Form.Group>


          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button color='green' loading={this.state.loading}>
            Create Campaing!
          </Button>
        </Form>
    )
  }
}

export default InvestPage;