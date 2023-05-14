# Local Pro
Hosted at: https://local-pro.vercel.app/

Platform to bridfe off-chain freelancing work and on-chain coordination. Workers can apply for tasks published by organisations, received credentials based on their performance and re-use these credentials to apply to future jobs.

## Tools Used
- SAFE Account Abstraction: we generate an EOA and a SAFE for each user and organisation, abstracting away having to manually sign transactions and embedding the logic of the tasks involved in job in the smart account. 
- zkBOB: private payments from SAFE module to user's zk receiving wallets;
- Polygon ID: organisations issue credentials based on tasks completed or specific milestones achieved (number of 5-star ratings). These credentials are issued to users' PolygonID wallet. Other organisations can ask for proofs of these certifications having been issued by other organisations in the past in the form of a zk Proof Request, and users can generated zk Proofs to be verified.


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
