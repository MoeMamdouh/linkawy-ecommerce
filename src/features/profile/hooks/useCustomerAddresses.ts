import { useQuery } from "@apollo/client/react";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { UserAddress } from "../types/profile.types";
import { GET_CUSTOMER_ADDRESSES_QUERY } from "../graphql";

type CustomerAddressesQueryData = {
  customer?: {
    id?: string;
    defaultAddress?: {
      id?: string;
    } | null;
    addresses?: {
      edges?: Array<{
        node: {
          id: string;
          address1: string;
          address2?: string;
          city: string;
          province?: string;
          zip?: string;
          country: string;
          phone?: string;
        };
      }>;
    };
  } | null;
};

export function useCustomerAddresses() {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const { data, loading, error, refetch } = useQuery<CustomerAddressesQueryData>(
    GET_CUSTOMER_ADDRESSES_QUERY,
    {
      variables: { customerAccessToken: token ?? "", first: 10 },
      skip: !isHydrated || !isAuthenticated || !token,
      fetchPolicy: "cache-and-network",
    }
  );

  const defaultAddressId = data?.customer?.defaultAddress?.id;

  const addresses: UserAddress[] = (data?.customer?.addresses?.edges ?? []).map(
    ({ node }) => ({
      id: node.id,
      address1: node.address1,
      address2: node.address2 || "",
      city: node.city,
      province: node.province || "",
      zip: node.zip || "",
      country: node.country || "",
      phone: node.phone || "",
      isDefault: node.id === defaultAddressId,
    })
  );

  return {
    addresses,
    addressCount: addresses.length,
    loading,
    error: error ? error.message : null,
    refetch,
  };
}
