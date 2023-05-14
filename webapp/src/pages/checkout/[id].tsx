import * as React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";

import Layout from "n/components/layout";
import JobCard from "n/components/card/jobcard";
import Card from "n/components/card/card";
import { JobHeader } from "n/components/jobheader";
import Txt from "n/components/txt";

import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import { useRouter } from "next/router";
import Button from "n/components/button";
import { CardButton } from "n/components/card-button";
import {
  erc20Abi,
  erc20Address,
  roleAbi,
  roleContractAddress,
} from "n/chain-utils/config";
import { setupContract } from "n/chain-utils";
import VerificationSection from "n/components/verification-section";
import CountdownTimer from "n/components/countdown-timer";
import { AuthContext } from "n/components/authprovider";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { Contract } from "ethers";
import SafeServiceClient from "@gnosis.pm/safe-service-client";

const CheckoutContents = () => {
  const { sdk, connected, safe } = useSafeAppsSDK();
  const router = useRouter();
  const { balance, signIn, signOut, signInResult, userInfo, signer } =
    React.useContext(AuthContext);
  // console.log(safe, connected, sdk);
  return (
    <div className="flex flex-col gap-4">
      <Card className="gap-2">
        <div>Hey</div>
        {/* <div>{safe.safeAddress}</div> */}
        <JobHeader
          logo="/logo-ams.png"
          title="Guitar Teacher"
          subtitle="City of Amsterdam"
        />
        <div className="mt-32 flex justify-center">
          <Txt size="m">Task in progress</Txt>
        </div>
        <div className="mb-32 flex justify-center">
          <CountdownTimer seconds={0} countUp />
        </div>
        <CardButton
          onClick={async () => {
            // const addr = await signer.getAddress();
            console.log("signer", signer);
            const signerAddr = await signer.getAddress();
            const ethAdapter = new EthersAdapter({
              ethers: (window as any).ethers,
              signerOrProvider: signer,
            });

            const safeSdk = await Safe.create({
              ethAdapter,
              safeAddress: "0x716e7d350ED0Ce69BC62eCef9b3b4e9BacC2d39e",
            });

            // const contract = new Contract()
            const contract = await setupContract(erc20Address, erc20Abi);

            const tx = {
              to: contract.address,
              value: "0",
              data: contract.interface.encodeFunctionData("transfer", [
                "0xE4C77B7787cC116A5E1549c5BB36DE07732100Bb",
                (window as any).ethers.BigNumber.from(
                  "100000001573841032000000"
                ),
              ]),
            };

            // Propose the transaction
            const safeTransaction = await safeSdk.createTransaction({
              safeTransactionData: tx,
            });

            const safeService = new SafeServiceClient({
              txServiceUrl: "https://safe-transaction.goerli.gnosis.io/",
              ethAdapter,
            });

            const safeTransactionHash = await safeSdk.getTransactionHash(
              safeTransaction
            );

            console.log("Safe transaction:", safeTransaction);
            console.log("Safe transaction hash:", safeTransactionHash);

            // 7. propose a transaction to the relayer
            const senderSignature = await safeSdk.signTransactionHash(
              safeTransactionHash
            );
            const safeAddr = await safeSdk.getAddress();
            console.log({
              safeAddress: safeAddr,
              safeTransactionData: safeTransaction.data,
              safeTxHash: safeTransactionHash,
              senderAddress: "0x4153322fAFce40e46d0f05F60539655eB1c90c30",
              senderSignature: senderSignature.data,
            });
            console.log(safeAddr);
            await safeService.proposeTransaction({
              safeAddress: safeAddr,
              safeTransactionData: safeTransaction.data,
              safeTxHash: safeTransactionHash,
              senderAddress: "0x4153322fAFce40e46d0f05F60539655eB1c90c30", //"0x592Aa6678Ef6D1e78CaBD129ed0A057F0865C08F",
              senderSignature: senderSignature.data,
            });

            // 8. get pending transactions from the relayer
            // const pendingTxs = await safeService.getPendingTransactions(safeSdk.getAddress())
            const txs = await safeService.getTransaction(safeTransactionHash);
            console.log("Pending transaction:", txs);

            // 9. confirm the transaction
            await safeService.confirmTransaction(
              safeTransactionHash,
              senderSignature.data
            );

            const executeTxResponse = await safeSdk.executeTransaction(
              safeTransaction
            );
            const receipt =
              executeTxResponse.transactionResponse &&
              (await executeTxResponse.transactionResponse.wait());
            console.log("receipt", receipt);

            // 10. send the transaction status

            // const roleContract = await setupContract(
            //   roleContractAddress,
            //   roleAbi
            // );
            // console.log("haii");
            // const directDepositRes = await roleContract.directDeposit(
            //   "6900000000000000000",
            //   "iuhouufxhbckj7YGQYsYj9XkuSdWvNgsfWYTvjUgLVAg48dxft4iGMnvvjQKVS",
            //   "0xf65538cc4db1a88137F3913F48b6EB0db0f6170A"
            // );

            // console.log("direct res", directDepositRes);
            // const response = await fetch("/api/checkout", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({
            //     checkoutLocation: 1,
            //     taskDuration: 1,
            //     roleAddress: roleContractAddress,
            //     roleAbi: roleAbi,
            //     userId: addr,
            //   }),
            // });

            // const data = await response.json();
            // console.log("d", data);

            // router.push(`/job-success`);
          }}
          text="End Task"
        />
      </Card>
    </div>
  );
};

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Layout>
        <CheckoutContents />
      </Layout>
    </>
  );
};

export default Home;
