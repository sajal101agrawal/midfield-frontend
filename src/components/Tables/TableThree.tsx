import { useState } from 'react';
import TableRows from './TableRow';
import { useUser } from '../../Context/UserContext';
import { useCreateApp } from '../../Context/CreateApp';
import { RiErrorWarningLine } from 'react-icons/ri';

const TableThree = (props: { appList: any }) => {
  const [isModelOpen, setisModelOpen] = useState(false);
  const { userData } = useUser();
  const { deleteApp } = useCreateApp();
  const [currentAppName, setCurrentAppName] = useState('');

  const handleDelete = () => {
    if (userData) {
      deleteApp(userData.sub, userData.email, currentAppName);
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

                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
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
      <div className="w-screen h-screen fixed top-0 left-0 right-0 bg-black/50 z-50 flex justify-center items-center">
        <div className=" max-w-[350px] w-full bg-white shadow-md ">
          <RiErrorWarningLine />
          <h1>Are You sure you want to delete {currentAppName}</h1>
        </div>
      </div>
    </>
  );
};

export default TableThree;
