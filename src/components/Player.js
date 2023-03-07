import React from "react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Body from "./Body";
import "../css/Player.css";

function Player() {
	return (
		<div className='player'>
			<div className='player__body'>
				<Sidebar />
				<Body />
			</div>
			<Footer />
		</div>
	);
}

export default Player;
