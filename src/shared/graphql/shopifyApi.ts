import { DocumentNode } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { apolloClient } from "./client"; // Adjust path to your Apollo file

interface RequestOptions {
  requiresAuth?: boolean;
  customerAccessToken?: string;
}

export async function shopifyApi<
  TData,
  TVariables extends Record<string, any> = Record<string, any>,
>(
  query: DocumentNode,
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

  const mainDefinition = getMainDefinition(query);
  const isMutation =
    mainDefinition.kind === "OperationDefinition" &&
    mainDefinition.operation === "mutation";

  if (mainDefinition.kind !== "OperationDefinition") {
    throw new Error("Unsupported GraphQL document.");
  }

  // Execute via Apollo Client
  if (isMutation) {
    const response = await apolloClient.mutate<TData>({
      mutation: query,
      variables: finalVariables,
    });
    return response.data as TData;
  } else {
    const response = await apolloClient.query<TData>({
      query: query,
      variables: finalVariables,
      fetchPolicy: "network-only", // Ensures fresh data from Shopify
    });
    return response.data as TData;
  }
}
