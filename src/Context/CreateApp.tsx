import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import axios from 'axios';

interface data {
  app_name: string;
  unique_id: string;
  api_key: string;
}

interface CreateAppContextValue {
  APIData: data | null;
  appList: any[];
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
  updateAppName: (
    google_id: string,
    email: string,
    app_name: string,
    new_name: string,
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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [appList, setAppList] = useState<any[]>([]);

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
      console.log(res.data);
      setAPIData(res.data.data);
      setisModelOpen(true);
    } catch (error: any) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
      setError('Failed to load App List, Please Reload!');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAppName = useCallback(async function updateAppName(
    google_id: string,
    email: string,
    app_name: string,
    new_name: string,
  ) {
    try {
      const res = await axios.post(
        'https://api.midfield.ai/api/app/update_apps/',
        { google_id, email, app_name, new_name },
      );
      console.log(res.data);
      getAllApps(google_id, email);
    } catch (error) {
      console.log(error);
      // setError('Failed to Update App Name, Try Again!');
    }
  }, []);

  const deleteApp = useCallback(async function deleteApp(
    google_id: string,
    email: string,
    app_name: string,
  ) {
    try {
      const res = await axios.delete(
        'https://api.midfield.ai/api/app/delete_apps/',
        //@ts-ignore
        { google_id, email, app_name },
      );
      console.log(res.data);
      getAllApps(google_id, email);
    } catch (error) {
      console.log(error);
      // setError('Failed to Delete App, Try Again!');
    }
  }, []);

  return (
    <CreateAppContext.Provider
      value={{
        createApp,
        APIData,
        error,
        isLoading,
        setError,
        getAllApps,
        appList,
        updateAppName,
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
