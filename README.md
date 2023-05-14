# Local Pro
Hosted at: https://local-pro.vercel.app/

The LocalPro infrastructure revolutionizes global organizations' collaboration with local independent workers by introducing on-chain verification and incentivization to local offline work.

## Context
In today's interconnected world, there is a growing demand for hyper-local contract work, such as setting up local IoT infrastructure or fulfilling municipal tasks. However, managing local workforces poses challenges for organizations, especially when it comes to verifying workers who use specialized equipment or interact with minors. According to Glassdoor, verification checks alone can cost up to $500. Moreover, ensuring quality control of offline tasks that lack data points is a difficult task. On the other hand, local gig workers face significant challenges, with 71% experiencing high-income volatility and 61% lacking a clear path for growth, as reported by the Freelancers Union.

LocalPro bridges the gap between global organizations and independent local workforces by leveraging trustless verification of identity and performance. Our transparent cross-organizational credential system paves the way for clear growth paths, coordination efficiencies, and ultimately, more stable work opportunities for local workers. To address the complexities of on-chain coordination, we have prioritized an improved user experience through Account Abstraction. Furthermore, we ensure data privacy and compliance using ZK-privacy with PolygonID, unlocking the mass market for offline work like never before.

As part of our participation in ETH Global, we are showcasing a functional prototype that demonstrates the user flow from onboarding to settlement. The prototype focuses on "proof of performance" as a hyper-local verification of a worker's capabilities. It includes automated settlement payouts and reputation credentialing, which open up new opportunities on our LocalPro marketplace.

Our use case is informed by one of our team members' previous work with a European city that aims to digitize and decentralize the coordination and contracting of after-school activities. The current manual process lacks transparency and poses the challenges mentioned above, which we aim to address through this project.

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
