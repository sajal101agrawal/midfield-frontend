import { useCallback, useEffect, useState } from 'react';

interface ValidatorElProps {
  validator: {
    name: string;
    descriptions: string;
    codename: number;
    parameters: any;
  };
  selectedValidators: number[];
  setSelectedValidators: (selectedValidators: number[]) => void;
}

const ValidatorEl: React.FC<ValidatorElProps> = ({
  validator,
  selectedValidators,
  setSelectedValidators,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    // const codename = validator.codename;
    if (selectedValidators.includes(validator.codename)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [selectedValidators]);

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const isCheckedNow = e.target.checked;
      const value = Number(e.target.value);
      // @ts-ignore
      setSelectedValidators((selectedValidators: number[]) => {
        if (isCheckedNow) {
          return [...selectedValidators, value];
        } else {
          return selectedValidators.filter((v) => v !== value);
        }
      });
    },
    [setSelectedValidators],
  );

  return (
    <div className="bg-white p-4 rounded-lg select-none  border border-stroke shadow-2">
      <div className="flex  justify-between items-center gap-2">
        <h3 className="text-lg font-semibold line-clamp-1 break-words overflow-hidden">
          {validator.name}
        </h3>
        <label
          htmlFor={`checkbox-${validator.name}`}
          className="flex items-center gap-1 py-1 px-2 rounded-lg font-bold border border-stroke cursor-pointer"
        >
          Select
          <input
            id={`checkbox-${validator.name}`}
            type="checkbox"
            value={validator.codename}
            className="sr-only"
            onChange={(e) => handleCheck(e)}
            checked={isChecked}
          />
          <div
            className={` flex h-5 w-5 items-center justify-center rounded border ${
              isChecked && 'border-primary bg-gray dark:bg-transparent'
            }`}
          >
            <span className={`opacity-0 ${isChecked && '!opacity-100'}`}>
              <svg
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                  fill="#3056D3"
                  stroke="#3056D3"
                  strokeWidth="0.4"
                ></path>
              </svg>
            </span>
          </div>
        </label>
      </div>
      <p>{validator.descriptions}</p>
    </div>
  );
};

export default ValidatorEl;
