import React from 'react';
import Header from './header';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import CreateCammpaignPage from '../containers/CreateCampaignPage';
import CreateRoundPage from '../containers/CreateRoundPage';
import RoundDetailsPage from '../containers/RoundDetailsPage';
import InvestPage from '../containers/InvestPage';

function layout(props){
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
                <Route path="/createCampaign">
                    <CreateCammpaignPage />
                </Route>
                <Route path="/roundDetails/:id" component={RoundDetailsPage}/>
                <Route path="/createRound" component={CreateRoundPage}/>
                <Route path="/:id/invest" component={InvestPage}/>
            </Switch>
        </Container>
    )
}

export default layout;


// import React from 'react';
// import Header from './header';
// import { Container } from 'semantic-ui-react';
// import { Switch, Route } from 'react-router-dom';
// import HomePage from '../containers/HomePage';
// import CreateCammpaignPage from '../containers/CreateCampaignPage';
// import CreateRoundPage from '../containers/CreateRoundPage';
// import RoundDetailsPage from '../containers/RoundDetailsPage';
// import InvestPage from '../containers/InvestPage';

// export default props => {
//     return (
//         <Container>
//                 <link 
//                     rel="stylesheet" 
//                     href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" 
//                 />
//             <Header/>
            
//             <Switch>
//                 <Route exact path="/">
//                     <HomePage />
//                 </Route>
//                 <Route path="/createCampaign">
//                     <CreateCammpaignPage />
//                 </Route>
//                 <Route path="/roundDetails/:id" component={RoundDetailsPage}/>
//                 <Route path="/:id/createRound" component={CreateRoundPage}/>
//                 <Route path="/:id/invest" component={InvestPage}/>
//             </Switch>
//         </Container>
//     )
// }