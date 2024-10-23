import Head from 'next/head';
import LoginButton from '../components/LoginButton';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>ITC Profiles</title>
        <meta name="description" content="Experience seamless single sign-on integration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
        <h1 className="text-5xl font-extrabold mb-8">Welcome to the ITC Profiles</h1>
        <p className="text-xl mb-6">Experience seamless single sign-on integration</p>
        <LoginButton />
      </div>
    </>
  );  
};

export default HomePage;