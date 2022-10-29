import { useContext } from "react";
import { Context } from "../../context/Context";
import Card from "./Card";
import Transition from "../../components/animation/AnimatedRoute";
import topMusic from "../home/TopMusic";

const Collection = () => {
	const { playTrack } = useContext(Context);

	const handleClick = (e) => {
		playTrack(e, topMusic);
	};

	const collections = topMusic.map((track, index) => {
		return (
			<Card
				key={track.key}
				index={index}
				title={track.title}
				artiste={track.subtitle}
				trackImg={track.share.image}
				url={track.hub.actions[1].uri}
				handleClick={handleClick}
			/>
		);
	});
	return (
		<>
			<Transition>
				<section className="w-full text-sm pb-24">
					<button className="text-primary-dark bg-primary-yellow rounded-full py-2.5 px-4 mr-2.5">
						My Collection
					</button>
					<button className="text-[#EFEEE0] border border-[#EFEEE0] rounded-full py-2.5 px-4 opacity-25">
						My Collection
					</button>
					<div className="flex flex-wrap gap-6 mt-6">{collections}</div>
				</section>
			</Transition>
		</>
	);
};

export default Collection;
