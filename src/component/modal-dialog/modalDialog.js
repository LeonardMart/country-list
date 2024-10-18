import React from "react";
import "./index.css";
import WarningIcon from "../../assets/icon/warning-icon";
import ConfirmIcon from "../../assets/icon/confirm-icon";
import SuccessIcon from "../../assets/icon/success-icon";
import ErrorIcon from "../../assets/icon/error-icon";
import Spinner from "../spinner/spinner";

const ModalDialog = ({
  title,
  type,
  onCancel,
  onConfirm,
  message,
  noBtn,
  yesBtn,
}) => {
  return (
    <>
      <div
        className="backdrop"
        onClick={onCancel}
        role="button"
        onKeyDown={onCancel}
        tabIndex={0}
      />
      <div className="modal-dialog w-[300px] z-50 md:w-[400px] left-[calc(50%-140px)] sm:left-[calc(50%-150px)] md:left-[calc(50%-200px)]">
        <div className="self-center text-center w-fit m-auto py-[25.33px]"></div>
        <div className="space-y-1.5 pb-5">
          <div className="text-[16px] font-bold text-gray-700">{title}</div>
          <div className="self-center text-center w-fit m-auto py-[25.33px]">
            {type === "confirm" && (
              <ConfirmIcon className="text-blue-700" />
            )}
            {type === "finish" && (
              <SuccessIcon className="text-green-700 stroke-[3px]" />
            )}
            {type === "warning" && (
              <WarningIcon className="text-orange-400" />
            )}
            {type === "error" && <ErrorIcon className="text-red-700" />}
            {type === "loading" && (
              <Spinner loading={true} position="FULL_PARENT" type="PUFF" />
            )}
          </div>
          <div className="text-md mt-[6px] text-gray-400 text-center">
            {message === "accepted!" || message === "rejected!" ? (
              <>Propose {message}</>
            ) : (
              message
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between space-x-1.5 text-h6 pb-5">
          {noBtn !== undefined && (
            <button
              className="w-full items-center px-4 py-2.5 border-[1px] h-10 border-gray-400 rounded-lg !font-semibold !text-md text-gray-700"
              onClick={onCancel}
            >
              {noBtn}
            </button>
          )}

          {(type !== 'loading') && (
            <button
              className={
                type === "warning"
                  ? "w-full h-10 rounded-lg !text-md !font-bold bg-red-700 text-white"
                  : "w-full h-10 rounded-lg !text-md !font-bold text-white bg-orange-500"
              }
              onClick={onConfirm}
            >
              {yesBtn}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalDialog;
