import { useEffect, useState } from 'react';
import TableRows from './TableRow';
import { useUser } from '../../Context/UserContext';
import { useCreateApp } from '../../Context/CreateApp';
import { IoClose } from 'react-icons/io5';

const TableThree = (props: { appList: any }) => {
  const [isModelOpen, setisModelOpen] = useState(false);
  const { userData } = useUser();
  const { deleteApp } = useCreateApp();
  const [currentAppName, setCurrentAppName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorDelete, setErrorDelete] = useState('');

  useEffect(() => {
    if (errorDelete) {
      setTimeout(() => {
        setErrorDelete('');
      }, 3000);
    }
  }, [errorDelete]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      if (userData) {
        await deleteApp(userData.sub, userData.email, currentAppName);
        setCurrentAppName('');
        setisModelOpen(false);
      }
    } catch (error: any) {
      setErrorDelete(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const { appList } = props;

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  App Name
                </th>
                <th className="min-w-[350px] py-4 px-4 font-medium text-black dark:text-white">
                  API Key
                </th>

                <th className="min-w-[150px] py-4 px-4 text-center font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {appList.map((apps: any, key: any) => (
                <TableRows
                  key={key}
                  apps={apps}
                  setisModelOpen={setisModelOpen}
                  setCurrentAppName={setCurrentAppName}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModelOpen && (
        <div className="w-screen h-screen fixed top-0 left-0 right-0 bg-black/50 z-50 flex justify-center items-center">
          <div className=" max-w-[350px] w-full bg-white shadow-md p-2 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl text-black font-bold">Confirm Delete</h1>
              <IoClose
                className="cursor-pointer text-2xl text-black font-bold"
                onClick={() => {
                  setCurrentAppName('');
                  setisModelOpen(false);
                }}
              />
            </div>
            <p className="mb-4 border-t border-b border-stroke py-2">
              Are You sure you want to delete {currentAppName}
            </p>

            <div className="flex gap-3 justify-end">
              <button
                className="border border-stroke  text-black py-2 px-3 bg-gray-2 rounded-sm"
                onClick={() => {
                  setCurrentAppName('');
                  setisModelOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="border border-stroke bg-red-500 text-white py-2 px-3 rounded-sm"
                onClick={handleDelete}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
            {errorDelete && (
              <p className="text-red-500 text-center font-bold mt-2">
                {errorDelete}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TableThree;
