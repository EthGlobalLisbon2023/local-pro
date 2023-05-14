//@ts-nocheck
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'; // const express = require('express');

import { auth, resolver, loaders } from '@iden3/js-iden3-auth';
import getRawBody from 'raw-body';
import * as process from "process";
//const {auth, resolver, loaders} = require('@iden3/js-iden3-auth')
//const getRawBody = require('raw-body')


const app = express();
const port = 8080;

app.use(express.static('static'));

app.get("/api/sign-in", (req:any, res) => {
    console.log('get Auth Request');
    GetAuthRequest(req,res);
});

app.post("/api/callback", (req:any, res) => {
    console.log('callback');
    Callback(req,res);
});

app.listen(port, () => {
    console.log('server running on port 8080');
});

// Create a map to store the auth requests and their session IDs
const requestMap = new Map();

// GetQR returns auth request
async function GetAuthRequest(req:any,res) {

    console.log("NGROK_VERIFIER", process.env['NGROK_VERIFIER'])
    // Audience is verifier id
    const hostUrl = process.env['NGROK_VERIFIER'];
    const sessionId = 1;
    const callbackURL = "/api/callback"
    const audience = "did:polygonid:polygon:mumbai:2qDyy1kEo2AYcP3RT4XGea7BtxsY285szg6yP9SPrs"

    const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

    // Generate request for basic authentication
    const request = auth.createAuthorizationRequest(
        'test flow',
        audience,
        uri,
    );

    request.id = '7f38a193-0918-4a48-9fac-36adfdb8b542';
    request.thid = '7f38a193-0918-4a48-9fac-36adfdb8b542';

    // Add request for a specific proof
    const proofRequest = {
        id: 1,
        circuitId: 'credentialAtomicQuerySigV2',
        query: {
            allowedIssuers: ['*'],
            type: 'Over18',
            context: 'https://raw.githubusercontent.com/EthGlobalLisbon2023/local-pro/polygon_id/polygon_id/issuer-schemas/Over18-2.json-ld',
            credentialSubject: {
                isOver18: {
                    $eq: true,
                },
            },
        },
    };
    const scope = request.body.scope ?? [];
    request.body.scope = [...scope, proofRequest];

    // Store auth request in map associated with session ID
    requestMap.set(`${sessionId}`, request);

    return res.status(200).set('Content-Type', 'application/json').send(request);
}

// Callback verifies the proof after sign-in callbacks
async function Callback(req:any,res) {

    // Get session ID from request
    const sessionId = req.query.sessionId;

    // get JWZ token params from the post request
    const raw = await getRawBody(req);
    const tokenStr = raw.toString().trim();

    const ethURL = process.env['RPC_URL'];
    const contractAddress = "0x134B1BE34911E39A8397ec6289782989729807a4"
    const keyDIR = "./keys"

    const ethStateResolver = new resolver.EthStateResolver(
        ethURL,
        contractAddress,
    );

    const resolvers = {
        ['polygon:mumbai']: ethStateResolver,
    };


    // fetch authRequest from sessionID
    const authRequest = requestMap.get(`${sessionId}`);

    // Locate the directory that contains circuit's verification keys
    const verificationKeyloader = new loaders.FSKeyLoader(keyDIR);
    const sLoader = new loaders.UniversalSchemaLoader('ipfs.io');

    // EXECUTE VERIFICATION
    const verifier = new auth.Verifier(
        verificationKeyloader,
        sLoader,
        resolvers,
    );

    console.log("tokenStr",tokenStr)
    console.log("authRequest", authRequest)

    let authResponse;

    try {
        const opts = {
            AcceptedStateTransitionDelay: 5 * 60 * 1000, // 5 minute
        };
        authResponse = await verifier.fullVerify(tokenStr, authRequest, opts);
    } catch (error) {
        console.log("error", error)
        return res.status(500).send(error);
    }
    console.log("authResponse", authResponse)
    return res.status(200).set('Content-Type', 'application/json').send("user with ID: " + authResponse.from + " Succesfully authenticated");
}
