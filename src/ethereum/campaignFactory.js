import CampaignFactory from './build/CampaignFactory.json';

let newCampaignFactory = (address, web3) => {
    return new web3.eth.Contract(
        CampaignFactory,
        address
    );
};

export default newCampaignFactory;