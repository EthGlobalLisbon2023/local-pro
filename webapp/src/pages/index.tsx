import * as React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Layout from "n/components/layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"
          type="application/javascript"
        ></script>
      </Head>

      <Layout>Hello</Layout>
    </>
  );
};

export default Home;
