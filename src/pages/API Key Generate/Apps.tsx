import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import TableThree from '../../components/Tables/TableThree';
import { useCreateApp } from '../../Context/CreateApp';
import { useEffect } from 'react';
import { useUser } from '../../Context/UserContext';
import { TbReload } from 'react-icons/tb';

const Apps: React.FC = () => {
  const { appList, isLoading, error, getAllApps } = useCreateApp();
  const { userData } = useUser();

  useEffect(() => {
    if (!userData) return;
    getAllApps(userData.sub, userData.email);
  }, [getAllApps]);

  return (
    <section className="w-full">
      <div className="w-full min-h-[100vh] mx-auto bg-white p-4">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold  text-black">Your Apps</h1>
            <Link
              to="create_new_app"
              className={`text-white bg-boxdark border shadow-md  border-graydark  transition-colors px-2 py-1 rounded-md `}
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
          <p className="mb-6">
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
          <div className="border border-stroke rounded-lg h-32 bg-stroke/60 flex justify-center items-center ">
            <p className="text-black font-bold">Table Loading...</p>
          </div>
        )}

        {error && (
          <div className="mx-2">
            <p className="text-center text-red-500  mt-4 mb-2 font-bold">
              {error}
            </p>
            <button
              className=" border flex gap-2 mx-auto items-center border-stroke bg-white text-black rounded-md font-semibold shadow-3 px-2 py-1"
              onClick={() => {
                if (userData) getAllApps(userData.sub, userData.email);
              }}
            >
              <TbReload className="text-2xl" /> Reload Validators
            </button>
          </div>
        )}

        {appList?.length === 0 && !isLoading && !error && (
          <div className="border border-stroke rounded-lg h-32 bg-stroke/60 flex justify-center items-center ">
            <p className="text-black font-bold">
              You currently do not have an API key. Please create a new one.
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
