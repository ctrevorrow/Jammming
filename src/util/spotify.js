const {
	REACT_APP_SPOTIFY_CLIENT_ID,
	REACT_APP_REDIRECT_URI
} = process.env;

const corsAny = 'https://cors-anywhere.herokuapp.com/';
let accessToken, tokenExpiration;

export const Spotify = {
	getAccessToken(onLoad,searchTerm) {
		if (accessToken) {
			return accessToken;
		}

		let accessTokenArray, expirationArray;

		if (document.cookie.match(/accessToken=([^&;]*)/)) {
			accessTokenArray = document.cookie.match(/accessToken=([^&;]*)/);
		} else {
			accessTokenArray = window.location.href.match(/access_token=([^&]*)/);
    	expirationArray = window.location.href.match(/expires_in=([^&]*)/);
    }

    if (accessTokenArray) {
    	accessToken = accessTokenArray[1];

    	if (expirationArray) {
	    	tokenExpiration = Number(expirationArray[1]) * 1000;
	    	window.setTimeout(() => accessToken = '', tokenExpiration);
	    	document.cookie = (`accessToken=${accessToken}; expires=${new Date(Date.now() + tokenExpiration).toUTCString()};`);
	    	window.history.pushState('Access Token', null, '.');
	    }

			return accessToken;
    } else {
    	if (!onLoad) {
    		const getTokenUrl = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REACT_APP_REDIRECT_URI}&state=${searchTerm}`;
    		window.location = getTokenUrl;
    	}
    }
	},

	search(searchTerm,searchLimit,searchOffset) {
		const headers = {
			'Authorization': `Bearer ${this.getAccessToken('',searchTerm)}`
		}

		let searchUrl = `${corsAny}https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
		searchLimit ? searchUrl += `&limit=${searchLimit}` : '';
		searchOffset ? searchUrl += `&offset=${searchOffset}` : '';

		return fetch(searchUrl,{headers})
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error('Request failed :(');

		}, networkError => console.log(networkError.message)).then(jsonResponse => {
			if (jsonResponse.tracks) {
				return jsonResponse.tracks.items.map(track => ({
	      	id: track.id,
	      	name: track.name,
	      	artist: track.artists[0].name,
	      	album: track.album.name,
	      	uri: track.uri
	      }));
	    } else {
	    	return [];
	    }
		});
	},

	savePlaylist(name,trackIds) {
		if (!(name && trackIds)) {
			return;
		}

		const headers = {
			'Authorization': `Bearer ${this.getAccessToken()}`
		}

		return this.getUserId(headers)
		.then(userId => {
			return this.initializePlaylist(headers,userId,name)
			.then(playlistId => this.saveTracksToPlaylist(headers,userId,playlistId,trackIds))
			.then(response => response);
		});
	},

	getUserId(headers) {
		return fetch('https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/me', {headers})
		.then(response => response.json())
		.then(jsonResponse => jsonResponse.id)
    .then(userId => userId)
	},

	initializePlaylist(headers,userId,name) {
		return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userId}/playlists`, {
    	headers: headers,
    	method: 'POST',
    	body: JSON.stringify({name: name})
    })
    .then(response => response.json())
    .then(jsonResponse => jsonResponse.id)
    .then(playlistId => playlistId)
	},

	saveTracksToPlaylist(headers,userId,playlistId,trackIds) {
		return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({uris: trackIds})
    }).then(response => response);
	}
};