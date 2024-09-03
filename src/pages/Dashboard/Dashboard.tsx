import React, { useEffect } from 'react';
import CardDataStats from '../../components/CardDataStats';
import TableOne from '../../components/Tables/TableOne';
import { useUser } from '../../Context/UserContext';
import { useDashboard } from '../../Context/DashboardContext';
import Loader from '../../common/Loader';

const Dashboard: React.FC = () => {
  const { userData } = useUser();
  const { getDashboardAppAnalytics, isLoading, error, dashboardData } =
    useDashboard();

  useEffect(() => {
    if (!userData) return;
    getDashboardAppAnalytics(userData.sub, userData.email);
  }, []);

  console.log(dashboardData);

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className=" text-center font-bold text-meta-1 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default ">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          <span>{error}</span>
        </div>
        <button
          className=" shadow-default border bg-[#00BDD6] text-white border-stroke rounded-sm hover:bg-stroke transition-all p-2 flex gap-2 mx-auto"
          onClick={() => {
            if (userData) {
              getDashboardAppAnalytics(userData.sub, userData.email);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Reload
        </button>
      </div>
    );

  return (
    <>
      <div className=" rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default">
        <div className="flex items-center gap-2 ">
          <img
            src={dashboardData?.profile_url}
            alt="User Profile Image"
            className="rounded-full h-12 w-12"
          />
          <div>
            <p className="text-black font-bold text-xl">
              {dashboardData?.name}
            </p>
            <p className="col-start-2 row-start-2">{dashboardData?.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 px-5 py-6  shadow-default bg-white">
        <h1 className="text-2xl  mb-4 sm:px-7.5 font-bold  text-black ">
          Overall Statistics
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 2xl:gap-7.5">
          <CardDataStats
            data={dashboardData?.app_details?.total_prompts}
            title="Total Prompts"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-16 text-meta-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
              />
            </svg>
          </CardDataStats>
          <CardDataStats
            data={dashboardData?.app_details?.total_prompt_passed}
            title="Total Prompts Passed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-16 text-meta-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </CardDataStats>
          <CardDataStats
            data={dashboardData?.app_details?.total_prompt_failed}
            title="Total Prompts Failed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-16 text-meta-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </CardDataStats>
        </div>
      </div>

      <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="w-full">
          <TableOne listOfApps={dashboardData?.app_details.list_of_apps} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
