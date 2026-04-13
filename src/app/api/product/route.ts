import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

const data = [
  {
    id: 1,
    title: "ULTRABOOST 5 Trainers",
    price: 2400000,
    image:
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/d838b18eb9bb4b4f9ea77ed061ed18fe_9366/ULTRABOOST_5_Trainers_White_KI8559_HM1.jpg",
  },
  {
    id: 2,
    title: "Adizero EVO SL Shoes",
    price: 4000000,
    image:
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/5f7f46b11a2d4836941a5367251e398c_9366/Adizero_EVO_SL_Shoes_White_JH6206_HM4.jpg",
  },
  {
    id: 3,
    title: "Samba OG Shoes",
    price: 2200000,
    image:
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/3bbecbdf584e40398446a8bf0117cf62_9366/Samba_OG_Shoes_White_B75806_01_00_standard.jpg",
  },
  {
    id: 4,
    title: "Climacool Laced Shoes",
    price: 2700000,
    image:
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/f2a0ced0790449f8882ed349bc5faa1a_9366/CLIMACOOL_LACED_SHOES_Grey_KJ8967_01_00_standard.jpg",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const detailProduct = await retrieveDataById("products", id);
    if (detailProduct) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: detailProduct,
      });
    }
    return NextResponse.json({
      status: 404,
      message: "Not Found",
      data: {},
    });
  }

  const products = await retrieveData("products");

  return NextResponse.json({
    status: 200,
    message: "Success",
    data: products,
  });
}
