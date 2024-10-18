import React from "react";
import { ClipLoader, PuffLoader } from "react-spinners";


const colors = {
    primary: {
        DEFAULT: '#3498db',
        300: '#85c1e9'
    }
};

const Spinner = ({ loading, type, position = 'FULL_WINDOW' }) => {
    const getSpinner = () => {
        if (type === "PUFF") {
            return (
                <PuffLoader
                    color={colors.primary["300"]}
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                />
            )
        } else if (type === "CLIP") {
            return (
                <ClipLoader
                    color={colors.primary["300"]}
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                />
            )
        }
    };

    return loading ? (
        <div className="static z-50 w-full h-full">
            {position === 'FULL_WINDOW' && (
                <div className="absolute top-0 left-0 bg-white opacity-60 rounded-lg w-full h-full">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {getSpinner()}
                    </div>
                </div>
            )}
            {position === 'FULL_PARENT' && (
                <div className="flex items-center justify-center h-full">
                    {getSpinner()}
                </div>
            )}
        </div>
    ) : null;
}

export default Spinner;
