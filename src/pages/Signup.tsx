const Signup = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex my-[18vh] md:my-[10vh] px-6 py-16 bg-white w-[80vw] md:w-[65vw] lg:w-[50vw] shadow-2xl rounded-3xl">
        <img
          src="/images/register.jpg"
          className=" hidden md:flex w-[40%]"
          alt=""
        />
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <form action="" className="flex flex-col gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border py-2 px-4 rounded-lg outline-none focus:border-blue-500"
            />
            <button
              className="w-80 bg-black text-white rounded-full py-2 font-semibold"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
