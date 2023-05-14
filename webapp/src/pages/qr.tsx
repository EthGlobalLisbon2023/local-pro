import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import Layout from "n/components/layout";
import Txt from "n/components/txt";
import Card from "n/components/card/card";
import Button from "n/components/button";
import { useRouter } from "next/router";

const VERIFIER_BASE_URL = "http://localhost:8080";
let gettingQR = false;
export default function Verify() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (gettingQR === false) {
        gettingQR = true;
        try {
          const response = await fetch(VERIFIER_BASE_URL + "/api/sign-in", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            console.error("Error:", response.statusText);
            return;
          }
          const data = await response.json();
          console.log("gotten dat", data);
          setData(data);
        } catch (err: any) {
          console.error(err);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <Card>
        <div className="flex flex-col justify-center gap-6">
          <Txt size="m" bold className="text-center">
            Scan this code with poligon ID to be verified
          </Txt>
          <div className="flex justify-center">
            <QRCode value={JSON.stringify(data)} size={320} />
          </div>
        </div>
        <Button
          className="mx-6 text-center"
          onClick={() => {
            router.push("/verify");
          }}
        >
          Return to Validation
        </Button>
      </Card>
    </Layout>
  );
}
