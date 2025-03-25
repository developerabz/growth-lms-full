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
  return (
    <div className="bg-blue-100">
      <h1 className="text-black font-bold">{course?.name}</h1>
      <p>{course?.description}</p>
    </div>
  );
}

