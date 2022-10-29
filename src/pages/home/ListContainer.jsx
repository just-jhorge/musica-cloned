import React from "react";

const ListContainer = ({ children }) => {
	return (
		<div className="flex flex-wrap overflow-x-scroll mb-10 gap-y-3 md:gap-y-5">
			{children}
		</div>
	);
};

export default ListContainer;
