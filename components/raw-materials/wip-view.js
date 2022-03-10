import React from "react";
import { useState, useEffect } from "react";
import { AUTH_TOKEN, LOCAL_API_ENDPOINTS } from "../../constants/api-endpoints";
import { Table } from "antd";

const WIPView = () => {
  const [pqTxnData, setPQTxnData] = useState([]);
  const [wipTxnData, setWIPTxnData] = useState([]);
  const [wipData, setWIPData] = useState([]);

  useEffect(() => {
    fetchPQTxnDataFromBackend();
    fetchWIPTxnDataFromBackend();
  }, []);

  useEffect(() => {
    if (wipTxnData.length && pqTxnData.length) {
      const pqSummationListMap = getSummedUpList(
        pqTxnData,
        "material_id",
        "processed_qty"
      );

      const wipSummationListMap = getSummedUpList(
        wipTxnData,
        "material_id",
        "finished_qty"
      );

      let wipViewData = [];

      pqSummationListMap.forEach((value, key) => {
        let wipTempObject = {
          key: value?.material_id,
          material_id: value?.material_id,
          material_name: value?.material_name,
          quantity: value?.quantity,
        };

        if (wipSummationListMap.has(key)) {
          wipTempObject["quantity"] =
            wipTempObject["quantity"] -
            wipSummationListMap.get(key)["quantity"];
        }

        wipViewData.push(wipTempObject);
      });

      console.log("wipViewData", wipViewData);

      setWIPData(wipViewData);
    }
  }, [wipTxnData, pqTxnData]);

  const fetchWIPTxnDataFromBackend = async () => {
    const sortByDateDescAllEntries =
      "?sort[0]=createdAt%3Adesc&pagination[limit]=-1";
    const response = await fetch(
      `${LOCAL_API_ENDPOINTS.wip_txn}${sortByDateDescAllEntries}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    );

    const responseBody = await response.json();

    const wipTempData = responseBody?.data?.map((item) => {
      const tempItem = {
        key: item?.id,
        id: item?.id,
        ...item?.attributes,
        createdAt: new Date(item?.attributes?.createdAt).toLocaleDateString(),
      };
      return tempItem;
    });

    setWIPTxnData(wipTempData);
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

  const tableColumns = [
    {
      title: "Material ID",
      dataIndex: "material_id",
      key: "material_id",
    },
    {
      title: "Material Name",
      dataIndex: "material_name",
      key: "material_name",
    },
    {
      title: "PQ Qty",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  return (
    <div className="p-5">
      <h2 className="pb-5">WIP View</h2>
      <Table
        dataSource={wipData}
        columns={tableColumns}
        pagination={{ defaultPageSize: 6 }}
      />
    </div>
  );
};

export default WIPView;
