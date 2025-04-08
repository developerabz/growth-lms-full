"use client"
import { Announcement, Course } from "@/config/customtypes";
import { API_ENDPOINTS } from "@/config/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    name: "First Announcement",
    details: "This is the first Announcement",
    comments: ["commmentid", "commendt2"],
    authorId: "3",
    courseId: "7"
  },
  {
    id: "2",
    name: "Second Announcement",
    details: "This is the second Announcement",
    comments: ["commmentid1", "commendt3"],
    authorId: "3",
    courseId: "7"
  },

];

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
  //- As` sessments resources card section 
  //- Course chat card section
  //- Quizzes card section
  //- Edit button (for admin/teacher users only)
  //- editable is adding and removing these cards
  //- editable is course title and description
  //- editable is the teacher
  //- ...and more
  //
  //
  //TODO: next 5 minutes, create announcements card
  return (
    <div className="bg-background min-h-screen dark:bg-gray-900 p-8">
      <h1 className="font-bold">{course?.name}</h1>
      <p>{course?.description}</p>
      <div>

        {mockAnnouncements.map((a, i) => {
          return <div key={i}>{a.name}</div>
        })}
      </div>


    </div>
  );
}

