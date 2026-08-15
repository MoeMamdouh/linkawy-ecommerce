import { useQuery } from "@apollo/client/react";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { OrderItem } from "../types/profile.types";
import { GET_CUSTOMER_ORDERS_QUERY } from "../graphql";

type CustomerOrdersQueryData = {
  customer?: {
    id?: string;
    orders?: {
      totalCount?: number;
      edges?: Array<{
        node: any;
      }>;
    };
  } | null;
};

export function useCustomerOrders() {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const { data, loading, error, refetch } = useQuery<CustomerOrdersQueryData>(
    GET_CUSTOMER_ORDERS_QUERY,
    {
      variables: { customerAccessToken: token ?? "", first: 20 },
      skip: !isHydrated || !isAuthenticated || !token,
      fetchPolicy: "cache-and-network",
    }
  );

  const rawOrders = data?.customer?.orders;
  const ordersCount: number = rawOrders?.totalCount ?? rawOrders?.edges?.length ?? 0;

  const orders: OrderItem[] = (rawOrders?.edges ?? []).map(({ node }: any) => {
    const processedDate = node.processedAt
      ? new Date(node.processedAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

    const items = (node.lineItems?.edges ?? []).map(({ node: line }: any) => ({
      title: line.title,
      quantity: line.quantity,
      image: line.variant?.image?.url,
      price: line.variant?.price?.amount,
    }));

    return {
      id: node.id,
      orderNumber: node.name || `#${node.orderNumber}`,
      date: processedDate,
      status: (node.fulfillmentStatus || node.financialStatus || "PROCESSING").toLowerCase(),
      total: node.totalPrice?.amount ? parseFloat(node.totalPrice.amount).toFixed(2) : "0.00",
      currencyCode: node.totalPrice?.currencyCode || "USD",
      items,
    };
  });

  return {
    orders,
    ordersCount,
    loading,
    error: error ? error.message : null,
    refetch,
  };
}
