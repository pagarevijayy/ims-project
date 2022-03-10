import React from "react";
import { useState, useEffect } from "react";
import { AUTH_TOKEN, LOCAL_API_ENDPOINTS } from "../../constants/api-endpoints";
import { Table } from "antd";

const FinishedView = () => {
  const [finishedData, setFinishedMData] = useState([]);
  useEffect(() => {
    fetchFinishedDataFromBackend();
  }, []);

  const fetchFinishedDataFromBackend = async () => {
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

    const finishedTempData = responseBody?.data?.map((item) => {
      const tempItem = {
        key: item?.id,
        id: item?.id,
        ...item?.attributes,
        createdAt: new Date(item?.attributes?.createdAt).toLocaleDateString(),
      };
      return tempItem;
    });

    console.log("Finished Goods view - Finished Txn data:", finishedTempData);

    setFinishedMData(finishedTempData);
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
      title: "Finished Goods Qty",
      dataIndex: "finished_qty",
      key: "finished_qty",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
    },
  ];

  return (
    <div className="p-5">
      <h2 className="pb-5">Finished Goods</h2>
      <Table
        dataSource={finishedData}
        columns={tableColumns}
        pagination={{ defaultPageSize: 6 }}
      />
    </div>
  );
};

export default FinishedView;
