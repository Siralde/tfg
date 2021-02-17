import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Header from './header';
import HomePage from '../containers/HomePage';
import CreateCampaignPage from '../containers/CreateCampaignPage';
import CreateRoundPage from '../containers/CreateRoundPage';
import RoundDetailsPage from '../containers/RoundDetailsPage';
import InvestPage from '../containers/InvestPage';
import Footer from './footer';

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

            <Footer/>
        </Container>
    )
}

export default layout;