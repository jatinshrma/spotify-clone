import React, { useEffect, useState } from "react";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";
import { useStateValue } from "../context/StateProvider";
import "../css/Footer.css";

function Footer() {
	const [{ current_track, current_playlist, playing, audio }, dispatch] = useStateValue();
	const [playedTill, setPlayedTill] = useState(audio?.currentTime);

	useEffect(() => {
		const onTimeUpdate = () => {
			const percent = Math.ceil((audio.currentTime / audio.duration) * 100);
			setPlayedTill(percent);
			if (percent === 100) skipNext(current_playlist, current_track, true);
		};

		audio.ontimeupdate = onTimeUpdate;
		return () => audio.removeEventListener("timeupdate", onTimeUpdate);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [audio, current_playlist, current_track]);

	const handlePlayPause = () => {
		if (!audio?.paused) {
			dispatch({
				type: "SET_PLAYING",
				playing: false,
			});
		} else {
			dispatch({
				type: "SET_PLAYING",
				playing: true,
			});
		}
	};

	const skipNext = (playlist = current_playlist, _track = current_track, noAlert) => {
		let currentSongIndex = playlist.tracks.items.findIndex(i => i.track.id === _track.id);
		let nextSongIndex = playlist.tracks.items.findIndex(
			(_track, _i) => _track?.track?.preview_url && _i > currentSongIndex
		);

		if (nextSongIndex === -1 || nextSongIndex + 1 >= playlist.tracks.length) {
			if (noAlert) handlePlayPause();
			else alert("Playlist Ended.");
			return;
		}
		const track = playlist.tracks.items[nextSongIndex]?.track;
		if (track)
			dispatch({
				type: "SET_CURRENT_TRACK",
				track,
			});
	};

	const skipPrevious = () => {
		let currentSongIndex = current_playlist.tracks.items.findIndex(i => i.track.id === current_track.id);
		let previousSongIndex = current_playlist.tracks.items.findLastIndex(
			(_track, _i) => _track?.track?.preview_url && _i < currentSongIndex
		);
		if (previousSongIndex === -1) {
			return alert("Playlist Ended.");
		}
		const track = current_playlist.tracks.items[previousSongIndex].track;
		if (track)
			dispatch({
				type: "SET_CURRENT_TRACK",
				track,
			});
	};

	const setVolume = volume => {
		if (!volume) return;
		audio.volume = volume / 100;
	};

	return (
		<div className="footer">
			<div className="footer__left">
				<img
					className="footer__albumLogo"
					src={current_track?.album?.images?.[0]?.url}
					alt={current_track?.name}
				/>
				{current_track ? (
					<div className="footer__songInfo">
						<h4>{current_track.name}</h4>
						<p>{current_track.artists.map(artist => artist.name).join(", ")}</p>
					</div>
				) : (
					<div className="footer__songInfo">
						<h4>No song is playing</h4>
					</div>
				)}
			</div>
			<div className="footer__center">
				<div>
					<ShuffleIcon className="footer__green" />
					<SkipPreviousIcon onClick={skipPrevious} className="footer__icon" />
					{playing ? (
						<PauseCircleOutlineIcon onClick={handlePlayPause} fontSize="large" className="footer__icon" />
					) : (
						<PlayCircleOutlineIcon onClick={handlePlayPause} fontSize="large" className="footer__icon" />
					)}
					<SkipNextIcon onClick={() => skipNext()} className="footer__icon" />
					<RepeatIcon className="footer__green" />
				</div>
				<div>
					<span>
						00:{audio?.currentTime < 10 ? "0" : ""}
						{audio?.currentTime?.toFixed(0)}
					</span>
					<Slider
						style={{ width: "30vw", marginTop: "8px", color: "#fff" }}
						aria-labelledby="continuous-slider"
						value={playedTill}
					/>
					<span>00:30</span>
				</div>
			</div>
			<div className="footer__right">
				<Grid container spacing={2} style={{ width: "200px" }}>
					<Grid current_track>
						<PlaylistPlayIcon />
					</Grid>
					<Grid current_track>
						<VolumeDownIcon />
					</Grid>
					<Grid current_track xs>
						<Slider
							aria-labelledby="continuous-slider"
							defaultValue={100}
							onChange={e => setVolume(e.target.previousElementSibling?.value)}
						/>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Footer;
