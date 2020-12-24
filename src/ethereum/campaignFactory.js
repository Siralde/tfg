import Campaign from './build/CampaignFactory.json';

export default (address, web3) => {
    return new web3.eth.Contract(
        Campaign,
        address
    );
};