import React, { useEffect, useState } from "react";
import TopMusic from "../pages/home/TopMusic";
const Context = React.createContext();

const ContextProvider = ({ children }) => {
	const [tracksQueue, setTracksQueue] = useState(TopMusic);
	const [musicDuration, setMusicDuration] = useState("");
	const [isShuffle, setIsShuffle] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [trackIndex, setTrackIndex] = useState(10);
	const [playlistBG, setPlaylistBG] = useState();
	const [search, setSearch] = useState("");
	const [audioPlayer, setAudioPlayer] = useState(
		document.createElement("audio")
	);
	const [playerSrc, setPlayerSrc] = useState(
		"https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/cd/13/2d/cd132d9a-2449-65fe-e094-fb927d7c6c9e/mzaf_16088994795328198867.plus.aac.ep.m4a"
	);
	const [playerDetail, setPlayerDetail] = useState({
		cover:
			"https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/ff/ee/a8/ffeea8ba-38af-138f-045f-013bf8072cb2/194690959790_cover.jpg/400x400cc.jpg",
		title: "Cough (Odo)",
		duration: "",
		artiste: "Empire & Kizz Daniel",
	});

	useEffect(() => {
		setAudioPlayer(document.querySelector("#audio-player"));
	}, []);

	useEffect(() => {
		setCurrentTrack(trackIndex);
	}, [trackIndex]);

	const searchFilter = tracksQueue.filter(
		(item) =>
			item.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
			item.subtitle.toLocaleLowerCase().includes(search.toLocaleLowerCase())
	);

	const continuePlay = () => {
		audioPlayer.play();
	};

	const togglePlay = () => {
		if (audioPlayer.paused) {
			audioPlayer.play();
		} else {
			audioPlayer.pause();
		}

		setMusicDuration(audioPlayer.duration);
		setCurrentTime((audioPlayer.currentTime / audioPlayer.duration) * 100);
	};

	const setCurrentTrack = (index) => {
		const { hub, images, title, subtitle } = tracksQueue[index];
		const url = hub.actions[1].uri;
		setPlayerSrc(url);
		setPlayerDetail({
			cover: images.coverart,
			title: title,
			duration: "",
			artiste: subtitle,
		});

		audioPlayer.onloadedmetadata = () => {
			setMusicDuration(audioPlayer.duration);
			setCurrentTime((audioPlayer.currentTime / audioPlayer.duration) * 100);
			continuePlay();
		};
	};

	const nextTrack = () => {
		if (!isShuffle) {
			setTrackIndex((prevState) => {
				if (prevState != tracksQueue.length - 1) {
					return prevState + 1;
				} else {
					return 0;
				}
			});
		} else {
			const randIndex = Math.floor(Math.random() * tracksQueue.length);
			setTrackIndex(randIndex);
		}
	};

	const prevTrack = () => {
		setTrackIndex((prevState) => {
			if (prevState !== 0) {
				return prevState - 1;
			} else {
				return 0;
			}
		});
	};

	const playTrack = (e, tracksArray) => {
		setTracksQueue(tracksArray);
		let index = e.currentTarget.getAttribute("data-id");
		setTrackIndex(parseInt(index));
		setCurrentTime(index);
	};

	const millisecondsToMinute = (milliseconds) => {
		const second = Math.floor(milliseconds / 1000);
		const minute = Math.floor(second / 60);
		const seconds = Math.floor(second % 60);
		return `${minute.toString().padStart(2, "0")} : ${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	audioPlayer.onended = () => {
		nextTrack();
	};

	audioPlayer.ontimeupdate = () => {
		setCurrentTime(
			((audioPlayer.currentTime / musicDuration) * 100).toFixed(2)
		);
	};

	const contextValue = {
		millisecondsToMinute,
		playlistBG,
		setPlaylistBG,
		playerSrc,
		setPlayerSrc,
		playerDetail,
		setPlayerDetail,
		audioPlayer,
		togglePlay,
		setCurrentTrack,
		continuePlay,
		setTracksQueue,
		setTrackIndex,
		nextTrack,
		prevTrack,
		setIsShuffle,
		currentTime,
		musicDuration,
		search,
		setSearch,
		searchFilter,
		tracksQueue,
		playTrack,
	};

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
