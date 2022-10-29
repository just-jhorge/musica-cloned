import { useContext } from "react";
import { Context } from "../../context/Context";
import TopMusic from "./TopMusic";

const MusicList = ({ img, title, artiste, url, index }) => {
	const { playTrack } = useContext(Context);

	const handleClick = (e) => {
		playTrack(e, TopMusic);
	};

	return (
		<div
			className="text-xs text-white shrink-0 w-[140px] mr-[30px]"
			onClick={handleClick}
			data-id={index}
		>
			<img
				src={img}
				// height={153}
				// width={153}
				alt={title}
				className="rounded-3xl h-28 w-28 mr-[1.875rem] mb-1"
			/>
			<p className="mb-1 w-full truncate">{title}</p>
			<p>{artiste}</p>
		</div>
	);
};

export default MusicList;
