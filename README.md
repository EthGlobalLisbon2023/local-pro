# Local Pro
Hosted at: https://local-pro.vercel.app/

In a production environment secrets would not be comited to the repository. 
But for the simplicity of the demo it will be done here. All "secrets" of this demo can be actually shared publically.


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
