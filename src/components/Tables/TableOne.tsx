import React from 'react';

interface AppDetail {
  app_name: string;
  apikey: string;
  id: number;
  prompts_number: number;
  prompt_passed: number;
  prompt_failed: number;
}
interface TableOneProps {
  listOfApps: AppDetail[] | undefined;
}

const TableOne: React.FC<TableOneProps> = ({ listOfApps }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        App Details
      </h4>
      <div className=" max-w-full overflow-x-auto ">
        <table className=" w-full table-auto">
          <thead>
            <tr className=" rounded-sm bg-gray-2">
              <th className="xl:p-4 p-2.5 min-w-45">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  App Name
                </h5>
              </th>

              <th className=" text-center p-2.5 xl:p-4 ">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  API key
                </h5>
              </th>

              <th className="text-center xl:p-4 p-2.5 min-w-45 ">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Total Prompts
                </h5>
              </th>

              <th className=" p-2.5 text-center  xl:p-4 min-w-45">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Prompts Passed
                </h5>
              </th>

              <th className=" p-2.5 text-center  xl:p-4 min-w-45">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Prompts Failed
                </h5>
              </th>
            </tr>
          </thead>

          <tbody>
            {listOfApps?.map((apps: AppDetail, i) => (
              <tr
                className={` ${
                  //@ts-ignore
                  i === listOfApps.length - 1
                    ? ''
                    : 'border-b border-stroke dark:border-strokedark'
                }`}
                key={apps.id}
              >
                <td className="text-center p-2.5 xl:p-4">
                  <p className="text-black ">{apps.app_name}</p>
                </td>

                <td className="p-2.5 xl:p-4 max-w-60 break-words">
                  <p className="text-black">{apps.apikey}</p>
                </td>

                <td className=" text-center p-2.5 xl:p-4">
                  <p className="text-black">{apps.prompts_number}</p>
                </td>

                <td className=" text-center  p-2.5  xl:p-4">
                  <p className="text-black ">{apps.prompt_passed}</p>
                </td>

                <td className=" text-center p-2.5  xl:p-4">
                  <p className="text-black">{apps.prompt_failed}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOne;
