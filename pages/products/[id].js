import { getALlProductsWithId, getProduct } from "graphql/queries";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Product({ productData }) {
  const router = useRouter();
  return (
    <div className="">
      {router.isFallback ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className="w-[400px] grid-cols-1 grid sm:grid-cols-2 gap-2 relative">
            <div className="h-full relative">
              <Image
                src={productData.image.sourceUrl}
                objectFit="contain"
                layout="fill"
              />
            </div>
            <div className="ml-6 flex flex-col space-y-4">
              <h1 className="text-2xl font-bold">Name : {productData.name}</h1>
              <p className=" font-bold">
                Description: {productData.shortDescription}
              </p>
              <p className=" font-bold ">
                Regular Price:{" "}
                <span className="line-through">
                  {productData.regularPrice} DHs
                </span>
              </p>
              <p className=" font-bold">
                Sale Price: {productData.salePrice} DHs
              </p>
              <p className=" font-bold">Stock: {productData.stockStatus}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const allProductsWithId = await getALlProductsWithId();
  return {
    paths: allProductsWithId.map((product) => `/products/${product.id}`) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const productData = await getProduct(params.id);
  return {
    props: {
      productData,
    },
  };
}
