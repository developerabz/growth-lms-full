'use client';

import { FC } from 'react';
import Link from 'next/link';
import { MoreVertical } from 'lucide-react';

interface CourseCardProps {
  id: string;
  name: string;
  progress?: number;
  instructor: string;
  isCompleted?: boolean;
}

const CourseCard: FC<CourseCardProps> = ({
  id,
  name,
  progress = 0,
  instructor,
  isCompleted = false,
}) => {
  return (
    <Link href={`/courses/${id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-primary-light dark:text-white mb-1">
              {name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {instructor}
            </p>
          </div>
          <button className="text-gray-400 hover:text-primary-light dark:hover:text-white">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
        
        {!isCompleted && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-300">Progress</span>
              <span className="text-primary-light dark:text-white">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary-light h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CourseCard; 