"use client"


import { useState } from "react";

export default function CourseCreator() {

    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [coursePrice, setCoursePrice] = useState(0);
    const [courseDuration, setCourseDuration] = useState(0);
    const [courseLevel, setCourseLevel] = useState('');
    const [courseSubject, setCourseSubject] = useState(''); 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(courseName, courseDescription, coursePrice, courseDuration, courseLevel, courseSubject);
    }

    return (
        <div className="min-h-screen bg-background dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-primary-light dark:text-white text-center">Course Creator</h1>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6 max-w-md mx-auto">
                    <div>
                        <label htmlFor="courseName">Course Name</label>
                        <input className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
               type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="courseDescription">Course Description</label>
                        <input className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
               type="text" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="coursePrice">Course Price</label>
                        <input className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
               type="number" value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="courseDuration">Course Duration</label>
                        <input className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
               type="number" value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="courseLevel">Course Level</label>
                        <input className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
               type="text" value={courseLevel} onChange={(e) => setCourseLevel(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="courseSubject">Course Subject</label>
                        <input className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
               type="text" value={courseSubject} onChange={(e) => setCourseSubject(e.target.value)} />
                    </div>
                    <button className="w-full flex justify-center py-2 px-4 border-2 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-light hover:bg-white hover:text-primary-light hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors"
            type="submit">Create Course</button>
                </form>
            </div>
        </div>
    )
}