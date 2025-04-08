
export enum UserType {
  Teacher,
  Parent,
  AdultStudent,
  Admin,
  ChildStudent
}

export interface User {
  userId: string;
  email: string;
  name: string;
  userTypes: UserType[];
  courseIds?: string[];
  parentId?: string;
  childIds?: string[];
}

export interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  level: string;
  subject: string;
  teacherId: string;
}

export interface EnrolledCourse extends Course {
  progress: number;
}

export interface Announcement {
  id: string;
  name: string;
  details: string;
  comments: string[];
  authorId: string;
  courseId: string;
}

