import { useEffect, useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';

const TableRows = (props: {
  apps: any;
  setisModelOpen: (isModelOpen: boolean) => void;
  setCurrentAppName: (currentAppName: string) => void;
}) => {
  const [message, setMessage] = useState('');

  const { apps, setisModelOpen, setCurrentAppName } = props;

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  }, [message]);

  return (
    <tr>
      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white text-lg">
          {apps.app_name}
        </h5>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark relative">
        <p className="text-black dark:text-white flex gap-2 border  border-stroke pr-2 rounded-lg">
          <input
            type="text"
            value={apps.api_key}
            className="w-full  p-2 focus:outline-none bg-white text-black dark:bg-boxdark dark:text-white"
            readOnly
          />
          <button
            className="text-black "
            onClick={() => {
              navigator.clipboard.writeText(apps.api_key).then(
                () => {
                  setMessage('Success');
                },
                () => {
                  setMessage('Failed');
                },
              );
            }}
          >
            {message ? (
              message === 'Success' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4  text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
              )
            ) : (
              <MdOutlineContentCopy />
            )}
          </button>
        </p>
      </td>

      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
        <div className="text-black dark:text-white font-bold">
          <button
            className="text-white bg-meta-1 hover:bg-meta-1/90  shadow-md    transition-colors px-2 py-1 rounded-md"
            onClick={() => {
              setisModelOpen(true);
              setCurrentAppName(apps.app_name);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRows;
