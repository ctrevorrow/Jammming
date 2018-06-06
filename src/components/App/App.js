import React, { Component } from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/spotify';

// Sets the access token when the app loads
Spotify.getAccessToken(true);

export class App extends Component {
  constructor(props) {
    super(props);
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
  }

  addTrack(track) {
    // Adds track to the playlist tracklist
    if (!(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id))) {
      let playlist = this.state.playlistTracks;
      playlist.push(track);
      this.setState({playlistTracks: playlist});
    }

    // Removes track from the search results
    let newSearchResultsList = this.state.searchResults.filter(resultsTrack => resultsTrack.id !== track.id);
    this.setState({searchResults: newSearchResultsList});
  }


  removeTrack(track) {
    // Removes track from the playlist tracklist
    let newPlaylist = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({playlistTracks: newPlaylist});

    // Adds track back into the search results
    if (!(this.state.searchResults.find(resultsTrack => resultsTrack.id === track.id))) {
      let searchResultsList = this.state.searchResults;
      searchResultsList.push(track);
      this.setState({searchResults: searchResultsList});
    }
  }


  savePlaylist() {
    let trackUris = this.state.playlistTracks.map(track => track.uri);
    
    Spotify.savePlaylist(this.state.playlistName,trackUris);
    
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(response => {
      this.setState({searchResults: response});
    });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults} />
            <Playlist
              name={this.state.playlistName}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onRemove={this.removeTrack}
              playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}