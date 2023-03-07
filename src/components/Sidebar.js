import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import SidebarOption from "./SidebarOption";
import { useStateValue } from "../context/StateProvider";
import "../css/Sidebar.css";

function Sidebar() {
	const [{ playlists, current_playlist, spotify }, dispatch] = useStateValue();
	const selectPlaylist = id => {
		spotify.getPlaylist(id).then(
			function (data) {
				dispatch({
					type: "SET_CURRENT_PLAYLIST",
					current_playlist: data,
				});
			},
			function (err) {
				console.error(err);
			}
		);
	};

	return (
		<div className="sidebar">
			<img
				className="sidebar__logo"
				src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
				alt=""
			/>
			<SidebarOption Icon={HomeIcon} option="Home" />
			<SidebarOption Icon={SearchIcon} option="Search" />
			<SidebarOption Icon={LibraryMusicIcon} option="Your Library" />
			<br />
			<strong className="sidebar__title">PLAYLISTS</strong>
			<hr />
			{playlists?.items?.map(playlist => (
				<SidebarOption
					option={playlist.name}
					isSelected={current_playlist === playlist?.id}
					selectPlaylist={() => selectPlaylist(playlist?.id)}
				/>
			))}
		</div>
	);
}

export default Sidebar;
