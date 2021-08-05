import { getAllProducts } from "graphql/queries";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

function SingleProduct({ product }) {
  return (
    <div className="flex relative flex-col p-2 space-y-3 border-2 border-blue-300 ">
      <div className="w-full h-32 flex flex-row items-start justify-start relative ">
        <Image
          src={product.image.sourceUrl}
          alt={product.image.title}
          layout="fill"
          objectFit="contain"
          className="h-full"
        />
      </div>
      <h1>name: {product.name}</h1>
      <h1>sale price: {product.salePrice}</h1>
      <p>regular price: {product.regularPrice}</p>
      <strong>stock: {product.stockStatus}</strong>
      <strong>short description: {product.shortDescription}</strong>
      <Link href={`/products/${product.id}`} passHref>
        <h1 className="underline mt-4 cursor-pointer">Check Product</h1>
      </Link>
    </div>
  );
}

export default function Home({ allProducts }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 ">
        {allProducts?.map((prd) => (
          <SingleProduct key={prd.id} product={prd} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const allProducts = await getAllProducts();
  return {
    props: {
      allProducts,
    },
  };
}
