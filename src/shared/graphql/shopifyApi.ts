import { gql } from "@apollo/client";
import { apolloClient } from "./client"; // Adjust path to your Apollo file

interface RequestOptions {
  requiresAuth?: boolean;
  customerAccessToken?: string;
}

export async function shopifyApi<
  TData,
  TVariables extends Record<string, any> = Record<string, any>,
>(
  queryString: string,
  variables: TVariables = {} as TVariables,
  options: RequestOptions = {},
): Promise<TData> {
  const finalVariables: Record<string, any> = { ...variables };

  // Automatically inject customerAccessToken if needed
  if (options.requiresAuth) {
    const token = options.customerAccessToken;

    console.log("🔑 [shopifyApi] Using Token:", token);

    if (!token) {
      throw new Error("User is not authenticated.");
    }
    finalVariables.customerAccessToken = token;
  }

  // Convert string query to Apollo GraphQL Document
  const parsedQuery = gql(queryString);
  const isMutation = queryString.trim().startsWith("mutation");

  // Execute via Apollo Client
  if (isMutation) {
    const response = await apolloClient.mutate<TData>({
      mutation: parsedQuery,
      variables: finalVariables,
    });
    return response.data as TData;
  } else {
    const response = await apolloClient.query<TData>({
      query: parsedQuery,
      variables: finalVariables,
      fetchPolicy: "network-only", // Ensures fresh data from Shopify
    });
    return response.data as TData;
  }
}
