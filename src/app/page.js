'use client'
import Footer from "./components/Footer";
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.removeItem('UserID');
    }, 1000);

    router.push('/');

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div>
      <div className="bg-stone-950 h-24 mb-1 flex items-center">
        <img src="/lhu_logo_wht.png"alt="LHU Logo" className="h-5/6 ml-14"/>
      </div>
      <div className=" p-12 bg-rose-900">
        <div className="text-left ml-36 text-white text-5xl font-bold inline-block">Peer Mentor Program</div>
        <div className="text-left ml-36 mt-2 text-rose-100 text-sm block">Center for Excellence and Inclusion</div>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className="flex items-center justify-between mt-8">
          <button type="button" onClick={() => router.push('/sign-in')} className="bg-rose-700 hover:bg-rose-900 text-white font-bold py-2 px-4 w-72 rounded-full focus:outline-none focus:shadow-outline">Schedule an Appointment</button>
        </div>
        <div className="mx-auto mt-12 w-8/12">
          <div className='text-left font-bold text-3xl text-stone-600'>Our Mission</div>
          <div className="pt-12 text-stone-600 text-justify font-light">
            <img src="/mentor_stock.jpg"alt="LHU Logo" className="w-5/12 float-right ml-10 mb-4 outline outline-rose-900 outline-4"/>
            <p>
              According to research conducted on college campuses nationwide, students often experience feelings of alienation
              and loneliness as they adjust to their new environments. Surveys of student experiences at LHU support these
              findings. As a result, the Center for Excellence and Inclusion has implemented a peer mentoring initiative. The
              Student Mentoring Program is designed to assist students in successfully navigating LHU. This includes connecting
              program participants with support services that have been provided for them, and the knowledge of how to access them.
            </p>
            <p className='mt-8'>
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
          <div className='text-left font-bold text-3xl text-stone-600 mt-12'>Meet the Team!</div>
          <div className="pt-12 text-stone-600 text-justify">
            <div>
              <img src="/blank_profile.png"alt="LHU Logo" className="w-1/6 outline outline-rose-900 outline-4 float-left mr-10"/>
              <h3 className="text-2xl font-bold text-stone-500">Polly Canete</h3>
              <p className="text-md">Physician Assistant Graduate Student. Ive been working for Act101 since 2021 my sophomore year. 
              What I enjoy most about the job is seeing my mentees progress closer to graduation and develop to be mature, amazing human beings</p>
            </div>
            <div className="clear-left"></div>
            <div className="mt-12">
              <img src="/blank_profile.png"alt="LHU Logo" className="w-1/6 outline outline-rose-900 outline-4 float-left mr-10"/>
              <h3 className="text-2xl font-bold text-stone-500">Lexi Grier</h3>
              <p className="text-md">Social Work, my career goal is to help people like my parents so that they can see a future for themselves outside of addiction.
              My favorite part about Act101 mentoring is meeting new people and helping students get through college.</p>
            </div>
            <div className="clear-left"></div>
            <div className="mt-12">
              <img src="/blank_profile.png"alt="LHU Logo" className="w-1/6 outline outline-rose-900 outline-4 float-left mr-10"/>
              <h3 className="text-2xl font-bold text-stone-500">Angel Mandoza</h3>
              <p className="text-md">Computer Science, I joined Act101 because I was once a mentee and saw the amount of good I could do for this program. 
              The best part about mentoring is being a resource that mentees can depend on, like my mentor was to me.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
