import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import axios from 'axios';

interface ValidatorsContextValue {
  validators: any[];
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  getAllValidators: () => Promise<void>;
}

const ValidatorsContext = createContext<ValidatorsContextValue | undefined>(
  undefined,
);

interface ValidatorsProviderProps {
  children: ReactNode;
}

function ValidatorsProvider({ children }: ValidatorsProviderProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validators, setValidators] = useState<any[]>([]);

  const getAllValidators = useCallback(async function getAllValidators() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        'https://api.midfield.ai/api/validator/getlistofavailablevalidators/',
      );
      setValidators(res.data.data);
    } catch (error) {
      console.log(error);
      setError('Failed to load validators');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ValidatorsContext.Provider
      value={{ validators, isLoading, error, setError, getAllValidators }}
    >
      {children}
    </ValidatorsContext.Provider>
  );
}

const useValidators = () => {
  const context = useContext(ValidatorsContext);
  if (context === undefined) {
    throw new Error('useValidators must be used within a ValidatorsProvider');
  }
  return context;
};

export { ValidatorsProvider, useValidators };
