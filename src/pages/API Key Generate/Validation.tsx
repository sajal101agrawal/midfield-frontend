import React, { useEffect, useState } from 'react';
import ValidatorEl from '../../components/API Key Validator/ValidatorEL';
import { useUser } from '../../Context/UserContext';
import { useCreateApp } from '../../Context/CreateApp';
import { IoArrowBackSharp } from 'react-icons/io5';
import { FaRegCopy } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { MdKey } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useValidators } from '../../Context/ValidatorsContext';

const Validation: React.FC = () => {
  const [appName, setAppName] = useState('');
  const [message, setMessage] = useState<any | ''>('');
  const [isModelOpen, setisModelOpen] = useState(false);
  const [selectedValidators, setSelectedValidators] = useState<number[]>([]);
  const [InputValidation, setInputValidation] = useState({
    name: false,
    selectedValidators: false,
  });

  const { userData } = useUser();
  const { createApp, isLoading, error, APIData, setError } = useCreateApp();
  const {
    getAllValidators,
    validators,
    isLoading: isLoadingValidators,
    error: errorValidators,
  } = useValidators();

  const navigate = useNavigate();

  useEffect(() => {
    if (validators.length > 0) return;
    getAllValidators();
  }, [getAllValidators]);

  useEffect(() => {
    if (selectedValidators.length !== 0) {
      //@ts-ignore
      setInputValidation((InputValidation) => ({
        ...InputValidation,
        selectedValidators: false,
      }));
    }
  }, [selectedValidators]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const updateInputValidation = {
      name: appName === '' ? true : false,
      selectedValidators: selectedValidators.length === 0 ? true : false,
    };

    setInputValidation(updateInputValidation);

    if (updateInputValidation.name || updateInputValidation.selectedValidators)
      return;

    if (userData) {
      createApp(
        userData.sub,
        userData.email,
        appName,
        selectedValidators,
        setisModelOpen,
      );
    }
  };

  return (
    <>
      <div className=" w-full mx-auto  ">
        <div className="bg-white p-2 xsm:p-4">
          <div className="text-2xl mb-4 flex items-center gap-2">
            <IoArrowBackSharp
              className="text-black cursor-pointer"
              onClick={() => navigate(-1)}
            />

            <h1 className="font-bold text-black ">Create New App</h1>
          </div>
          <div className="mb-4 rounded-lg p-2">
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
              onChange={(e) => {
                setAppName(e.target.value);
                setError(null);
                setInputValidation((InputValidation) => ({
                  ...InputValidation,
                  name: false,
                }));
              }}
              className="w-full max-w-150 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mb-2"
              placeholder="Enter your app name"
            />
          </div>

          <div>
            <h3 className="font-bold text-black mx-2">Validators</h3>
          </div>
          {errorValidators && !isLoadingValidators && (
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
                  getAllValidators();
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
          {isLoadingValidators && !errorValidators ? (
            <p className="text-center mt-4 font-semibold mx-2">
              Loading Validators...
            </p>
          ) : (
            <>
              <div className=" py-4 grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mx-2">
                {validators.map((validator) => (
                  <ValidatorEl
                    validator={validator}
                    setSelectedValidators={setSelectedValidators}
                    selectedValidators={selectedValidators}
                    key={validator.codename}
                  />
                ))}
              </div>

              {error && (
                <p className=" text-red-500  mt-2 mb-2 pl-2 font-bold">
                  {error}
                </p>
              )}

              {InputValidation.name && (
                <p className=" text-red-500  mt-2 mb-2 pl-2 font-bold">
                  Please Enter App Name First
                </p>
              )}

              {InputValidation.selectedValidators && !InputValidation.name && (
                <p className=" text-red-500  mt-2 mb-2 pl-2 font-bold">
                  Please Select any one Validator
                </p>
              )}

              {validators.length !== 0 && (
                <div className="flex gap-4 p-2">
                  <button
                    type="submit"
                    className="bg-primary shadow-4 hover:bg-opacity-90 text-white font-bold py-1 px-4 uppercase  rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create'}
                  </button>
                  <button
                    type="reset"
                    className="text-black font-bold uppercase"
                    onClick={() => {
                      setAppName('');
                      setSelectedValidators([]);
                      setError(null);
                      navigate(-1);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {isModelOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-black/50 overflow-hidden">
          <div className=" bg-white shadow-4   rounded-lg overflow-hidden w-full max-w-150 ">
            <div className="bg-gray p-2 flex justify-between">
              <h1 className=" font-extrabold text-black flex items-center gap-2">
                <MdKey className="text-2xl" />
                Save your API key
              </h1>
              <IoClose
                className="text-2xl"
                onClick={() => {
                  setisModelOpen(false);
                  navigate(`/dashboard/apps`);
                }}
              />
            </div>
            <div className="p-4">
              <p className="mb-4">
                Save your API key Somewhere safe.
                <span className="font-bold text-black">
                  You will not be able to see it again after you close this
                  model.
                </span>{' '}
                If you loose it you will have to request for it or create a new
                one.
              </p>
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  readOnly
                  value={APIData?.api_key}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <button
                  className="flex font-bold font-white p-3 cursor-pointer hover:bg-black/90  rounded-lg gap-2 items-center  bg-black text-white"
                  onClick={() =>
                    navigator.clipboard.writeText(`${APIData?.api_key}`).then(
                      () => {
                        setMessage('Text copied to clipboard!');
                      },
                      (err) => {
                        setMessage('Failed to copy text: ' + err);
                      },
                    )
                  }
                >
                  <FaRegCopy />
                  Copy
                </button>
              </div>
              <div className="flex items-center">
                <p
                  className={` font-bold w-full text-center ${
                    message === 'Text copied to clipboard!'
                      ? 'text-success'
                      : 'text-red-500'
                  }`}
                >
                  {message}
                </p>
                <button
                  className="bg-gray shadow-4 hover:bg-opacity-90  font-bold py-2 px-4 text-sm rounded focus:outline-none focus:shadow-outline mt-4"
                  onClick={() => {
                    setisModelOpen(false);
                    navigate(`/dashboard/apps`);
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Validation;
