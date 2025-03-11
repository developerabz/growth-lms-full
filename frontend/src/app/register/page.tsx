'use client';

import { useState } from 'react';
import { useForm, useFieldArray} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { XCircle } from 'lucide-react';

// Define user types
type UserType = 'adultStudent' | 'childStudent' | 'parent';

// Zod schema for form validation
const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  userTypes: z
    .array(z.enum(['adultStudent', 'childStudent', 'parent']))
    .min(1, 'Please select at least one user type')
    .refine(
      (types: string[]) => 
        !(types.includes('childStudent') && 
          (types.includes('adultStudent') || types.includes('parent'))),
      {
        message: 'Child students cannot also be adult students or parents'
      }
    ),
  parentEmail: z.string().email('Invalid email address').optional(),
  childEmails: z.array(
    z.object({
      email: z.string().email('Invalid email address')
    })
  ).optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [selectedTypes, setSelectedTypes] = useState<UserType[]>([]);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      childEmails: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'childEmails',
  });


  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
    // Handle form submission
  };

  const handleUserTypeChange = (type: UserType) => {
    setSelectedTypes((prev) => {
      const isSelected = prev.includes(type);
      if (isSelected) {
        return prev.filter((t) => t !== type);
      }
      return [...prev, type];
    });
  };

  // Check if adult or parent is selected
  const isAdultOrParentSelected = selectedTypes.includes('adultStudent') || selectedTypes.includes('parent');
  
  // Check if child is selected
  const isChildSelected = selectedTypes.includes('childStudent');

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-light">
            Create Your Account
          </h2>
          <p className="mt-2 text-gray-600">
            Join our learning community today
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register('fullName')}
              className="mt-1 block w-full rounded text-black border-2 border-gray-300 shadow-sm focus:border-primary-light focus:ring-primary-light"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          {/* User Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('userTypes')}
                  value="adultStudent"
                  onChange={() => handleUserTypeChange('adultStudent')}
                  disabled={isChildSelected}
                  className="rounded border-gray-300 text-primary-light focus:ring-primary-light disabled:opacity-50"
                />
                <span className="ml-2 text-gray-700">
                  Adult Student
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('userTypes')}
                  value="childStudent"
                  onChange={() => handleUserTypeChange('childStudent')}
                  disabled={isAdultOrParentSelected}
                  className="rounded border-gray-300 text-primary-light focus:ring-primary-light disabled:opacity-50"
                />
                <span className="ml-2 text-gray-700">
                  Child Student
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('userTypes')}
                  value="parent"
                  onChange={() => handleUserTypeChange('parent')}
                  disabled={isChildSelected}
                  className="rounded border-gray-300 text-primary-light focus:ring-primary-light disabled:opacity-50"
                />
                <span className="ml-2 text-gray-700">
                  Parent
                </span>
              </label>
            </div>
            {errors.userTypes && (
              <p className="mt-1 text-sm text-red-600">{errors.userTypes.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="mt-1 block w-full rounded text-black border-2 border-gray-300 shadow-sm focus:border-primary-light focus:ring-primary-light"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="mt-1 block w-full rounded text-black border-2 border-gray-300 shadow-sm focus:border-primary-light focus:ring-primary-light"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Parent Email (for Child Students) */}
          {selectedTypes.includes('childStudent') && (
            <div>
              <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700">
                Parent&apos;s Email Address
              </label>
              <input
                type="email"
                id="parentEmail"
                {...register('parentEmail')}
                className="mt-1 block w-full rounded text-black border-2 border-gray-300 shadow-sm focus:border-primary-light focus:ring-primary-light"
              />
              {errors.parentEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.parentEmail.message}</p>
              )}
            </div>
          )}

          {/* Child Emails (for Parents) */}
          {selectedTypes.includes('parent') && (
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Child Email Addresses
                </label>
                {fields.length < 20 && (
                  <button
                    type="button"
                    onClick={() => append({ email: '' })}
                    className="text-primary-light hover:text-primary font-medium text-sm"
                  >
                    Add Child
                  </button>
                )}
              </div>
              <div className="space-y-2 mt-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input
                      type="email"
                      {...register(`childEmails.${index}.email`)}
                      className="block w-full rounded text-black border-2 border-gray-300 shadow-sm focus:border-primary-light focus:ring-primary-light"
                      placeholder="Child's email address"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border-2 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-light hover:bg-white hover:text-primary-light hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 