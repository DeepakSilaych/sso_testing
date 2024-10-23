// pages/index.tsx
import Head from 'next/head';
import LoginButton from '../components/LoginButton';
import { useAuth } from '@/context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
      <Head>
        <title>ITC Profiles | Enterprise SSO Platform</title>
        <meta name="description" content="Experience enterprise-grade single sign-on integration with ITC Profiles." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000" />
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-6xl sm:text-8xl font-black mb-8 text-white tracking-tight">
            ITC Profiles
            <span className="block text-2xl sm:text-4xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
              External SSO Platform
            </span>
          </h1>
          
          <p className="text-2xl sm:text-3xl mb-12 text-blue-100 max-w-3xl mx-auto font-light">
            Experience enterprise-grade single sign-on integration outside IITB Servers
          </p>

          {!isAuthenticated && (
            <div
            >
              <LoginButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

