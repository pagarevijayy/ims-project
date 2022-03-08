import ProductMaster from "../components/product-master";
import "antd/dist/antd.css";

export default function Home() {
  return (
    <div className="h-screen w-screen d-flex items-center justify-center text-center p-16">
      <h1 className="text-3xl font-bold">IMS Frontend</h1>
      <ProductMaster />
    </div>
  );
}
