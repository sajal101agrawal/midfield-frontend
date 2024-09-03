import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import axios from 'axios';

interface AppDetail {
  app_name: string;
  apikey: string;
  id: number;
  prompts_number: number;
  prompt_passed: number;
  prompt_failed: number;
}

interface AppDetails {
  list_of_apps: AppDetail[];
  total_prompt_passed: number;
  total_prompt_failed: number;
  total_prompts: number;
}

interface dashboardData {
  google_id: string;
  email: string;
  name: string;
  profile_url: string;
  app_details: AppDetails;
}

interface DashboardContextValue {
  dashboardData: dashboardData | null;
  error: string | null;
  isLoading: boolean;
  // getDashboardAppData: (google_id: string, email: string) => Promise<void>;
  getDashboardAppAnalytics: (google_id: string, email: string) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(
  undefined,
);

interface DashboardProviderProps {
  children: ReactNode;
}

function DashboardProvider({ children }: DashboardProviderProps) {
  const [dashboardData, setDashboardData] = useState<dashboardData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardAppAnalytics = useCallback(async function getAllApps(
    google_id: string,
    email: string,
  ) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        'https://api.midfield.ai/dashboardanalytics',
        { google_id, email },
      );
      setDashboardData(res.data.data);
    } catch (error: any) {
      setError(
        error.response?.data?.error || 'Unable to load data, Please Reload!',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        error,
        isLoading,
        // getDashboardAppData,
        getDashboardAppAnalytics,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export { DashboardProvider, useDashboard };
