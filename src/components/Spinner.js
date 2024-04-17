import React from "react";

export const Spinner = ({ text = "" }) => {
	return (
        <div className="text-center">
            <div className="w-12 h-12 rounded-full animate-spin
                        border-y-8 border-solid border-purple-500 border-t-transparent shadow-md"></div>
        </div>

	);
};
