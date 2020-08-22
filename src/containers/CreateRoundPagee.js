import React, { Component } from 'react';
import {questions} from '../components/questions';
import { Grid, Form, Button, Icon, Message } from 'semantic-ui-react';
import { API, graphqlOperation } from 'aws-amplify'
import { createRoundDetails as CreateRoundDetails } from '../graphql/mutations'


class CreateRoundPage extends Component {

  constructor(props){
    super(props);

    this.state = {
        companyName: '',
        email: '',
        url: '',
        direction: '',
        companyDescription: '',
        youtube: '',
        membersNumber: 1,
        membersNames: [],
        membersLinkedin: [],
        bussinesModel: '',
        roundPurpose: ''
    };

  }  

  nextQuestion()
  {
      let nextQuestion = this.state.questionNumber;
      nextQuestion++;
      let currentAnswer = this.state.answer;
      let currentQuestion = this.state.questionNumber;
      let newAnswers = this.state.answers;
      newAnswers[currentQuestion] = currentAnswer;
      
      //If we haven't respond to the question yet, the textarea is shown empty
      if(newAnswers[nextQuestion] === undefined || newAnswers[nextQuestion] === '')
      {
        this.setState({ 
          question: questions[nextQuestion],
          questionNumber: nextQuestion, 
          finishQuestion: false,
          answers: newAnswers,
          answer: ''
        });        
      }
      else // is shown whatever is was written before
      {
        this.setState({ 
          question: questions[nextQuestion],
          questionNumber: nextQuestion, 
          finishQuestion: false,
          answers: newAnswers,
          answer: newAnswers[nextQuestion]
        });
      }
      if(nextQuestion === 7)
      {
        this.initializeTeamsAndLinkedis(this.state.answers[6])
      }
  }

  previousQuestion()
  {
    let preQuestion = this.state.questionNumber;
    preQuestion--;
    let previousAnswer = this.state.answers[preQuestion];
    if(preQuestion > -1)
    {
      this.setState({ 
        questionNumber: preQuestion, 
        question: questions[preQuestion],
        answer: previousAnswer,
        finishQuestion: false
      });
    }

    if(preQuestion === 7)
    {
      this.checkIfLinkedinsAreReady(this.state.team);
    }
    else if(preQuestion === 8)
    {
      this.checkIfLinkedinsAreReady(this.state.linkedins);
    }

  }

  uploadNewCompany = async() => {
    const {answers, team, linkedins} = this.state; 

    const newRound = {
      companyName: answers[0],
      email: answers[1],
      url: answers[2],
      direction: answers[3],
      companyDescription: answers[4],
      youtube: answers[5],
      membersNumber: parseInt(answers[6]),
      membersNames: team,
      membersLinkedin: linkedins,
      bussinesModel: 'Alde',
      roundPurpose: 'Round'
    }

    try 
    {
      await API.graphql(graphqlOperation(CreateRoundDetails, { input: newRound }))
      console.log('item created!')
    } catch (err) {
      console.log('error creating talk...', err)
    }
  }

  changeAnswer = (formData) => {
    this.setState({answer: formData.target.value})
  }

  fileChange = (event) => {
    let newAnswers = this.state.answers;
    newAnswers[this.state.questionNumber] = event.target.files[0];
    this.setState({ answers: newAnswers, answer: event.target.files[0]});
  }

  initializeTeamsAndLinkedis = (teamNumber) => {
    let newTeam = [];
    for(let i = 0; i < teamNumber; i++)
    {
      newTeam.push('');
    }
    this.setState({team: newTeam, linkedins: newTeam});
  }

  handleName(index, event) {
    let newTeam = this.state.team.slice();
    newTeam[index] = event.target.value;
    this.setState({ team: newTeam });
    this.checkIfLinkedinsAreReady(newTeam);
  }

  handleLinkedin = (index, event) => {
    let newLinkedin = this.state.linkedins.slice();
    newLinkedin[index] = event.target.value;
    this.setState({ linkedins: newLinkedin });
    this.checkIfLinkedinsAreReady(newLinkedin);
  }

