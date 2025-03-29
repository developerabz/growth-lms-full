"use client"
import { Course } from "@/config/customtypes";
import { API_ENDPOINTS } from "@/config/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";



export default function CoursePage() {
  const params = useParams()
  console.log("yo")
  const [course, setCourse] = useState<Course>({
    id: '',
    name: '',
    description: '',
    price: 0,
    duration: 0,
    level: '',
    subject: '',
    teacherId: '',
  });

  useEffect(() => {
    getCourse()

  }, [])

  async function getCourse() {

    try {

      const res = await fetch(API_ENDPOINTS.getCourse(params.id as string));
      const data = await res.json();
      console.log(data);
      setCourse(data);
    } catch (error) {
      console.error(error)
    }

  }


  //TODO: customise the course page
  //It will have the following sections:
  //- Coutse title and description 
  //- Announcements card section 
  //- Course resources cards section 
  //- Assessments resources card section 
  //- Course chat card section
  //- Quizzes card section
  //- Edit button (for admin/teacher users only)
  //- editable is adding and removing these cards
  //- editable is course title and description
  //- editable is the teacher
  //- ...and more
  return (
    <div className="bg-background min-h-screen dark:bg-gray-900 p-8">
      <h1 className="font-bold">{course?.name}</h1>
      <p>{course?.description}</p>

    </div>
  );
}

