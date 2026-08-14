import { useMutation } from "@apollo/client/react";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { useState } from "react";
import { CREATE_CUSTOMER_ADDRESS_MUTATION } from "../graphql";
import { useCustomerAddresses } from "./useCustomerAddresses";

export interface CreateAddressInput {
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  zip?: string;
  country?: string;
  phone?: string;
}

type CreateAddressMutationData = {
  customerAddressCreate?: {
    customerAddress?: {
      id: string;
    } | null;
    customerUserErrors?: Array<{
      code?: string;
      field?: string[];
      message?: string;
    }>;
  } | null;
};

export function useAddAddress() {
  const token = useAuthStore((state) => state.token);
  const { refetch: refetchAddresses } = useCustomerAddresses();

  const [createAddressMutation, { loading }] =
    useMutation<CreateAddressMutationData>(CREATE_CUSTOMER_ADDRESS_MUTATION);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addAddress = async (input: CreateAddressInput): Promise<boolean> => {
    setErrorMessage(null);

    if (!token) {
      setErrorMessage("You must be logged in to add an address.");
      return false;
    }

    if (!input.address1 || !input.city) {
      setErrorMessage("Street Address and City are required.");
      return false;
    }

    try {
      const response = await createAddressMutation({
        variables: {
          customerAccessToken: token,
          address: {
            address1: input.address1,
            address2: input.address2 || undefined,
            city: input.city,
            province: input.province || undefined,
            zip: input.zip || undefined,
            country: input.country || "US",
            phone: input.phone || undefined,
          },
        },
      });

      const userErrors = response.data?.customerAddressCreate?.customerUserErrors;

      if (userErrors && userErrors.length > 0) {
        setErrorMessage(userErrors[0]?.message || "Failed to add address.");
        return false;
      }

      await refetchAddresses();
      return true;
    } catch (e: any) {
      setErrorMessage(e?.message || "Failed to add address.");
      return false;
    }
  };

  return {
    addAddress,
    loading,
    errorMessage,
  };
}
