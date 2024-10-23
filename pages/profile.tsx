
// pages/profile.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface UserProfile {
  name: string;
  roll: string;
  department: string;
  passing_year: number;
  degree: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>('');
  
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  
  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${api}/project/getuserdata`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: localStorage.getItem('token') }),
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
      } catch {
        setError('Unable to load profile data');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-red-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-2xl text-red-200 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-blue-200 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 py-12 px-4">
      <Head>
        <title>{`${profile.name}'s Profile | ITC Profiles`}</title>
        <meta name="description" content={`Profile dashboard for ${profile.name}`} />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-8 py-12 sm:px-12">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-white mb-4">
                Welcome, {profile.name}
              </h1>
              <p className="text-xl text-blue-200">
                Your Profile Dashboard
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 rounded-2xl p-6">
                <h2 className="text-lg font-medium text-blue-200 mb-2">Roll Number</h2>
                <p className="text-3xl font-bold text-white">{profile.roll}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6">
                <h2 className="text-lg font-medium text-blue-200 mb-2">Department</h2>
                <p className="text-3xl font-bold text-white">{profile.department}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6">
                <h2 className="text-lg font-medium text-blue-200 mb-2">Passing Year</h2>
                <p className="text-3xl font-bold text-white">{profile.passing_year}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6">
                <h2 className="text-lg font-medium text-blue-200 mb-2">Degree</h2>
                <p className="text-3xl font-bold text-white">{profile.degree}</p>
              </div>
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-8 py-4 bg-red-600 text-white text-lg font-bold rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;