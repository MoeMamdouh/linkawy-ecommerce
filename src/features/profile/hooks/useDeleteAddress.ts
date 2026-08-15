import { useMutation } from "@apollo/client/react";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { useState } from "react";
import { DELETE_CUSTOMER_ADDRESS_MUTATION } from "../graphql";
import { useCustomerAddresses } from "./useCustomerAddresses";

type DeleteAddressMutationData = {
  customerAddressDelete?: {
    deletedCustomerAddressId?: string | null;
    customerUserErrors?: Array<{
      code?: string;
      field?: string[];
      message?: string;
    }>;
  } | null;
};

export function useDeleteAddress() {
  const token = useAuthStore((state) => state.token);
  const { refetch: refetchAddresses } = useCustomerAddresses();

  const [deleteAddressMutation] =
    useMutation<DeleteAddressMutationData>(DELETE_CUSTOMER_ADDRESS_MUTATION);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const deleteAddress = async (addressId: string): Promise<boolean> => {
    setErrorMessage(null);

    if (!token) {
      setErrorMessage("You must be logged in to delete an address.");
      return false;
    }

    setDeletingId(addressId);

    try {
      const response = await deleteAddressMutation({
        variables: {
          id: addressId,
          customerAccessToken: token,
        },
      });

      const userErrors =
        response.data?.customerAddressDelete?.customerUserErrors;

      if (userErrors && userErrors.length > 0) {
        setErrorMessage(userErrors[0]?.message || "Failed to delete address.");
        setDeletingId(null);
        return false;
      }

      await refetchAddresses();
      setDeletingId(null);
      return true;
    } catch (e: any) {
      setErrorMessage(e?.message || "Failed to delete address.");
      setDeletingId(null);
      return false;
    }
  };

  return {
    deleteAddress,
    deletingId,
    errorMessage,
  };
}
