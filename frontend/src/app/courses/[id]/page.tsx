
import { Course } from "@/config/customtypes";

//TODO: use api.ts to fix for proper fetching here

async function getCourse(id: string): Promise<Course> {
  const res = await fetch(`https://api.example.com/courses/${id}`);
  return res.json();
}

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);

  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.description}</p>
    </div>
  );
}

