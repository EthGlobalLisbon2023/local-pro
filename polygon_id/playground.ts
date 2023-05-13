import * as dotenv from 'dotenv';
dotenv.config();
import * as ethers from 'ethers';


//let mnemonicWallet = ethers.Wallet.fromMnemonic(process.env['ETH_MNEMONIC']);
//console.log(mnemonicWallet.privateKey);
console.log(process.env['ETH_MNEMONIC']);
