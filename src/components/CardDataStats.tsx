import { ReactNode } from 'react';

interface CardDataStatsProps {
  data: number | undefined;
  title: string | '';
  children?: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  data,
  title,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke flex flex-col justify-between bg-white py-6 px-7.5 shadow-default ">
      <h3 className="font-bold">{title}</h3>

      <div className="mt-4 flex items-end justify-between">
        <h4 className="text-title-xxl font-bold text-black dark:text-white">
          {data}
        </h4>
        {children}
      </div>
    </div>
  );
};

export default CardDataStats;
