'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Edit2, X } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import CourseCard from '@/components/CourseCard';
import NotificationCard from '@/components/NotificationCard';
import ErrorBoundary from '@/components/ErrorBoundary';

// Define section types
type SectionType = 'enrolled' | 'completed' | 'notifications' | 'all';

interface Section {
  id: SectionType;
  title: string;
  order: number;
}

// Mock data - replace with actual API calls
const mockEnrolledCourses = [
  { id: '1', name: 'Introduction to React', instructor: 'John Doe', progress: 75 },
  { id: '2', name: 'Advanced TypeScript', instructor: 'Jane Smith', progress: 45 },
];

const mockCompletedCourses = [
  { id: '3', name: 'Basic JavaScript', instructor: 'Mike Johnson', progress: 100 },
];

const mockNotifications = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Introduction to React',
    title: 'Assignment 2 Due Soon',
    dueDate: '2024-03-15',
    type: 'assessment' as const,
  },
  {
    id: '2',
    courseId: '2',
    courseName: 'Advanced TypeScript',
    title: 'Schedule Change: Next Week',
    dueDate: '2024-03-12',
    type: 'timetable' as const,
  },
];

// First, let's define our default layout outside the component
const DEFAULT_SECTIONS: Section[] = [
  { id: 'all', title: 'All Courses', order: 0 },
  { id: 'enrolled', title: 'Enrolled Courses', order: 1 },
  { id: 'completed', title: 'Completed Courses', order: 2 },
  { id: 'notifications', title: 'Notifications', order: 3 },
];

export default function Dashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS);

  const allCourses = [...mockEnrolledCourses, ...mockCompletedCourses];
  const filteredCourses = allCourses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add reset handler
  const handleReset = () => {
    setSections(DEFAULT_SECTIONS);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order numbers
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    setSections(updatedItems);
  };

  const renderSection = (section: Section) => {
    switch (section.id) {
      case 'all':
        return (
          <ErrorBoundary>
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-primary-light dark:text-white mb-4">
                {section.title}
              </h2>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </section>
          </ErrorBoundary>
        );
      case 'enrolled':
        return (
          <ErrorBoundary>
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-primary-light dark:text-white">
                  {section.title}
                </h2>
                <Link
                  href="/courses/browse"
                  className="text-primary-light dark:text-white hover:underline"
                >
                  Browse More Courses
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {mockEnrolledCourses.map(course => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </section>
          </ErrorBoundary>
        );
      case 'completed':
        return (
          <ErrorBoundary>
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-primary-light dark:text-white mb-4">
                {section.title}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {mockCompletedCourses.map(course => (
                  <CourseCard key={course.id} {...course} isCompleted />
                ))}
              </div>
            </section>
          </ErrorBoundary>
        );
      case 'notifications':
        return (
          <ErrorBoundary>
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-primary-light dark:text-white mb-4">
                {section.title}
              </h2>
              <div className="space-y-4">
                {mockNotifications.map(notification => (
                  <NotificationCard key={notification.id} {...notification} />
                ))}
              </div>
            </section>
          </ErrorBoundary>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-light dark:text-white">
            Welcome back, Student!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Track your progress and stay updated with your courses
          </p>
        </div>

        {/* Edit Mode Toggle */}
        <div className="flex justify-end items-center gap-4 mb-6">
          {isEditing && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary-light text-primary-light hover:bg-primary-light hover:text-white transition-colors"
            >
              Reset Layout
            </button>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-light text-white hover:bg-primary transition-colors"
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4" />
                Done Editing
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4" />
                Edit Layout
              </>
            )}
          </button>
        </div>

        {/* Draggable Sections */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections" isDropDisabled={!isEditing}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-8"
              >
                {sections
                  .sort((a, b) => a.order - b.order)
                  .map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                      isDragDisabled={!isEditing}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`transition-shadow ${
                            snapshot.isDragging ? 'shadow-lg' : ''
                          }`}
                        >
                          {renderSection(section)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
} 