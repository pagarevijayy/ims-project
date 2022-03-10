import React from "react";
import { useState, useEffect } from "react";
import { AUTH_TOKEN, LOCAL_API_ENDPOINTS } from "../../constants/api-endpoints";
import { Table } from "antd";

const PQView = () => {
  const [pmTxnData, setPMTxnData] = useState([]);
  const [pqTxnData, setPQTxnData] = useState([]);
  const [pqData, setPQData] = useState([]);

  useEffect(() => {
    fetchPMTxnDataFromBackend();
    fetchPQTxnDataFromBackend();
    preparePQViewData();
  }, []);

  const fetchPMTxnDataFromBackend = async () => {
    const sortByDateDescAllEntries =
      "?sort[0]=createdAt%3Adesc&pagination[limit]=-1";
    const response = await fetch(
      `${LOCAL_API_ENDPOINTS.product_master_txn}${sortByDateDescAllEntries}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    );

    const responseBody = await response.json();

    const pmTempData = responseBody?.data?.map((item) => {
      const tempItem = {
        key: item?.id,
        id: item?.id,
        ...item?.attributes,
        createdAt: new Date(item?.attributes?.createdAt).toLocaleDateString(),
      };
      return tempItem;
    });

    console.log("PM data:", pmTempData);

    setPMTxnData(pmTempData);
  };

  const fetchPQTxnDataFromBackend = async () => {
    const sortByDateDescAllEntries =
      "?sort[0]=createdAt%3Adesc&pagination[limit]=-1";
    const response = await fetch(
      `${LOCAL_API_ENDPOINTS.pq_txn}${sortByDateDescAllEntries}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    );

    const responseBody = await response.json();

    const pqTempData = responseBody?.data?.map((item) => {
      const tempItem = {
        key: item?.id,
        id: item?.id,
        ...item?.attributes,
        createdAt: new Date(item?.attributes?.createdAt).toLocaleDateString(),
      };
      return tempItem;
    });

    console.log("PQ View - PQ txn data:", pqTempData);

    setPQTxnData(pqTempData);
  };

  const preparePQViewData = () => {
    console.log("preparing PQ view data...");
  };

  return <div>PQView</div>;
};

export default PQView;

/* 

logic:
quantity on hand = inventory received (txns sum) - total of wip (txns sum)

steps:
1. Hit PM txn api and Prepare a list of sum (PM txn) based on product_id
2. Hit PQ txn api and Prepare a list of sum (PQ txn) based on product_id
3. Prepare final view list (PM - PQ)

*/
