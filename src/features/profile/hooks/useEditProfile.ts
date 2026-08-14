import { useMutation } from "@apollo/client/react";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { useCustomerProfile } from "@features/customer/hooks/useCustomer";
import { useState } from "react";
import { UPDATE_CUSTOMER_MUTATION } from "../graphql";

interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

type CustomerUpdateMutationData = {
  customerUpdate?: {
    customer?: {
      id?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
    } | null;
    customerUserErrors?: Array<{
      code?: string;
      field?: string[];
      message?: string;
    }>;
  } | null;
};

export function useEditProfile() {
  const token = useAuthStore((state) => state.token);
  const { refetch: refetchProfile } = useCustomerProfile();

  const [updateCustomer, { loading }] = useMutation<CustomerUpdateMutationData>(
    UPDATE_CUSTOMER_MUTATION
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const updateProfile = async (input: UpdateProfileInput): Promise<boolean> => {
    setErrorMessage(null);
    setSuccessMessage(false);

    if (!token) {
      setErrorMessage("You must be logged in to update your profile.");
      return false;
    }

    try {
      const response = await updateCustomer({
        variables: {
          customerAccessToken: token,
          customer: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone || undefined,
          },
        },
      });

      const userErrors = response.data?.customerUpdate?.customerUserErrors;

      if (userErrors && userErrors.length > 0) {
        setErrorMessage(userErrors[0]?.message || "An error occurred.");
        return false;
      }

      setSuccessMessage(true);
      await refetchProfile();
      return true;
    } catch (e: any) {
      setErrorMessage(e?.message || "Failed to update profile.");
      return false;
    }
  };

  return {
    updateProfile,
    loading,
    errorMessage,
    successMessage,
  };
}
