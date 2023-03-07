export const initialState = {
	user: null,
	playlists: [],
	spotify: null,
	top_artists: null,
	playing: false,
	item: null,
	current_playlist: null,
	current_track: null,
	audio: new Audio(),
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};

		case "SET_TOP_ARTISTS":
			return {
				...state,
				top_artists: action.top_artists,
			};

		case "SET_TOKEN":
			return {
				...state,
				token: action.token,
			};

		case "SET_SPOTIFY":
			return {
				...state,
				spotify: action.spotify,
			};

		case "SET_PLAYLISTS":
			return {
				...state,
				playlists: action.playlists,
			};

		case "SET_CURRENT_PLAYLIST":
			return {
				...state,
				current_playlist: action.current_playlist,
			};

		case "SET_CURRENT_TRACK":
			if (!action.track?.preview_url) {
				alert("Can not play this song.");
				return state;
			}
			if (state.current_track) state.audio.pause();
			state.audio.src = action.track?.preview_url;
			const onLoadedData = () => {
				state.audio.play();
				state.audio.removeEventListener("loadeddata", onLoadedData);
			};
			state.audio.onloadeddata = onLoadedData;

			return {
				...state,
				playing: true,
				current_track: action.track,
			};

		case "SET_PLAYING":
			if (!state.current_track) return state;
			if (!action.playing && !state.audio.paused) state.audio.pause();
			else if (action.playing && state.audio.paused) state.audio.play();

			return {
				...state,
				playing: action.playing,
			};

		default:
			return state;
	}
};

export default reducer;
