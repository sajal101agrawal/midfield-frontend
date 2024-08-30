import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useUser } from '../../Context/UserContext';
import { useCreateApp } from '../../Context/CreateApp';

const TableThree = (props: { appList: any }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [app_name, setApp_name] = useState('');
  const [new_name, setNew_name] = useState('');
  const { userData } = useUser();
  const { updateAppName, deleteApp } = useCreateApp();

  function handleUpdate() {
    if (userData) {
      updateAppName(userData.sub, userData.email, app_name, new_name);
    }
  }

  const { appList } = props;
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                App Name
              </th>
              <th className="min-w-[60px] py-4 px-4 font-medium text-black dark:text-white">
                API Key
              </th>
              <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">
                Last Refreshed Date
              </th>
              <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
                Last Used Date
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {appList.map((apps: any, key: any) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white text-lg">
                    {apps.app_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {apps.api_key.slice(0, 5)}...{apps.api_key.slice(-5)}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">-</div>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">-</div>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="text-black dark:text-white font-bold">
                    <button
                      className="text-white bg-meta-5  shadow-md   transition-colors px-2 py-1 rounded-md mr-1"
                      onClick={() => {
                        setIsEditOpen(true);
                        setApp_name(apps.app_name);
                        setNew_name(apps.app_name);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="text-white bg-meta-1  shadow-md    transition-colors px-2 py-1 rounded-md"
                      onClick={() => {
                        if (userData) {
                          deleteApp(
                            userData.sub,
                            userData.email,
                            apps.app_name,
                          );
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {isEditOpen && (
              <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-black/50 overflow-hidden">
                <div className="mb-4 relative rounded-lg p-4 bg-white w-full max-w-150 mx-2">
                  <IoClose
                    className="text-2xl absolute top-3 right-3 cursor-pointer"
                    onClick={() => {
                      setIsEditOpen(false);
                      setApp_name('');
                      setNew_name('');
                    }}
                  />
                  <label
                    htmlFor="app-name"
                    className="mb-3 block font-semibold text-black dark:text-white"
                  >
                    App Name
                  </label>
                  <input
                    type="text"
                    id="app-name"
                    value={new_name}
                    onChange={(e) => {
                      setNew_name(e.target.value);
                    }}
                    className="w-full max-w-150 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mb-4"
                    placeholder="Enter your app name"
                  />
                  <div className="flex gap-2 items-center">
                    <button
                      className="text-white bg-meta-5 hover:bg-meta-5/90 font-semibold  shadow-md   transition-colors px-2 py-1 rounded-md"
                      onClick={handleUpdate}
                    >
                      Submit
                    </button>
                    <button
                      className="text-black font-bold  transition-colors px-2 py-1 rounded-md"
                      onClick={() => {
                        setIsEditOpen(false);
                        setApp_name('');
                        setNew_name('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
