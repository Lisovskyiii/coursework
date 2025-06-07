import { useEffect, useState } from 'react';
import { checkSession } from 'api/Auth.api';

export const useAuth = (location: string) => {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // состояние загрузки

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await checkSession();

        setAuth(data?.active ?? false);
      } catch (e) {
        console.error('Session check failed:', e);
        setAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [location]);

  return {
    isAuth,
    isLoading
  };
};
