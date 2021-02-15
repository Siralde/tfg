import Campaign from './build/Campaign.json';

let newCampaign = (address, web3) => {
    return new web3.eth.Contract(
        Campaign,
        address
    );
};

export default newCampaign;