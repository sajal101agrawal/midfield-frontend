import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

interface data {
  app_name: string;
  unique_id: string;
  api_key: string;
}

interface validatorsObj {
  validator_codename: number;
  parameters: any;
}

interface appDetails {
  apikey: string;
  app_name: string;
  user_name: string;
  unique_id: string;
  associated_validators: any[];
}

interface CreateAppContextValue {
  APIData: data | null;
  appList: any[];
  appDetails: appDetails | null;
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
  createApp: (
    google_id: string,
    email: string,
    app_name: string,
    validators: number[],
    setisModelOpen: (isModelOpen: boolean) => void,
  ) => Promise<void>;
  getAllApps: (google_id: string, email: string) => Promise<void>;
  getAppDetails: (unique_id: string) => Promise<void>;
  updateAppDetails: (
    id: string,
    google_id: string,
    email: string,
    apikey: string,
    validators: validatorsObj[],
    del_validators: validatorsObj[],
  ) => Promise<void>;
  deleteApp: (
    google_id: string,
    email: string,
    app_name: string,
  ) => Promise<void>;
}

const CreateAppContext = createContext<CreateAppContextValue | undefined>(
  undefined,
);

interface CreateAppProviderProps {
  children: ReactNode;
}

function CreateAppProvider({ children }: CreateAppProviderProps) {
  const [APIData, setAPIData] = useState<data | null>(null);
  const [appDetails, setAppDetails] = useState<appDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [appList, setAppList] = useState<any[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
    setIsLoading(false);
  }, [location.pathname]);

  const createApp = async (
    google_id: string,
    email: string,
    app_name: string,
    validators: number[],
    setisModelOpen: (isModelOpen: boolean) => void,
  ) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `https://api.midfield.ai/api/app/create_apps/`,

        {
          google_id,
          email,
          app_name,
          validators,
        },
      );
      setAPIData(res.data.data);
      setisModelOpen(true);
    } catch (error: any) {
      setError(
        error.response?.data?.error || 'Something went wrong Try Again!',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getAllApps = useCallback(async function getAllApps(
    google_id: string,
    email: string,
  ) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        'https://api.midfield.ai/api/app/get_apps/',
        { google_id, email },
      );
      setAppList(res.data.app_lists);
    } catch (error: any) {
      setError(
        error.response?.data?.error ||
          'Failed to load App List, Please Reload!',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAppDetails = useCallback(async function getAllApps(
    unique_id: string,
  ) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        'https://api.midfield.ai/api/app/app_details/',
        { unique_id },
      );
      setAppDetails(res.data.data);
    } catch (error: any) {
      setError(
        error.response?.data?.error || 'Failed to load App Details, Try Again!',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAppDetails = useCallback(async function updateAppName(
    id: string,
    google_id: string,
    email: string,
    apikey: string,
    validators: validatorsObj[],
    del_validators: validatorsObj[],
  ) {
    try {
      const res = await axios.post(
        'https://api.midfield.ai/api/app/update_apps/',
        { google_id, email, apikey, validators, del_validators },
      );
      console.log(res.data);
      getAppDetails(id);
      navigate('/dashboard/apps');
    } catch (error: any) {
      console.log(error);
      throw new Error(
        error.response?.data?.error ||
          'Failed to Update App Details, Try Again!',
      );
    }
  }, []);

  const deleteApp = useCallback(async function deleteApp(
    google_id: string,
    email: string,
    app_name: string,
  ) {
    console.log(app_name, google_id, email);
    try {
      const res = await axios.post(
        'https://api.midfield.ai/api/app/delete_apps/',
        { google_id, email, app_name },
      );
      getAllApps(google_id, email);
    } catch (error: any) {
      //@ts-ignore
      throw new Error(
        error.response?.data?.error ||
          `Failed to Delete App ${app_name}, Try Again!`,
      );
    }
  }, []);

  return (
    <CreateAppContext.Provider
      value={{
        createApp,
        APIData,
        appDetails,
        error,
        isLoading,
        setError,
        getAllApps,
        getAppDetails,
        appList,
        updateAppDetails,
        deleteApp,
      }}
    >
      {children}
    </CreateAppContext.Provider>
  );
}

const useCreateApp = () => {
  const context = useContext(CreateAppContext);
  if (context === undefined) {
    throw new Error('useCreateApp must be used within a CreateAppProvider');
  }
  return context;
};

export { CreateAppProvider, useCreateApp };