  checkIfLinkedinsAreReady(ar) 
  {
    let linkedinFull = true;
    
    ar.forEach(element => {
      
      if(element === '' || element === undefined)
      {
        linkedinFull = false;
      }
      else
      {
        linkedinFull = true;
      }
    });

    if(linkedinFull)
    {
      this.setState({ answer: 'Teams is Full' });
    }
    else{
      this.setState({ answer: '' });
    }
  }
  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  renderSwitch = (param) => {
    switch(param) {
        case 1:
            return (
                <Form.Input 
                    name={this.state.companyName}
                    value={this.state.companyName}
                    onChange={this.handleChange}
                    fluid  
                />
            )
        case 2:
            return (
                <Form.Input 
                    name={this.state.email}
                    value={this.state.email}
                    onChange={this.handleChange}
                    fluid  
                />
            )
        case 3:
            return (
                <Form.Input 
                    name={this.state.url}
                    value={this.state.url}
                    onChange={this.handleChange}
                    fluid  
                />
            )
        case 4:
            return (
                <Form.Input 
                    name={this.state.direction}
                    value={this.state.direction}
                    onChange={this.handleChange}
                    fluid  
                />
            )
        case 5:
            return (
                <Form.TextArea 
                    name={this.state.companyDescription}
                    value={this.state.companyDescription}
                    onChange={this.handleChange}
                />
            )
        
        case 6:
            return (
                <Form.Input 
                    name={this.state.youtube}
                    value={this.state.youtube}
                    onChange={this.handleChange}
                    fluid  
                />
            )
        case 7:
            return (
                <Form.Input 
                    value={this.state.membersNumber}
                    onChange={this.handleChange}
                    fluid  
                    type='number'
                />
            );
      case 7:
        let items = [];
        items = this.state.team.map((teamMember, index) => {
          let lbl = 'Integrante ' + (index + 1);
          return (
            <Form.Input
              key={index} 
              value={this.state.team[index]}
              onChange={this.handleName.bind(this, index)}
              label={lbl} 
            />
          )}
        );
        return items;
      case 8:
        let links = [];
        links = this.state.team.map((teamMember, index) => {
          let lbl = 'Integrante' + (index + 1);
          let lbl2 = 'Introduce el URL del Linkedin';
          return (
            <Form.Group key={'group' + index} widths='2'>
              <Form.Input
                key={'integrantes' + index} 
                value={this.state.team[index]}
                label={lbl} 
                disabled
              />
              <Form.Input
                key={'linkedins' + index} 
                value={this.state.linkedins[index]}
                onChange={this.handleLinkedin.bind(this, index)}
                label={lbl2}
              />
            </Form.Group>
          )}
        );
        return links;
      case 9:
      case 10:
        return (
          <Form.Field>
            <Button 
              as="label" 
              htmlFor="file" 
              type="button"
            >
              <Icon name='pdf file outline' />
            </Button>
            <input 
              type="file" 
              id="file" 
              hidden 
              onChange={this.fileChange} 
            />
          </Form.Field>
        );                
      default:
        return;
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>Crea tu ronda de Financiacion</h1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns='12'>
          <Grid.Column textAlign="center" width='11'>
            <h2>{this.state.question}</h2>
          </Grid.Column>
          <Grid.Column textAlign="center" width='1'>
            <h2>{this.state.questionNumber}/{questions.length}</h2>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column textAlign="center">
            <Form>
              {this.renderSwitch(this.state.questionNumber)}
            </Form>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button 
              color='red'
              onClick={this.previousQuestion}
              icon 
              labelPosition='left'
            >
              <Icon 
                name='left arrow' 
              />
              Atras
            </Button>
          
            {
              this.state.questionNumber === (questions.length - 1)
              ?<Button 
                  color='blue'
                  onClick={this.uploadNewCompany}
                  icon 
                  labelPosition='right'
                  basic 
                  
                >
                  Terminar
                  <Icon name='checkmark' />
                </Button>
              :(this.state.answer === '' ?
                  <Button 
                    color='green'
                    onClick={this.nextQuestion}
                    icon 
                    labelPosition='right'
                    disabled
                  >
                    Siguiente
                    <Icon name='right arrow' />
                  </Button>
                :
                  <Button 
                    color='green'
                    onClick={this.nextQuestion}
                    icon 
                    labelPosition='right'
                  >
                    Siguiente
                    <Icon name='right arrow' />
                  </Button>
                )
              }
          </Grid.Column>
        </Grid.Row>

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
    )
  }
}
  
export default CreateRoundPage;