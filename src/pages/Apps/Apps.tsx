import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import TableThree from '../../components/Tables/TableThree';
import { useCreateApp } from '../../Context/CreateApp';
import { useEffect } from 'react';
import { useUser } from '../../Context/UserContext';

const Apps: React.FC = () => {
  const { appList, isLoading, error, getAllApps } = useCreateApp();
  const { userData } = useUser();

  useEffect(() => {
    if (!userData) return;
    getAllApps(userData.sub, userData.email);
  }, [getAllApps]);

  return (
    <section className="w-full">
      <div className="w-full min-h-[100vh] mx-auto ">
        <div className="mb-10 bg-white shadow-default  p-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold  text-black">Your Apps</h1>
            <Link
              to="create_new_app"
              className={`text-white bg-meta-5 hover:bg-opacity-90 shadow-md  transition-colors px-2 py-1 rounded-sm font-semibold `}
            >
              + Create new app
            </Link>
          </div>
          <p className="mb-4">
            To securely access our services and authenticate your identity, you
            need to generate and use an API key. This key acts as a secure token
            that verifies your identity and permissions when interacting with
            our API. Follow these detailed instructions to generate, manage, and
            use your API key effectively.
          </p>
          <p className="mb-2">
            <span className="font-semibold">
              <RiErrorWarningFill
                size={20}
                className="inline-block mr-1 -mt-1"
              />
              Do Not share your API key with anyone;
            </span>{' '}
            We regulerly check your API key for any suspicious activity.
          </p>
        </div>

        {isLoading && (
          <div className="border border-stroke rounded-lg h-32 shadow-default bg-stroke/60 flex justify-center items-center ">
            <p className="text-black font-bold">Table Loading...</p>
          </div>
        )}

        {!isLoading &&
          error &&
          error !== 'user doesnt have any apps created' && (
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
                    getAllApps(userData.sub, userData.email);
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
          )}

        {!isLoading && error === 'user doesnt have any apps created' && (
          <div className="border border-stroke rounded-lg h-32 bg-stroke/60 flex justify-center items-center ">
            <p className="text-black font-bold">
              No app is created, Please create an app.
            </p>
          </div>
        )}

        {appList?.length > 0 && !isLoading && !error && (
          <TableThree appList={appList} />
        )}
      </div>
    </section>
  );
};

export default Apps;
