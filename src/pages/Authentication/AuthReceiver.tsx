// src/pages/AuthReceiver.jsx
import { useEffect } from 'react';

import Loader from '../../common/Loader';
import { useUser } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const AuthReceiver: React.FC = () => {
  const { getUserData } = useUser();
  const naviate = useNavigate();

  useEffect(() => {
    // Extract the authorization code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      getUserData(code);
    } else {
      alert('No authorization code found in the Please try Again!');
      naviate('/auth/signin');
    }
  }, []);

  return <Loader />;
};

export default AuthReceiver;
