import React, { Component } from 'react';
import { Grid, Message, Segment, Button, Form, Input, Label, Icon} from 'semantic-ui-react';
import web3 from '../ethereum/web3.js';

class InvestPage extends Component {

  state = {
    etherToSend: '',
    tokenValue: this.props.location.roundDetails.tokenValue
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = async () => {

    const account = await window.ethereum.request(
      { method: 'eth_requestAccounts' }
    );
  
    let wei =  web3.utils.toWei(this.state.etherToSend, 'ether');

    const transactionParameters = {
      to: this.props.match.params.id, 
      from: account[0], 
      value: web3.utils.toHex(wei)
    };

    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    
  }

  render() {
    return (
      <div>
        <Segment>
          <Form onSubmit={this.onSubmit}>
            <Grid>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <h1>{this.props.location.roundDetails.companyName}</h1>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <h2>Wallet Address: {this.props.match.params.id} </h2>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Form.Field>
                    <Input labelPosition='right' type='text' placeholder=''>
                      <Label basic>¿Cuánto ETH se desea aportar? </Label>
                        <input
                          name='etherToSend'
                          onChange={this.onChange}
                          value={this.state.etherToSend}
                          placeholder=''
                          type="number"
                          min="0"
                        />
                      <Label><Icon name='ethereum'/></Label>
                    </Input>
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Input labelPosition='right' type='text' placeholder='Amount'>
                    <Label basic>Token a recibir </Label>
                      <input
                        name='tokenName'                       
                        value={this.state.etherToSend / this.state.tokenValue}
                        type="text"
                        readOnly
                      />
                    <Label><Icon name='cny'/></Label>
                  </Input>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Button color='green'>
                    Invertir
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Message>
                <Message.Header>
                  Politica y Privacidad
                </Message.Header>
                <p>
                  Todos los datos serán tratados de forma anónima
                </p>
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
  
export default InvestPage;