import { useEffect, useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { Link } from 'react-router-dom';

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
              <MdOutlineContentCopy aria-description="Copy button" />
            )}
          </button>
        </p>
      </td>

      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
        <div className="text-black dark:text-white font-bold flex justify-center items-center gap-1">
          <Link
            to={`edit_app/${apps.app_name.replaceAll(' ', '_')}/${
              apps.unique_id
            }`}
            className="shadow-md text-white bg-meta-3 hover:bg-opacity-90 transition-colors p-1 rounded-sm"
            aria-details="Edit app button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </Link>
          <button
            className="text-white bg-meta-1 hover:bg-meta-1/90  shadow-md    transition-colors p-1 rounded-sm"
            aria-details="Delete App Button"
            onClick={() => {
              setisModelOpen(true);
              setCurrentAppName(apps.app_name);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRows;
