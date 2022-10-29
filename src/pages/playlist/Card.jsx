import { useContext } from "react";
import { Context } from "../../context/Context";
import heart from "../../assets/icons/outline-heart.svg";

const Card = ({
	img,
	title,
	musicCategory,
	duration,
	artiste,
	handleClick,
	index,
}) => {
	const { millisecondsToMinute } = useContext(Context);

	return (
		<div
			data-id={index}
			className="flex items-center cursor-pointer backdrop-blur-sm bg-[rgba(51,55,59,0.37)] rounded-[15px] py-2 px-2.5 lg:pr-8"
			onClick={handleClick}
		>
			<div className="flex lg:items-center w-4/5">
				<img
					src={img}
					alt="Banner Image"
					width={39}
					className="rounded-lg mr-5"
				/>
				<img
					src={heart}
					alt="Heart Image"
					className="hidden lg:block mr-[79px]"
				/>
				<div className="flex flex-col overflow-hidden justify-center lg:flex-row lg:w-3/4">
					<p className="lg:w-2/3 truncate">
						{title} ~ {artiste}
					</p>
					<p className="lg:w-1/3">{musicCategory}</p>
				</div>
			</div>
			<div className="flex flex-col-reverse lg:flex-row w-1/5 items-end lg:items-center justify-between">
				<p>{millisecondsToMinute(duration)}</p>
				<i className="fa-solid fa-ellipsis-vertical text-primary-yellow text-base"></i>
			</div>
		</div>
	);
};

export default Card;
