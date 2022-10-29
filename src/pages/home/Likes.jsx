import React from "react";

const Likes = ({ img, mr }) => {
	return (
		<div
			className={`w-8 h-8 rounded-full ${mr} inline-block overflow-hidden drop-shadow-3xl`}
		>
			<img src={img} alt="Some Picture" />
		</div>
	);
};

export default Likes;
