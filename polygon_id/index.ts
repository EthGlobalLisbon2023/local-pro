//require('dotenv').config()
//import * as dotenv from 'dotenv';
//dotenv.config();
import {
    CredentialStorage, defaultEthConnectionConfig, EthStateStorage,
    Identity,
    IdentityStorage,
    InMemoryDataSource,
    InMemoryMerkleTreeStorage,
    Profile, W3CCredential
} from "@0xpolygonid/js-sdk";



const dataStorage = {
    credential: new CredentialStorage(new InMemoryDataSource<W3CCredential>()),
    identity: new IdentityStorage(
        new InMemoryDataSource<Identity>(),
        new InMemoryDataSource<Profile>()
    ),
    mt: new InMemoryMerkleTreeStorage(40),
    states: new EthStateStorage(defaultEthConnectionConfig),
};

