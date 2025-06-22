import React from "react";
import { AuthErrors } from "@/types";
import { useSelector, useDispatch } from "react-redux";
import { IAlert } from "@/types/reduxTypes/alert";
import { AlertSelector, removeAlert } from "@/redux/reducers/alertReducer";
import { humanize } from "@/utils";
import * as Toast from "@radix-ui/react-toast";

const ignoreAlerts = [AuthErrors.LoginNeeded];

/**
 * Global Alert notification component using Radix UI Toast
 *
 * @returns {React.FC} notification component
 */
const Alert: React.FC = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(AlertSelector);

  // Only show alerts that are not ignored
  const visibleAlerts =
    alerts?.filter(
      (alert: IAlert) =>
        ignoreAlerts.indexOf(alert.message as AuthErrors) === -1
    ) || [];

  return (
    <Toast.Provider swipeDirection="right">
      <div className="fixed top-4 left-1/2 z-[9999] flex flex-col gap-2 -translate-x-1/2 w-full max-w-md pointer-events-none">
        {visibleAlerts.map((alert: IAlert) => (
          <Toast.Root
            key={alert.id}
            open={true}
            duration={4000}
            onOpenChange={(open) => {
              //   if (!open) dispatch(removeAlert(alert?._id));
            }}
            className={`pointer-events-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg px-4 py-3 flex flex-col gap-1 w-full`}
          >
            <Toast.Title className="font-semibold text-base">
              {humanize(alert.type as string)}
            </Toast.Title>
            {alert.message && (
              <Toast.Description className="text-sm text-zinc-700 dark:text-zinc-300">
                {alert.message}
              </Toast.Description>
            )}
            <Toast.Close
              className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              aria-label="Close"
              onClick={() =>
                // dispatch(removeAlert(alert?._id))
                {}
              }
            >
              ×
            </Toast.Close>
          </Toast.Root>
        ))}
      </div>
      <Toast.Viewport className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-md flex flex-col gap-2 outline-none" />
    </Toast.Provider>
  );
};

export default Alert;
