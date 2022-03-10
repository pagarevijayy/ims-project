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
  }, []);

  useEffect(() => {
    if (pmTxnData.length && pqTxnData.length) {
      const pmSummationListMap = getSummedUpList(
        pmTxnData,
        "material_id",
        "stock_qty"
      );
      const pqSummationListMap = getSummedUpList(
        pqTxnData,
        "material_id",
        "processed_qty"
      );

      let pqViewData = [];

      pmSummationListMap.forEach((value, key, i) => {
        let pqTempObject = {
          key: value?.material_id,
          material_id: value?.material_id,
          material_name: value?.material_name,
          material_description: value?.material_description,
          quantity: value?.quantity,
        };

        if (pqSummationListMap.has(key)) {
          pqTempObject["quantity"] =
            pqTempObject["quantity"] - pqSummationListMap.get(key)["quantity"];
        }

        pqViewData.push(pqTempObject);
      });

      console.log("pqViewData", pqViewData);

      setPQData(pqViewData);
    }
  }, [pmTxnData, pqTxnData]);

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

    setPQTxnData(pqTempData);
  };

  const getSummedUpList = (listArray, uniqueParameter, summationParameter) => {
    let qtySummedList = new Map();

    listArray.forEach((element) => {
      const isDuplicateElement = qtySummedList.has(element[uniqueParameter]);

      if (isDuplicateElement) {
        let updateElement = qtySummedList.get(element[uniqueParameter]);
        updateElement["quantity"] =
          updateElement["quantity"] + element[summationParameter]; // cummulative sum
      } else {
        let listElement = {
          quantity: element[summationParameter],
          ...element,
        };
        qtySummedList.set(element[uniqueParameter], listElement);
      }
    });

    return qtySummedList;
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
