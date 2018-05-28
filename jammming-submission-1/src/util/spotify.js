const clientId = '<Fill in client id from Spotify>';
const redirectUri = 'https://cjammming.surge.sh';
let accessToken, tokenExpiration;


export const Spotify = {
	getAccessToken(onLoad,searchTerm) {
		if (accessToken) {
			return accessToken;
		}

		let accessTokenArray, expirationArray;

		if (document.cookie) {
			accessTokenArray = document.cookie.match(/accessToken=([^&]*)/);
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
	    	window.history.pushState('Access Token', null, '/');
	    }

			return accessToken;
    } else {
    	if (!onLoad) {
    		const getTokenUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}&state=${searchTerm}`;
    		window.location = getTokenUrl;
    	}
    }
	},

	search(searchTerm) {
		return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,{
			headers: {
				'Authorization': `Bearer ${Spotify.getAccessToken('',searchTerm)}`
			}
		}).then(response => {
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
			'Authorization': `Bearer ${Spotify.getAccessToken()}`
		}

		return fetch('https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/me', {headers: headers})
		.then(response => response.json())
		.then(jsonResponse => jsonResponse.id)
    .then(userId => {

      return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userId}/playlists`, {
      	headers: headers,
      	method: 'POST',
      	body: JSON.stringify({name: name})
      })
      .then(response => response.json())
      .then(jsonResponse => jsonResponse.id)
      .then(playlistId => {

        return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackIds})
        });

      });
    
    });
	}
};