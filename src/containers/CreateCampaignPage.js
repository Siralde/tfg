import React, { Component } from 'react';
import { questions } from '../constants/questions';
import { Grid, Form, Button, Icon, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class CreateRoundPage extends Component {

  state = {
    question : questions[0],
    questionNumber: 0,
    finishQuestion: false,
    answer: '',
    answers: [],
    team: [],
    linkedins: []
  };

  /**
   * @func nextQuestion
   * 
   * Handles when the user decides to answer next question
   *  If the user has answered the question before it show what he has answered and sets the state
   *  If the user has not answered before it is shown empty and sets the state
   *  If the user has finish the question and it is time to enter the linkedin of the member
   *    the methods for linkdins cases takes control of the form
   *  
   */
  nextQuestion = () => 
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

  previousQuestion = () => 
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

  createRound = () => {
    const {answers, team, linkedins} = this.state; 

    const companyDetails = {
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
  
    this.props.history.push
    ({
        pathname: '/createRound', 
        companyDetails: companyDetails
    })
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

  renderSwitch = (questNumber) => {
    switch(questNumber) {
      case 3:
      case 4:
        return (
          <Form.TextArea 
            value={this.state.answer}
            onChange={(e) => {this.setState({answer: e.target.value})}}
          />
        );
      case 6:
        return (
          <Form.Input 
            value={this.state.answer}
            onChange={(e) => {this.setState({answer: e.target.value})}}
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
        return (
          <Form.Input 
            value={this.state.answer}
            onChange={(e) => {this.setState({answer: e.target.value})}}
            fluid  
          />
        );
    }
  }

  render() {
    return (
      <Segment>
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
              <h2>{this.state.questionNumber}/{questions.length - 1}</h2>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column textAlign="center">
              <Form>
                {this.renderSwitch(this.state.questionNumber)}
              </Form>
            </Grid.Column>
          </Grid.Row>

          {/* BACK BUTTON */}
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
            
            {/* FORWARD BUTTON */}
              {
                this.state.questionNumber === (questions.length - 1)
                ?<Button 
                    color='blue'
                    onClick={this.createRound}
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
        </Grid>
      </Segment>
    )
  }
}
  
export default withRouter(CreateRoundPage);