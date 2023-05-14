import * as dotenv from 'dotenv';
dotenv.config();
import * as ethers from 'ethers';
import * as process from "process";


// Create an instance of Wallet using the private key
let privateKey: string = process.env['ACCOUNT_PRIVATE_KEY']  || '';
const wallet = new ethers.Wallet(privateKey);

// Get the Ethereum public address
const address = wallet.address;

console.log('Private Key:', privateKey);
console.log('Public Address:', address);
