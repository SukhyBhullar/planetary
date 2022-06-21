import { Button } from "flowbite-react";
import { useHref } from "react-router-dom";

export const ResetPage: React.FC = () => {
    const moveToHome = useHref("/");

    const resetEverything = () =>
    {
      window.localStorage.removeItem('app_state');
      window.location.href = moveToHome;
    }

    return (
    <div className="container max-w-xl m-auto flex flex-col h-screen justify-center">
      <Button color="failure" onClick={resetEverything}>
        <p className="text-xl">Reset</p>
      </Button>
    </div>
  );
};
