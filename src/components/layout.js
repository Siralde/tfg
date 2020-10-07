import React from 'react';
import Header from './header';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import CreateRoundPage from '../containers/CreateRoundPage';
import RoundDetailsPage from '../containers/RoundDetailsPage';
import InvestPage from '../containers/InvestPage';

export default props => {
    return (
        <Container>
                <link 
                    rel="stylesheet" 
                    href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" 
                />
            <Header/>
            
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/createRound">
                    <CreateRoundPage />
                </Route>
                <Route path="/roundDetails/:id" component={RoundDetailsPage}/>
                <Route path="/:id/invest" component={InvestPage}/>
            </Switch>
        </Container>
    )
}