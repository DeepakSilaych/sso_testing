import { FC } from 'react';
import { useRouter } from 'next/router';

const LoginButton: FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    const ssoUrl = process.env.NEXT_PUBLIC_SSO_URL;
    router.push(`https://sso.tech-iitb.org/project/${ssoUrl}/ssocall`);
  };

  return (
    <button
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      onClick={handleLogin}
    >
      Login with SSO
    </button>
  );
};

export default LoginButton;
