import Layout from "../layout/layout";

// What We Need
const About = () => {
  return (
    <Layout>
      <main className="w-full h-full flex flex-col gap-8">
        <div className="mt-24 mb-16 text-center font-bold text-3xl sm:text-4xl md:text-5xl">
          What We Need
        </div>
        <div className="flex flex-col mt-5 gap-y-20 justify-center mb-20 ">
          <div className="flex flex-col md:flex-row w-full items-center justify-center gap-6">
            <img
              src="/images/problem.jpg"
              className=" w-88 px-14 md:px-0 md:w-[40vw] text-center"
              alt=""
            />
            <div className="flex flex-col gap-4 justify-start px-5">
              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
                Problem Solving Skill
              </h1>
              <p className="text-md sm:text-lg md:text-xl text-neutral-500 w-[80vw] md:w-[30vw]">
                While our students possess impressive talents, they are in the
                crucial phase of gaining hands-on experience. If you excel in
                problem-solving and have the relevant skills to guide us on our
                journey, your valuable mentorship can significantly contribute
                to our collective success.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full items-center justify-center gap-6">
            <div className="flex flex-col gap-4 justify-start px-5">
              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
                Mentorships
              </h1>
              <p className="text-md sm:text-lg md:text-xl text-neutral-500 w-[80vw] md:w-[30vw]">
                Our students showcase remarkable talents, yet crave real-world
                experience. If you possess the relevant skills to shape their
                journey, consider offering mentorships. Your guidance can bridge
                the gap between potential and proficiency.
              </p>
            </div>
            <img
              src="/images/mentorship.jpg"
              className=" w-88 md:w-[40vw] text-center"
              alt=""
            />
          </div>

          <div className="flex flex-col md:flex-row w-full items-center justify-center gap-6">
            <img
              src="/images/qa.jpg"
              className=" w-88 px-14 md:px-0 md:w-[40vw] text-center"
              alt=""
            />
            <div className="flex flex-col gap-4 justify-start px-5">
              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
                Q&A
              </h1>
              <p className="text-md sm:text-lg md:text-xl text-neutral-500 w-[80vw] md:w-[30vw]">
                Our students benefit greatly from engaging with experts across
                diverse fields. By sharing your intriguing stories and
                experiences, you can support us as a featured Q&A guest and
                contribute to their learning journey.
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default About;
