import { useEffect, useState } from 'react';
import Head from 'next/head';

interface UserProfile {
  name: string;
  roll: string;
  branch: string;
  passing_year: number;
  course: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/project/getuserdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: localStorage.getItem('token') }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data: UserProfile = await response.json();
        setProfile(data);
      } catch {
        setError('Failed to load profile data');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>ITC Profiles</title>
        <meta name="description" content="Experience seamless single sign-on integration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Roll:</strong> {profile.roll}</p>
        <p><strong>Branch:</strong> {profile.branch}</p>
        <p><strong>Passing Year:</strong> {profile.passing_year}</p>
        <p><strong>Course:</strong> {profile.course}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
