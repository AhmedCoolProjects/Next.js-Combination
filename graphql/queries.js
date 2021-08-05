import { fetchAPI } from "lib/api";
// import gql from "graphql-tag";

export async function getAllProducts() {
  const data = await fetchAPI(
    `
      {
        products(first: 1000, where: { visibility: VISIBLE }) {
          nodes {
            name
            id
            shortDescription(format: RAW)
            image {
              sourceUrl
              id
              title
            }
            ... on SimpleProduct {
              salePrice(format: RAW)
              regularPrice(format: RAW)
              stockStatus
            }
          }
        }
      }
    `
  );
  return data?.products?.nodes; // return array of products with their fields
}

export async function getALlProductsWithId() {
  const data = await fetchAPI(
    `
      {
        products(first: 1000, where: { visibility: VISIBLE }) {
          nodes {
            id
          }
        }
      }
    `
  );
  return data?.products?.nodes; // return array of products object with their Ids only
}

export async function getProduct(id) {
  const data = await fetchAPI(
    `
    query PostBySlug($id: ID!) {
      product(id: $id) {
        name
        shortDescription(format:RAW)
        image {
          sourceUrl
          title
          id
        }
        ... on SimpleProduct {
          regularPrice(format:RAW)
          salePrice(format:RAW)
          stockStatus
        }
      }
    }
    `,
    {
      variables: {
        id: id,
      },
    }
  );

  return data?.product; // return product object with its fields
}
