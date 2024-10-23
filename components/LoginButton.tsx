import { FC } from 'react';
import { useRouter } from 'next/router';

const LoginButton: FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    const ssoUrl = process.env.NEXT_PUBLIC_SSO_URL;
    const api = process.env.NEXT_PUBLIC_API_URL;
    router.push(api + '/project/' + ssoUrl + '/ssocall');
  };

  return (
    <button
      className="bg-white text-blue-500 font-extrabold  px-6 py-2 rounded hover:bg-gray-200 hover:text-blue-700 transition-colors"
      onClick={handleLogin}
    >
      Login with SSO
    </button>
  );
};

export default LoginButton;
