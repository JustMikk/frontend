import {
  FaLinkedin,
  FaLinkedinIn,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Home = () => {
  return (
    <main className="w-full h-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row items-center justify-around px-28 py-28 gap-16">
        <img
          src="/images/register.jpg"
          className="w-[50%] rounded-full h-[40vh] object-cover md:px-20 shadow-2xl"
          alt=""
        />
        <div className="flex flex-col items-center justify-center">
          <p className="md:font-bold md:text-xl text-neutral-500">CSEC ASTU</p>
          <p className="md:px-14 py-8 text-center text-neutral-500">
            To facilitate the learning journey for novice students in C++, our
            tutorial provides a comprehensive guide. We cover fundamental
            concepts, syntax, and best practices, offering a solid foundation
            for mastering this programming language. Our aim is to empower fresh
            learners with the knowledge and skills necessary to navigate the
            intricacies of C++, setting them on a path to becoming successfull.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-around px-28 py-28 gap-16">
        <div className="flex flex-col items-center justify-center">
          <p className="md:font-bold md:text-xl text-neutral-500">CSEC ASTU</p>
          <p className="md:px-14 py-8 text-center text-neutral-500">
            To facilitate the learning journey for novice students in C++, our
            tutorial provides a comprehensive guide. We cover fundamental
            concepts, syntax, and best practices, offering a solid foundation
            for mastering this programming language. Our aim is to empower fresh
            learners with the knowledge and skills necessary to navigate the
            intricacies of C++, setting them on a path to becoming successfull.
          </p>
        </div>
        <img
          src="/images/register.jpg"
          className="w-[50%] rounded-full h-[40vh] object-cover md:mx-20 shadow-2xl"
          alt=""
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-around px-28 py-28 gap-16">
        <img
          src="/images/register.jpg"
          className="w-[50%] rounded-full h-[40vh] object-cover md:px-20 shadow-2xl"
          alt=""
        />
        <div className="flex flex-col items-center justify-center">
          <p className="md:font-bold md:text-xl text-neutral-500">CSEC ASTU</p>
          <p className="md:px-14 py-8 text-center text-neutral-500">
            To facilitate the learning journey for novice students in C++, our
            tutorial provides a comprehensive guide. We cover fundamental
            concepts, syntax, and best practices, offering a solid foundation
            for mastering this programming language. Our aim is to empower fresh
            learners with the knowledge and skills necessary to navigate the
            intricacies of C++, setting them on a path to becoming successfull.
          </p>
        </div>
      </div>
      <h1 className="text-center font-bold text-4xl">Achievements</h1>
      <div className="flex flex-col md:flex-row items-center justify-around px-28 py-28 gap-16">
        <img
          src="/images/achivement1.jpg"
          className=" rounded-full h-[50vh] object-cover md:mx-14 shadow-2xl"
          alt=""
        />
        <div className="flex flex-col items-center justify-center">
          <p className="md:font-bold md:text-xl text-neutral-500">
            Team Andalus
          </p>
          <p className="md:px-14 py-8 text-center text-neutral-500">
            Team Andalus, the historic trailblazers, have etched their names in
            the annals of achievement as the first-ever Ethiopian team to
            qualify for the World Finals! With boundless pride and joy, we
            extend a warm welcome to our victorious brothers. Your remarkable
            achievement serves as a beacon of inspiration for us all. Above all,
            you will be forever remembered as the pioneers—the First Team to
            secure a coveted spot in ACPC and the very First Team to grace The
            World Finals stage! Your journey is a testament to unwavering
            dedication, exceptional skill, and the indomitable spirit of
            overcoming challenges. Here's to Team Andalus, the architects of a
            new era in Ethiopian excellence!
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-10 items-center justify-center mb-10">
        <h2 className="text-xl text-neutral-600 font-semibold">
          Follow us on social media
        </h2>
        <div className="flex gap-6">
          <div className="flex items-center justify-center p-3 rounded-full bg-sky-100 text-blue-500 border-sky-500 hover:bg-sky-200 cursor-pointer transition delay-75">
            <FaLinkedin size="24" className="rounded-md" />
          </div>
          <div className="flex items-center justify-center p-3 rounded-full bg-rose-100 text-red-500 border-rose-500 hover:bg-rose-200 cursor-pointer transition delay-75">
            <FaYoutube size="24" />
          </div>
          <div className="flex items-center justify-center p-3 rounded-full bg-sky-100 text-blue-500 border-sky-500 hover:bg-sky-200 cursor-pointer transition delay-75">
            <FaTelegram size="24" />
          </div>
          <div className="flex items-center justify-center p-3 rounded-full bg-sky-100 text-blue-500 border-sky-500 hover:bg-sky-200 cursor-pointer transition delay-75">
            <FaTwitter size="24" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
