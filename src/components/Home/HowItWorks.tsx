function HowItWorks() {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto flex flex-wrap pt-4 pb-12">
        <h2 className="w-full my-2 lg:text-5xl text-4xl font-bold leading-tight text-center text-gray-800">
          How It Works
        </h2>
        <div className="w-full  md:w-1/3 p-6 flex flex-col flex-grow flex-shrink ">
          <div className="flex-1  bg-white rounded-md overflow-hidden py-12  shadow  border border-stroke">
            <a
              href="#"
              className="flex flex-wrap no-underline hover:no-underline"
            >
              <p className="w-full text-gray-600 text-xs md:text-sm px-6"></p>
              <div className="w-full font-bold text-xl text-gray-800 px-6 text-center mt-2 mb-3">
                Get Your Free API Key
              </div>
              <p className="text-gray-800 text-base px-6 mb-5 text-center w-[-webkit-fill-available]">
                Sign up and receive your free API key.
              </p>
            </a>
          </div>
        </div>
        <div className="w-full   md:w-1/3 p-6 flex flex-col flex-grow flex-shrink  ">
          <div className="flex-1   bg-white rounded-md overflow-hidden py-12 shadow border border-stroke">
            <a
              href="#"
              className="flex flex-wrap no-underline hover:no-underline "
            >
              <div className="w-full font-bold text-xl text-gray-800 px-6 text-center mt-2 mb-3">
                Integrate in Minutes
              </div>
              <p className="text-gray-800 text-base px-6 mb-5 text-center w-[-webkit-fill-available]">
                Follow our simple documentation to integrate Midfield into your
                Python environment.
              </p>
            </a>
          </div>
        </div>
        <div className="w-full  md:w-1/3 p-6 flex flex-col flex-grow flex-shrink ">
          <div className="flex-1  bg-white rounded-md overflow-hidden py-12  shadow border border-stroke">
            <a
              href="#"
              className="flex flex-wrap no-underline hover:no-underline"
            >
              <p className="w-full text-gray-600 text-xs md:text-sm px-6"></p>
              <div className="w-full font-bold text-xl text-gray-800 px-6 text-center mt-2 mb-3">
                Validate Prompts
              </div>
              <p className="text-gray-800 text-base px-6 mb-5 text-center w-[-webkit-fill-available]">
                Start validating prompts and maintain the quality of your AI
                conversations.
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
