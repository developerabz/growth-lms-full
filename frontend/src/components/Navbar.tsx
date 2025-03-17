"use client"

import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/layout';

export default function Navbar() {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!loggedIn) {
      const tokenExists = localStorage.getItem('token') !== null;
      if (tokenExists) {
        setLoggedIn(true);
      }
    }

  }, [loggedIn]);

  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    router.push("/login");
  }
  


  return (
    <nav className="bg-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl font-semibold">
              Growth LMS
            </Link>
          </div>
          <div className="flex space-x-4">
            {loggedIn && (
              <button
              onClick={handleLogout}
              className="text-white hover:bg-white hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>)}

            {!loggedIn && (
              <Link
                href="/login"
                className="text-white hover:bg-white hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}



            <Link
              href="/register"
              className="bg-white border-white border-2 text-primary-light hover:bg-primary-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 