import Web3 from 'web3';

let web3 = false;

if (window.ethereum) 
{
  web3 = new Web3(window.ethereum);
}

export default web3;