import React from "react";
import { useState, useEffect } from "react";
import { AUTH_TOKEN, LOCAL_API_ENDPOINTS } from "../../constants/api-endpoints";
import { Table } from "antd";

const ProductMaster = () => {
  const [pmData, setPMData] = useState([]);
  useEffect(() => {
    fetchPMDataFromBackend();
  }, []);

  const fetchPMDataFromBackend = async () => {
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

    console.log("PM view - PM Txn data:", pmTempData);

    setPMData(pmTempData);
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
      title: "Indent Number",
      dataIndex: "indent_number",
      key: "indent_number",
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
      title: "Material Description",
      dataIndex: "material_description",
      key: "material_description",
    },
    {
      title: "Stock Qty",
      dataIndex: "stock_qty",
      key: "stock_qty",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
    },
  ];

  return (
    <div className="p-5">
      <h2 className="pb-5">Product Master</h2>
      <Table
        dataSource={pmData}
        columns={tableColumns}
        pagination={{ defaultPageSize: 6 }}
      />
    </div>
  );
};

export default ProductMaster;
