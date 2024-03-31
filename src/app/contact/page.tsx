"use client";

function Contact() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-800">
      <form className="w-1/4 h-auto flex flex-col gap-2 border-gray-500 border-2 p-6 rounded-xl text-white bg-gray-900 mt-20">
        <h1 className=" text-center text-xl hover:underline">
          How do you like the website?
        </h1>
        <div className="gap-8 flex flex-col">
          <input
            type="text"
            className="p-3 rounded-lg bg-black outline-none"
            placeholder="enter your email"
          />
          <textarea
            className="p-3 bg-black outline-none"
            rows={10}
            cols={10}
            placeholder="write your review here"
          />
        </div>
      </form>
    </div>
  );
}

export default Contact;
