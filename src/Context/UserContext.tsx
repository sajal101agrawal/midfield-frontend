import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  sub: string;
  //Add Another Properties as needed
}

interface UserContextValue {
  userData: User | null;
  error: string | null;
  isAuthenticated: boolean;
  getUserData: (code: string) => void;
  logOut: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formValidators, setFormValidators] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('auth-token');
    const user = localStorage.getItem('user-data');

    if (token && user) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(localStorage.getItem('user-data') || ''));
      navigate('/dashboard');
    }
  }, []);

  const getUserData = async (code: string) => {
    axios
      .get<{ 'auth-token': string; 'user-data': User }>(
        `https://api.midfield.ai/exchange-code/?code=${code}`,
      )
      .then((response) => {
        const { 'auth-token': authToken, 'user-data': userData } =
          response.data;

        // Store the auth token and user data in state
        setIsAuthenticated(true);
        setUserData(userData);

        // Store the auth token and user data in localStorage
        localStorage.setItem('auth-token', authToken);
        localStorage.setItem('user-data', JSON.stringify(userData));

        // Redirect to the dashboard page
        navigate('/dashboard');
      })
      .catch((error: any) => {
        console.error('Authentication Error:', error.response || error.message);
        setError('Failed to authenticate. Please try again.');
        // navigate('/auth/signin');
      });
  };

  const logOut = async () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-data');
    setIsAuthenticated(false);
    setUserData(null);
    navigate('/auth/signin');
  };

  return (
    <UserContext.Provider
      value={{ userData, error, getUserData, isAuthenticated, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
