import * as dotenv from 'dotenv';
dotenv.config();
import {
    BjjProvider, byteEncoder, CredentialRequest, CredentialStatusType,
    CredentialStorage, CredentialWallet, defaultEthConnectionConfig, EthStateStorage,
    Identity,
    IdentityStorage, IdentityWallet,
    InMemoryDataSource,
    InMemoryMerkleTreeStorage, InMemoryPrivateKeyStore, KMS, KmsKeyType,
    Profile, W3CCredential
} from "@0xpolygonid/js-sdk";
import {Blockchain, DidMethod, NetworkId} from "@iden3/js-iden3-core";


const dataStorage = {
    credential: new CredentialStorage(new InMemoryDataSource<W3CCredential>()),
    identity: new IdentityStorage(
        new InMemoryDataSource<Identity>(),
        new InMemoryDataSource<Profile>()
    ),
    mt: new InMemoryMerkleTreeStorage(40),
    states: new EthStateStorage(defaultEthConnectionConfig),
};

const memoryKeyStore = new InMemoryPrivateKeyStore();
const bjjProvider = new BjjProvider(KmsKeyType.BabyJubJub, memoryKeyStore);
const kms = new KMS();
kms.registerKeyProvider(KmsKeyType.BabyJubJub, bjjProvider);

const credWallet = new CredentialWallet(dataStorage);
const wallet = new IdentityWallet(kms, dataStorage, credWallet);

export interface IdentityCreationOptions {
    method?: DidMethod;
    blockchain?: Blockchain;
    networkId?: NetworkId;
    revocationOpts: {
        baseUrl: string;
        type: CredentialStatusType;
        nonce?: number;
    };
    seed?: Uint8Array;
}

const seedPhrase: Uint8Array = byteEncoder.encode(process.env['ETH_MNEMONIC']);

const { did, credential } = await wallet.createIdentity({
    method: DidMethod.Iden3,
    blockchain: Blockchain.Polygon,
    networkId: NetworkId.Mumbai,
    seed: seedPhrase,
    revocationOpts: {
        type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
        baseUrl: 'http://rhs.com/node'
    }
});

const seedPhraseUser: Uint8Array = byteEncoder.encode(process.env['ETH_MNEMONIC']);
const { did: userDID, credential: authBJJCredentialUser } = await wallet.createIdentity({
    method: DidMethod.Iden3,
    blockchain: Blockchain.Polygon,
    networkId: NetworkId.Mumbai,
    seed: seedPhraseUser,
    revocationOpts: {
        type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
        baseUrl: 'http://rhs.com/node'
    }
});

const seedPhraseIssuer: Uint8Array = byteEncoder.encode(process.env['ETH_MNEMONIC']);
const { did: issuerDID, credential: issuerAuthCredential } = await wallet.createIdentity({
    method: DidMethod.Iden3,
    blockchain: Blockchain.Polygon,
    networkId: NetworkId.Mumbai,
    seed: seedPhraseIssuer,
    revocationOpts: {
        type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
        baseUrl: 'http://rhs.com/node'
    }
});

const claimReq: CredentialRequest = {
    credentialSchema:
        'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v2.json',
    type: 'KYCAgeCredential',
    credentialSubject: {
        id: userDID.toString(),
        birthday: 19960424,
        documentType: 99
    },
    expiration: 12345678888,
    revocationOpts: {
        type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
        baseUrl: 'http://rhs.com/node'
    }
};
const issuerCred = await wallet.issueCredential(issuerDID, claimReq);









console.log('dataStorage', dataStorage)
