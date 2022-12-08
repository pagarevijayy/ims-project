import React from "react";
import { useState, useEffect } from "react";
import { AUTH_TOKEN, LOCAL_API_ENDPOINTS } from "../../constants/api-endpoints";
import { Table } from "antd";

const PQTnxView = () => {
  const [PQTxnData, setPQTxnData] = useState([]);
  useEffect(() => {
    fetchPQTxnDataFromBackend();
  }, []);

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

    const txnTempData = responseBody?.data?.map((item) => {
      const tempItem = {
        key: item?.id,
        id: item?.id,
        ...item?.attributes,
        createdAt: new Date(item?.attributes?.createdAt).toLocaleDateString(),
      };
      return tempItem;
    });

    console.log("PQ view - Txn data:", txnTempData);

    setPQTxnData(txnTempData);
  };

  const tableColumns = [
    {
      title: "Ref ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Entry Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
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
      title: "Processed (Moved to WIP) Qty",
      dataIndex: "processed_qty",
      key: "processed_qty",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
    },
  ];

  return (
    <div className="p-5">
      <h2 className="pb-5">PQ txn Data</h2>
      <Table
        dataSource={PQTxnData}
        columns={tableColumns}
        pagination={{ defaultPageSize: 6 }}
      />
    </div>
  );
};

export default PQTnxView;
