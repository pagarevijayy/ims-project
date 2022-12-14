import "antd/dist/antd.css";
import Head from "next/head";
import ProductMaster from "../components/raw-materials/product-master-view";
import PQView from "../components/raw-materials/pq-view";
import WIPView from "../components/raw-materials/wip-view";
import FinishedView from "../components/raw-materials/finished-view";
import PQTnxView from "../components/raw-materials/pq-txn-view";

export default function Home() {
  return (
    <>
      <Head>
        <title>IMS frontend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen d-flex items-center justify-center text-center p-16">
        <h1 className="text-3xl font-bold">IMS Frontend</h1>
        <PQTnxView />
      </div>
    </>
  );
}
