import { useQuery } from "@apollo/client/react";
import {
  GET_CUSTOMER_QUERY,
} from "../graphql";
import { useAuthStore } from "@features/auth/store/useAuthStore";

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

  return useQuery<CustomerQueryData>(GET_CUSTOMER_QUERY, {
    variables: { customerAccessToken: token ?? "" },
    skip: !isAuthenticated || !token,
    fetchPolicy: "network-only",
  });
};
