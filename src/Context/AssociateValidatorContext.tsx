import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import axios from 'axios';

interface AssociateValidator {
  parameters: any;
  validator_codename: number;
}
interface validators {
  validators: AssociateValidator[];
}

interface AssociateValidatorContextValue {
  error: string | null;
  isLoading: boolean;
  setError: (error: string | null) => void;
  createAssociateValidator: (
    apikey: string,
    validators: validators,
  ) => Promise<void>;
  editAssociateValidator: (apikey: string, parameters: any) => Promise<void>;
  deleteAssociateValidator: (apikey: string) => Promise<void>;
}

const AssociateValidatorContext = createContext<
  AssociateValidatorContextValue | undefined
>(undefined);

interface AssociateValidatorProps {
  children: ReactNode;
}

function AssociateValidatorProvider({ children }: AssociateValidatorProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createAssociateValidator = useCallback(
    async function createAssociateValidator(
      apikey: string,
      validators: validators,
    ) {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.post(
          'https://api.midfield.ai/api/validator/createassociatedvalidate/',
          {
            apikey,
            validators,
          },
        );

        // setValidators(res.data.data);
      } catch (error: any) {
        setError(
          error.response.data.error || 'Unable to Create Associate Validator',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const editAssociateValidator = useCallback(
    async function editAssociateValidator(apikey: string, parameters: any) {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.post(
          'https://api.midfield.ai/api/validator/editassociatedvalidate/',
          { apikey, parameters },
        );
        // setValidators(res.data.data);
      } catch (error: any) {
        setError(
          error.response.data.error || 'Unable to Edit Associate Validator',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const deleteAssociateValidator = useCallback(
    async function deleteAssociateValidator(apikey: string) {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.post(
          'https://api.midfield.ai/api/validator/deleteassociatedvalidate/',
          { apikey },
        );
        // setValidators(res.data.data);
      } catch (error: any) {
        setError(
          error.response.data.error || 'Unable to Delete Associate Validator',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return (
    <AssociateValidatorContext.Provider
      value={{
        error,
        isLoading,
        setError,
        createAssociateValidator,
        editAssociateValidator,
        deleteAssociateValidator,
      }}
    >
      {children}
    </AssociateValidatorContext.Provider>
  );
}

const useAssociateValidator = () => {
  const context = useContext(AssociateValidatorContext);
  if (context === undefined) {
    throw new Error(
      'useAssociateValidator must be used within a AssociateValidatorProvider',
    );
  }
  return context;
};

export { AssociateValidatorProvider, useAssociateValidator };
