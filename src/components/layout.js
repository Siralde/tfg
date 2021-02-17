import React from 'react';
import Header from './header';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import CreateCampaignPage from '../containers/CreateCampaignPage';
import CreateRoundPage from '../containers/CreateRoundPage';
import RoundDetailsPage from '../containers/RoundDetailsPage';
import InvestPage from '../containers/InvestPage';

function layout() {
    return (
        <Container>

            <Header/>
            
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/createCampaign" component={CreateCampaignPage}/>
                <Route path="/roundDetails/:id" component={RoundDetailsPage}/>
                <Route path="/createRound" component={CreateRoundPage}/>
                <Route path="/:id/invest" component={InvestPage}/>
            </Switch>
        </Container>
    )
}

export default layout;