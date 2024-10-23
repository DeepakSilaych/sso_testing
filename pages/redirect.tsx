// pages/redirect.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Loader2 } from 'lucide-react';

const RedirectPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = router.query.accessid;

    if (token) {
      localStorage.clear();
      localStorage.setItem('token', token as string);
      router.push('/profile').catch(() => {
        setError('Authentication failed. Please try again.');
        setLoading(false);
      });
    } else {
      setError('Invalid authentication token. Please try again.');
      setLoading(false);
    }
  }, [router.query.accessid, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl">
        {loading ? (
          <div
            className="flex flex-col items-center"
          >
            <Loader2 className="w-16 h-16 text-blue-200 animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-white">Authenticating...</h2>
            <p className="mt-2 text-blue-200">Please wait while we secure your session</p>
          </div>
        ) : (
          <div
            className="text-center"
          >
            <div className="text-red-300 text-xl font-medium">
              {error}
              <button
                onClick={() => window.location.href = '/'}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedirectPage;
