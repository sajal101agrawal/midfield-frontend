import { useEffect, useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';

const TableRows = (props: {
  apps: any;
  key: any;
  setisModelOpen: any;
  setCurrentAppName: any;
}) => {
  const [message, setMessage] = useState('');

  const { apps, key, setisModelOpen, setCurrentAppName } = props;

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }, [message]);

  return (
    <tr key={key}>
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
                  setMessage('Text copied to clipboard!');
                },
                () => {
                  setMessage('Failed to Copy Text, Try Again!');
                },
              );
            }}
          >
            <MdOutlineContentCopy />
          </button>
        </p>
        {message && (
          <p
            className={`text-black dark:text-white font-bold text-center absolute bottom-0 left-2/4 -translate-x-2/4 ${
              message === 'Failed to Copy Text, Try Again!'
                ? 'text-red-500'
                : 'text-green-500'
            }`}
          >
            Text copied to clipboard!
          </p>
        )}
      </td>

      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
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
