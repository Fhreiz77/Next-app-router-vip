"use client";

// import { getData } from "@/services/products";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

type ProductPageProps = { params: { slug: string[] } };

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductPage(props: ProductPageProps) {
  const { params } = props;
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product`,
    fetcher,
  );
  // const products = await getData(`${process.env.NEXT_PUBLIC_API_URL}/api/product`);
  const products = {
    data: data?.data,
  };

  return (
    <div className="grid grid-cols-4 mt-5 place-items-center">
      {/* <h1>{slug ? "Detail Product Page" : "Product Page"}</h1> */}
      {products.data?.length > 0 &&
        products.data?.map((product: any) => (
          <Link
            href={`/product/detail/${product.id}`}
            key={product.id}
            className="w-10/12 max-w-sm bg-neutral-primary-soft p-6 border border-gray-500 rounded-lg shadow my-2"
          >
            <Image
              className="p-8 rounded-t-lg object-cover h-96 w-full"
              src={product.image}
              alt="product image"
              width={500}
              height={500}
              priority
            />

            <div>
              <h5 className="text-xl text-heading font-semibold tracking-tight truncate">
                {product.title}
              </h5>

              <div className="flex items-center justify-between mt-3">
                <span className="text-3xl font-extrabold text-heading">
                  {product.price}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center box-border border focus:ring-2 focus:ring-brand-small shadow-xs font-medium leading-5 rounded-full text-sm px-3 py-2 focus:outline-none"
                >
                  <svg
                    className="w-4 h-4 me-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      {/* {props && (
        <>
          <p>Category: {props}</p>
          <p>Gender: {props}</p>
          <p>Id: {props}</p>
        </>
      )} */}
    </div>
  );
}
