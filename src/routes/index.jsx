import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ProductList from "@/pages/ProductList";
import ProductDetail from "@/pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <ProductList /> },
      { path: "product/:id", element: <ProductDetail /> },
    ],
  },
]);

export default router;
