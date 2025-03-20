
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
    courseId: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    level: string;
    subject: string;
    teacherId: string;
}

