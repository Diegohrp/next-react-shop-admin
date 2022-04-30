import {MainLayout} from '@layout/MainLayout';
import {ProviderAuth} from '@hooks/useAuth';
import {AuthContext} from 'context/AuthContext';
import {useAuthState} from '@hooks/useAuthState';
import '@styles/tailwind.css';

function MyApp({Component, pageProps}) {
  const value = useAuthState();
  return (
    <AuthContext.Provider value={value}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AuthContext.Provider>
  );
}

export default MyApp;
