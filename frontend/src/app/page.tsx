import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-light mb-6">
            Transform Education with Growth LMS
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            A modern learning management system designed for parents, students, and teachers to collaborate seamlessly in the digital age.
          </p>
          <div className="space-x-4">
            <Link
              href="/register"
              className="inline-block bg-primary-light text-white hover:bg-white hover:text-primary-light border-2 border-primary-light px-8 py-3 rounded font-medium transition-colors"
              aria-label="Get started with Growth LMS"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="inline-block bg-white text-primary hover:text-white border-2 border-primary-light px-8 py-3 rounded font-medium hover:bg-primary-light hover:text-primary-light transition-colors"
              aria-label="Try the Growth LMS demo"
            >
              Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-background-alt py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Integrated Learning Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* External Integrations */}
            <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-primary-light mb-4">
                External Integrations
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Seamless Microsoft Teams integration</li>
                <li>• Built-in Zoom meeting support</li>
                <li>• Microsoft Whiteboard collaboration</li>
                <li>• Google Workspace compatibility</li>
              </ul>
            </div>

            {/* Communication Tools */}
            <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-primary-light mb-4">
                Interactive Communication
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Real-time chat messaging</li>
                <li>• Moderated student forums</li>
                <li>• Parent-teacher communication</li>
                <li>• Class announcements and updates</li>
              </ul>
            </div>

            {/* Smart Features */}
            <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-primary-light mb-4">
                Intelligent Learning
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Automated feedback systems</li>
                <li>• Quality assessment tools</li>
                <li>• Progress tracking analytics</li>
                <li>• Personalized learning paths</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* User Groups Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-light text-center mb-12">
            Designed for Everyone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Students */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary-light mb-4">
                For Students
              </h3>
              <p className="text-gray-600">
                Access course materials, participate in discussions, and track your progress with an intuitive interface designed for engaged learning.
              </p>
            </div>

            {/* Teachers */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary-light mb-4">
                For Teachers
              </h3>
              <p className="text-gray-600">
                Create and manage courses, assess student performance, and provide meaningful feedback with powerful teaching tools.
              </p>
            </div>

            {/* Parents */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary-light mb-4">
                For Parents
              </h3>
              <p className="text-gray-600">
                Stay involved in your child&apos;s education with real-time progress updates, direct communication with teachers, and activity monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Learning?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of schools already using Growth LMS to create engaging learning experiences.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-primary-light hover:bg-primary-light hover:text-white border-2 border-white px-8 py-3 rounded font-medium transition-colors"
            aria-label="Sign up for Growth LMS"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
