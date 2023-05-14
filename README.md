# Local Pro
Hosted at: https://local-pro.vercel.app/

Our platform serves as a bridge between off-chain freelancing work and on-chain coordination, revolutionizing the way workers and organizations collaborate. Workers can easily apply for tasks published by organizations and receive credentials based on their performance. These credentials can then be reused to apply for future jobs, streamlining the job application process.

## Tools Used
- SAFE: To enhance user experience and simplify the payment and verification processes, we leverage advanced tools and technologies. The Protocol kit and Auth kits are utilized to automate payments and issue PolygonID Verifiable Credentials (VCs), ensuring a seamless and secure transaction environment for all parties involved.

- zkBOB: To prioritize privacy, we implement zkBOB, which generates a ZK address for each end user. This allows us to create a direct deposit system, where funds are automatically sent from an organization's Safe Account Abstraction wallet to the user, without compromising their privacy. This innovative approach ensures that sensitive financial information remains confidential throughout the entire process.

- PolygonID: Additionally, we harness the power of PolygonID's Verifiable Credentials, employing all aspects of its functionality in conjunction with account abstraction. By creating custom issuer and verifier nodes, as well as developing credential schemas, we establish a robust and reliable system for verifying and validating credentials. This integration of PolygonID enhances the credibility and trustworthiness of the platform, fostering a secure environment for workers and organizations to collaborate effectively.



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
