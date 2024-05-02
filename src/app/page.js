'use client'
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <div>
      <Header />
      <main>
        <section className='flex flex-col items-center justify-center'>
          <div className="flex items-center justify-between mt-8">
                        <button type="button" onClick={() => router.push('/sign-in')} className="bg-rose-700 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Schedule an Appointment</button>
                    </div>
          <div className='flex items-center justify-center my-12'>
            <h2 className='font-bold text-2xl'>
              Our Mission
            </h2>
          </div>
          <div className='flex items-center justify-center mt-4 h-full'>
            <div className='max-w-lg mr-32 bg-rose-900 rounded-lg'>
              <p className='text-white p-12 font-bold'>
                According to research conducted on college campuses nationwide, students often experience feelings of alienation
                and loneliness as they adjust to their new environments. Surveys of student experiences at LHU support these
                findings. As a result, the Center for Excellence and Inclusion has implemented a peer mentoring initiative. The
                Student Mentoring Program is designed to assist students in successfully navigating LHU. This includes connecting
                program participants with support services that have been provided for them, and the knowledge of how to access them.
              </p>
            </div>
            <div className='max-w-lg ml-32 bg-rose-900 rounded-lg'>
              <p className='text-white p-12 font-bold'>
                The purpose of this program is to enhance the students chances of academic success and to create a sense of
                belonging at the university. To facilitate this process, each entering first-year (mentee) is paired with an
                upper-class peer mentor. The CEI works with various campus entities to make Mentor/ Mentee assignments.
                Assignments are generally maintained throughout the students first semester at LHU. However, if mentor and mentee
                pairings are incompatible, students can be reassigned. Mentors are informed of their responsibilities through a
                pre-service training program. Meetings are conducted with mentors occasionally throughout the program to identify
                problems and address concerns. To determine program effectiveness and to make improvements mentors and mentees
                are asked to evaluate the program by completing a brief questionnaire at the end of the mentoring program.
              </p>
            </div>
          </div>
        </section>
        <section>
          <div>
            <h2>
              Meet the Team!
            </h2>
          </div>
          <div>
            <div>
              <h3>
                Polly
              </h3>
              <p>
                Short bio or role description.
              </p>
            </div>
            <div>
              <h3>
                Lexi
              </h3>
              <p>
                Short bio or role description.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
