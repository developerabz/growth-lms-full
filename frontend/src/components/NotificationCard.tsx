'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';

interface NotificationCardProps {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  dueDate: string;
  type: 'assessment' | 'announcement' | 'timetable';
}

const NotificationCard: FC<NotificationCardProps> = ({
  id,
  courseId,
  courseName,
  title,
  dueDate,
  type,
}) => {
  return (
    <Link href={`/courses/${courseId}/announcements/${id}`}>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 text-primary-light dark:text-white mt-1" />
          <div className="flex-1">
            <p className="text-sm font-medium text-primary-light dark:text-white">
              {courseName}
            </p>
            <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-1">
              {title}
            </h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Due: {dueDate}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-primary-light/10 text-primary-light dark:text-white">
                {type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard; 