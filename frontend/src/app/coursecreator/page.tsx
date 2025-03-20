"use client"


import { User, UserType } from "@/config/customtypes";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/config/api";
export default function CourseCreator() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);
    const [level, setLevel] = useState('');
    const [subject, setSubject] = useState(''); 
    const [teachers, setTeachers] = useState<User[]>([]);
    const [teacher, setTeacher] = useState<User>({
        userId: '',
        name: '',
        email: '',
        userTypes: [UserType.Teacher],
    });
    useEffect(() => {
        const fetchTeachers = async () => {
            const response = await fetch(API_ENDPOINTS.getTeachers);
            const data = await response.json();
            console.log(data);
            setTeachers(data);
        }
        fetchTeachers();
        
        
    }, []);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name, description, price, duration, level, subject);
        const response = await fetch(API_ENDPOINTS.createCourse, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, price, duration, level, subject, teacherId: teacher.userId }),
        });
        const data = await response.json();
        console.log(data);
    }
    const handleTeacherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const teacher = teachers.find(t => t.name === e.target.value);
        if (teacher) {
            console.log(teacher);
            setTeacher(teacher);
        }
    }
    return (
        <div className="min-h-screen bg-background dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-primary-light dark:text-white text-center">Course Creator</h1>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6 max-w-md mx-auto">
                    <div>
                        <label htmlFor="courseName">Course Name</label>
                        <input className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
               type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="courseDescription">Course Description</label>
                        <input className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
               type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="coursePrice">Course Price</label>
                        <input className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
               type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                    </div>
                    <div>
                        <label htmlFor="courseDuration">Course Duration</label>
                        <input className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
               type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
                    </div>
                    <div>
                        <label htmlFor="courseLevel">Course Level</label>
                        <input className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
               type="text" value={level} onChange={(e) => setLevel(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="courseSubject">Course Subject</label>
                        <input className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
               type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="courseTeacherId">Course Teacher ID</label>
                        <input className="mt-1 block w-full rounded text-black dark:text-white border-2 border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-light focus:ring-primary-light bg-white dark:bg-gray-800"
               type="text" list="teachers" onChange={handleTeacherChange} />
                        <datalist id="teachers">
                            {teachers.map((teacher) => (
                                <option key={teacher.userId} value={teacher.name}>{teacher.email}</option>
                            ))}
                        </datalist>
                    </div>
                    <button className="w-full flex justify-center py-2 px-4 border-2 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-light hover:bg-white hover:text-primary-light hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors"
            type="submit">Create Course</button>
                </form>
            </div>
        </div>
    )
}