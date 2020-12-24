import Web3 from 'web3';

let web3 = false;

if (window.ethereum) 
{
  web3 = new Web3(window.ethereum);
}

export default web3;

// import Web3 from 'web3';

// const ethEnabled = () => {
//     if (window.ethereum) 
//     {
//       window.web3 = new Web3(window.ethereum);
//       window.ethereum.enable();
//       return true;
//     }
//     return false;
// }

// export default ethEnabled;