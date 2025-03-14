
export enum UserType {
    ChildStudent,
    Parent,
    AdultStudent,
    Teacher
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

