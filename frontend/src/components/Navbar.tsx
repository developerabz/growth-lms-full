import Link from 'next/link';

export default function Navbar() {
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
            <Link
              href="/login"
              className="text-white hover:bg-white hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Login
            </Link>
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