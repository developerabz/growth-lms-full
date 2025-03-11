'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

// Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // Handle login submission
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-light dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password & Register Links */}
          <div className="flex items-center justify-between text-sm">
            <Link
              href="/forgot-password"
              className="text-primary-light hover:text-primary dark:text-blue-400 dark:hover:text-blue-300"
            >
              Forgot your password?
            </Link>
            <Link
              href="/register"
              className="text-primary-light hover:text-primary dark:text-blue-400 dark:hover:text-blue-300"
            >
              Need an account?
            </Link>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border-2 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-light hover:bg-white hover:text-primary-light hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 