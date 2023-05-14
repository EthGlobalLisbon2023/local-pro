# Local Pro
Hosted at: https://local-pro.vercel.app/

Platform to bridfe off-chain freelancing work and on-chain coordination. Workers can apply for tasks published by organisations, received credentials based on their performance and re-use these credentials to apply to future jobs.

## Tools Used
- SAFE: We are using both the Protocol kit and Auth kits in a novel real-world use case to automate payments and issue PolygonID VCs in order to abstract all complexity from end users
https://github.com/EthGlobalLisbon2023/local-pro/blob/c61ccf352c515e23c1605126d631eaf91a7873ad/webapp/src/components/authprovider.tsx#L81

- zkBOB: We created a ZK address for an end user and then generated Direct Deposit code to automatically send funds from an organisation Safe Account Abstraction wallet to the user in a novel real-world use case where privacy is critical.

- PolygonID: We are using all aspects of Polygon ID's Verifiable Credentials in a novel real-world use case in combination with account abstraction. We have created both custom issuer and verifier nodes and credential schemas.
https://github.com/EthGlobalLisbon2023/local-pro/tree/main/polygon_id


## Front-End: Launch Nextjs App
The front-end is all found under the ```webapp``` folder.
You simply need to run ```npm install``` in thet folder and then to run it locally its ```npm run start```.
```
npm install
npm run start
```


## Verifier
The verifier is a simple nodejs app. It is found under the ```polygon_id``` folder.
In order to run it change directory into the folder and run the following commands:
```
npm install
```
In order to run the verifier locally you would need to proxy the local port to a publically accessible url.
You can do it with ngrok. 
```
ngrok http 3002;
```
Then you would need to change the verifier url in the `env file. 
```
NGROK_VERIFIER=https://b517-5-249-105-126.eu.ngrok.io
```
After that run the verifier
```
npm run verifier
```


# Issuer
The issuer is run through docker. Please follow the polygon documentation for it to work: `git@github.com:0xPolygonID/issuer-node.git`
The schema definitions for the credentials could be found in the polygon_id/issuer-schemas folder.
