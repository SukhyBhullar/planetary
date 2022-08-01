import { ReactElement } from "react";
import { useAppSelector } from "../app/hooks";
import { getPlayerCredits } from "../features/game/GameSlice";

interface Props {
  children: React.ReactNode;
  title: string;
  subLine: string;
}

export const PlaceLayout = ({
  children,
  title,
  subLine,
}: Props): ReactElement => {
  const credits = useAppSelector(getPlayerCredits);

  return (
    <>
      <div className="max-w-2xl text-gray-900 dark:text-white ml-10 rounded-br-lg p-3 border-t-2 border-gray-500 rounded-bl-lg bg-gray-800">
        Credits: {credits}
      </div>
      <div className="container max-w-4xl m-5 gap-2 flex flex-col h-screen justify-start">
        <h5 className="text-gray-900 dark:text-white text-2xl">{title}</h5>
        <p className="text-gray-900 dark:text-white">{subLine}</p>
        {children}
      </div>
    </>
  );
};
