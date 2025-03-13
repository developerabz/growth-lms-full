-- Create enum type for UserType
CREATE TYPE user_type AS ENUM ('Teacher', 'Parent', 'AdultStudent', 'Admin', 'ChildStudent');

-- Create Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    salt VARCHAR(128) NOT NULL,
    hash VARCHAR(512) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create UserTypes junction table (for multiple user types per user)
CREATE TABLE user_types (
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    user_type user_type NOT NULL,
    PRIMARY KEY (user_id, user_type)
);

-- Create ParentUsers table
CREATE TABLE parent_users (
    user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create ChildStudentUsers table
CREATE TABLE child_student_users (
    user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    parent_user_id UUID NOT NULL REFERENCES parent_users(user_id) ON DELETE CASCADE
);

-- Create Courses table
CREATE TABLE courses (
    course_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    level VARCHAR(50) NOT NULL,
    teacher_id UUID NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create UserCourses junction table (for users enrolled in courses)
CREATE TABLE user_courses (
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(course_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, course_id)
);

-- Create Announcements table
CREATE TABLE announcements (
    announcement_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    course_id UUID NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Progress table
CREATE TABLE progress (
    progress_id UUID PRIMARY KEY,
    amount DECIMAL(5,2) NOT NULL CHECK (amount >= 0 AND amount <= 100),
    course_id UUID NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (course_id, student_id)
);

-- Create indexes for foreign keys and commonly queried fields
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_child_students_parent ON child_student_users(parent_user_id);
CREATE INDEX idx_courses_teacher ON courses(teacher_id);
CREATE INDEX idx_announcements_course ON announcements(course_id);
CREATE INDEX idx_announcements_author ON announcements(author_id);
CREATE INDEX idx_progress_course ON progress(course_id);
CREATE INDEX idx_progress_student ON progress(student_id);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create update triggers for tables with timestamps
CREATE TRIGGER update_users_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_courses_timestamp
    BEFORE UPDATE ON courses
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_announcements_timestamp
    BEFORE UPDATE ON announcements
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_progress_timestamp
    BEFORE UPDATE ON progress
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp(); 