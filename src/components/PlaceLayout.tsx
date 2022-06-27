import { ReactElement } from "react";

interface Props {
    children: React.ReactNode;
    title: string;
    subLine: string;
  }

export const PlaceLayout = ({ children, title, subLine }: Props): ReactElement  => {
  return (
    <div className="container max-w-4xl m-5 gap-2 flex flex-col h-screen justify-start">
           <h5 className="text-gray-900 dark:text-white text-2xl">{title}</h5>
      <p className="text-gray-900 dark:text-white">{subLine}</p>
        {children}
    </div>
  );
};
