import { IoArrowBackSharp } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateApp } from '../../Context/CreateApp';
import { useEffect, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import Validators from '../../components/EditApp/Validators';
import { useUser } from '../../Context/UserContext';

const EditApp: React.FC = function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getAppDetails, appDetails, isLoading, error, updateAppDetails } =
    useCreateApp();
  const [appName, setAppName] = useState(appDetails?.app_name || '');
  const [associated_validators, setAssociated_Validators] = useState(
    appDetails?.associated_validators || [],
  );
  const [isModelOpen, setisModelOpen] = useState(false);
  const { userData } = useUser();
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState<string | null>(null);

  useEffect(() => {
    if (isUpdateError) {
      setTimeout(() => {
        setIsUpdateError(null);
      }, 3000);
    }
  }, [isUpdateError]);

  useEffect(() => {
    if (id) {
      getAppDetails(id);
    }
  }, [getAppDetails, id]);

  useEffect(() => {
    if (appDetails) {
      setAppName(appDetails.app_name || '');
      setAssociated_Validators(appDetails?.associated_validators || []);
    }
  }, [appDetails]);

  const removeValidator = (index: number) => {
    const newValidators = [...associated_validators];
    newValidators.splice(index, 1);
    setAssociated_Validators(newValidators);
  };

  const handleUpdate = async () => {
    setIsUpdateLoading(true);
    try {
      const argValidators = associated_validators.map((v) => {
        return {
          validator_codename: v.validator.codename,
          parameters: v.parameters,
        };
      });

      if (!userData || !appDetails || !id || !appDetails.apikey) return;
      await updateAppDetails(
        id,
        userData?.sub,
        userData?.email,
        appDetails?.apikey,
        argValidators,
      );
    } catch (error: any) {
      setIsUpdateError(error.message);
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="bg-white shadow-default mb-4 p-4">
        <div className="mb-4">
          <div className="text-2xl mb-2  flex items-center gap-2">
            <IoArrowBackSharp
              className="text-black cursor-pointer"
              onClick={() => navigate(-1)}
            />

            <h1 className="font-bold text-black text-2xl ">App Details</h1>
          </div>
          <p className="text-sm">
            <strong>Welcome to the Edit App page!</strong> <br /> Here, you can
            update and manage various details about your app to keep it current
            and aligned with your goals.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="bg-white shadow-default mb-4 p-4">
          <p className="text-black font-bold text-center">
            Please Wait... Loading App Details for you!
          </p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="bg-white shadow-default p-4">
          <div className="mb-4">
            <label
              htmlFor="app-name"
              className="mb-3 block font-semibold text-black dark:text-white"
            >
              App Name
            </label>
            <input
              type="text"
              id="app-name"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full max-w-150 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mb-2"
              placeholder="Enter your app name"
            />
          </div>
          <div>
            <div className="flex justify-between gap-2 items-center mb-3">
              <h2 className="text-black font-bold">Associate Validators</h2>
              <button
                className="bg-meta-5 hover:bg-opacity-90 transition-all flex-shrink-0 text-white px-3 rounded-sm py-2 shadow-default font-semibold"
                onClick={() => setisModelOpen(true)}
              >
                + Add Validators
              </button>
            </div>

            <div className="w-full overflow-x-auto mb-3 border border-stroke">
              <table className="w-full table-auto">
                <thead>
                  <tr className="rounded-sm bg-gray-2">
                    <th className="xl:p-4 p-2.5">Code</th>
                    <th className="xl:p-4 p-2.5">Name</th>
                    <th className="xl:p-4 p-2.5 max-w-75">Discription</th>
                    <th className="xl:p-4 p-2.5 min-w-fit">Parameters</th>
                    <th className="xl:p-4 p-2.5 min-w-fit">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {associated_validators.map((value, i) => (
                    <tr
                      key={i}
                      className={`rounded-sm ${
                        i === associated_validators.length - 1
                          ? ''
                          : 'border-b border-stroke'
                      }`}
                    >
                      <td className="xl:p-4 p-2.5 text-center">
                        {value?.validator?.codename}
                      </td>
                      <td className="xl:p-4 p-2.5">{value?.validator.name}</td>
                      <td className="xl:p-4 p-2.5 min-w-75 max-w-100">
                        {value?.validator.descriptions}
                      </td>
                      <td className="xl:p-4 p-2.5">
                        {Object.keys(value?.parameters)[0]}
                      </td>
                      {/* <td className="xl:p-4 p-2.5 text-nowrap text-center ">
                        Lorem, ipsum.
                      </td> */}
                      <td className="xl:p-4 p-2.5 text-nowrap text-center">
                        <button onClick={() => removeValidator(i)}>
                          <MdDeleteOutline className="text-red-500 text-2xl cursor-pointer mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isUpdateError && (
              <div className="text-red-500 font-bold mb-2">{isUpdateError}</div>
            )}
            <div className="flex item-center gap-4">
              <button
                className="bg-meta-5 hover:bg-opacity-90 transition-all flex-shrink-0 text-white px-3 rounded-sm py-2 shadow-default font-semibold"
                onClick={handleUpdate}
                disabled={isUpdateLoading}
              >
                {isUpdateLoading ? 'Updating...' : 'Update App'}
              </button>
              <button
                className="text-black font-bold  uppercase"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isModelOpen && (
        <div className=" bg-white min-h-screen z-10 w-full absolute top-0 left-0">
          <Validators
            setisModelOpen={setisModelOpen}
            associated_validators={associated_validators}
            setAssociated_Validators={setAssociated_Validators}
          />
        </div>
      )}
    </div>
  );
};

export default EditApp;
