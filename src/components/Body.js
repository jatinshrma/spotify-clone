import React from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useStateValue } from "../context/StateProvider";
import Header from "./Header";
import SongRow from "./SongRow";
import "../css/Body.css";

function Body() {
	const [{ current_playlist, spotify }, dispatch] = useStateValue();

	const playPlaylist = () => {
		const track = current_playlist.tracks.items.find(i => i?.track?.preview_url)?.track;
		if (track)
			dispatch({
				type: "SET_CURRENT_TRACK",
				track,
			});
	};

	const playSong = track => {
		dispatch({
			type: "SET_CURRENT_TRACK",
			track,
		});
	};

	return (
		<div className="body">
			<Header spotify={spotify} />

			<div className="body__info">
				<img src={current_playlist?.images[0].url} alt="" />
				<div className="body__infoText">
					<strong>Playlist</strong>
					<h2>{current_playlist?.name}</h2>
					<p>{current_playlist?.description}</p>
				</div>
			</div>

			<div className="body__songs">
				<div className="body__icons">
					<PlayCircleFilledIcon className="body__shuffle" onClick={playPlaylist} />
					<FavoriteIcon fontSize="large" />
					<MoreHorizIcon />
				</div>

				{current_playlist?.tracks.items.map(item => (
					<SongRow playSong={playSong} track={item.track} />
				))}
			</div>
		</div>
	);
}

export default Body;
