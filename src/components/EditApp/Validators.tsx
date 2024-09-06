import { useEffect, useState } from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useValidators } from '../../Context/ValidatorsContext';
import Loader from '../../common/Loader';
import ValidatorEl2 from '../API Key Validator/ValidatorsEL2';

interface ValidatorsProps {
  associated_validators: any[];
  setAssociated_Validators: (associated_validators: any[]) => void;
  setisModelOpen: (isModelOpen: boolean) => void;
}
const Validators: React.FC<ValidatorsProps> = ({
  setisModelOpen,
  associated_validators,
  setAssociated_Validators,
}) => {
  const [selectedValidators, setSelectedValidators] = useState<number[]>([]);
  const [filteredValidators, setFilteredValidators] = useState<any[]>([]);

  const {
    getAllValidators,
    validators,
    isLoading: isLoadingValidators,
    error: errorValidators,
  } = useValidators();

  useEffect(() => {
    if (validators.length > 0) return;
    getAllValidators();
  }, [getAllValidators]);

  useEffect(() => {
    if (validators.length > 0) {
      const excludeCodeName = new Set(
        associated_validators.map((v: any) => v.validator.codename),
      );

      const filteredValidators = validators.filter(
        (v) => !excludeCodeName.has(v.codename),
      );
      setFilteredValidators(filteredValidators);
    }
  }, [validators]);

  function handleAddValidator(validators: any) {
    const values = validators.filter((v: any) =>
      selectedValidators.includes(v.codename),
    );

    values.forEach((value: any) => {
      delete value.parameters;
    });

    const valueSubmit = values.map((value: any) => {
      return {
        validator: value,
        parameters: {},
      };
    });
    //@ts-ignore
    setAssociated_Validators((prev) => [...prev, ...valueSubmit]);
    setisModelOpen(false);
  }

  if (isLoadingValidators) return <Loader />;

  if (!isLoadingValidators && errorValidators)
    return (
      <div className=" text-center  font-bold text-meta-1 rounded-sm  bg-white py-6 px-7.5 ">
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
          <span>{errorValidators}</span>
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
    );

  return (
    <div className="bg-white  mb-4 p-4">
      <div className="mb-4">
        <div className="text-2xl mb-2 border-b border-stroke pb-2 flex items-center gap-2">
          <IoArrowBackSharp
            className="text-black cursor-pointer"
            onClick={() => setisModelOpen(false)}
          />
          <h1 className="font-bold text-black text-2xl ">Validators</h1>
        </div>
        <div className="py-4 grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mx-2">
          {filteredValidators.map((validator) => (
            <ValidatorEl2
              key={validator.codename}
              validator={validator}
              selectedValidators={selectedValidators}
              setSelectedValidators={setSelectedValidators}
            />
          ))}
        </div>
      </div>
      <div className="flex item-center gap-4">
        <button
          className="bg-meta-5 hover:bg-opacity-90 transition-all flex-shrink-0 text-white px-3 rounded-sm py-2 shadow-default font-semibold"
          onClick={() => handleAddValidator(validators)}
        >
          Add Validator
        </button>
        <button
          className="text-black font-bold  uppercase"
          onClick={() => setisModelOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Validators;
