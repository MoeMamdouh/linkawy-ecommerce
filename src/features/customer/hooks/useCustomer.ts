import { useQuery } from "@apollo/client/react";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { GET_CUSTOMER_QUERY } from "../graphql";

type CustomerProfile = {
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
};

type CustomerQueryData = {
  customer?: CustomerProfile | null;
};

export const useCustomerProfile = () => {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  return useQuery<CustomerQueryData>(GET_CUSTOMER_QUERY, {
    variables: { customerAccessToken: token ?? "" },
    skip: !isHydrated || !isAuthenticated || !token,
    fetchPolicy: "network-only",
  });
};
