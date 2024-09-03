import { Link } from 'react-router-dom';

import Hero from '../../images/home/hero.png';
import Logo from '../../images/logo/midfield-logo.png';

function HeroSection() {
  return (
    <>
      <nav
        id="header"
        className="fixed w-full z-30 top-0 text-white bg-gradient-to-r from-black to-black/50"
      >
        <div className="w-full container mx-auto flex items-center justify-between mt-0 py-2 ">
          <div className="pl-4 flex items-center justify-between">
            <img src={Logo} alt="logo" className="h-12" />
          </div>
          <div className="pr-4 py-2 hover:scale-105 transition-all">
            <Link
              to={'/auth/signin'}
              className="text-white bg-primary rounded-md px-6 py-3 text-lg font-medium shadow-default"
            >
              Sign in
            </Link>
          </div>
        </div>
        <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
      </nav>
      {/* --Hero-- */}
      <div className="pt-24">
        <div className="container px-3 mx-auto grid md:grid-cols-2 grid-cols-1   items-center">
          {/* --Left Col-- */}
          <div className="flex text-white flex-col w-full justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full">
              Welcome to MidField
            </p>
            <h1 className="my-4 lg:text-5xl text-4xl font-bold leading-tight w-full">
              Empower Your AI with Clean and Compliant Prompts
            </h1>
            <p className="leading-normal lg:text-2xl text-xl mb-8">
              Ensure your AI interactions remain professional, safe, and
              effective with our prompt validation package.
            </p>
            <Link
              to={'/auth/signin'}
              className="mx-auto md:mx-0 hover:underline text-black bg-white text-gray-800 font-bold rounded-md my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              Start Now
            </Link>
          </div>
          {/* --Right Col-- */}
          <div className="w-full text-center">
            <img className="w-full z-50" src={Hero} />
          </div>
        </div>
      </div>
      <div className="relative -mt-12 lg:-mt-24">
        <svg
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#FFFFFF"
              fillRule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
            <g
              transform="translate(-4.000000, 76.000000)"
              fill="#FFFFFF"
              fillRule="nonzero"
            >
              <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
            </g>
          </g>
        </svg>
      </div>
    </>
  );
}

export default HeroSection;
