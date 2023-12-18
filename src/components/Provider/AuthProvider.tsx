import { AuthContext } from '@/components/Provider/AuthContext';
import React, { useEffect, useState } from 'react';
import { currentUser } from '@/services/api';
import { removeAccessToken } from '@/lib/cache';

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<any>();

  const initUser = async () => {
    try {
      const user = await currentUser();
      if (user) setUser(user);
    } catch (error) {
      removeAccessToken();
    }
  };

  useEffect(() => {
    initUser().then();
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
