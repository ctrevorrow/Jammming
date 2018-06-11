import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/spotify';

// Sets the access token when the app loads
Spotify.getAccessToken(true);

class App extends Component {
  constructor(props) {
    super(props);
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.searchMore = this.searchMore.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      searchLimit: 20,
      searchOffset: 0
    };
  }

  addTrack(track) {
    // Adds track to the playlist tracklist
    if (!(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id))) {
      let playlist = this.state.playlistTracks;
      playlist.push(track);
      this.setState({playlistTracks: playlist});
      this.props.alert.success(`Added: ${track.name} by ${track.artist}`);
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
    
    Spotify.savePlaylist(this.state.playlistName,trackUris)
    .then(response => {
      if (response.status === 201) {
        this.props.alert.success(`Your playlist was successfully saved`);
        
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
        
        document.getElementById('playlist-name').value = 'New Playlist';
      } else {
        this.props.alert.error(`Oh no, something went wrong :( ${response.status}: ${response.statusText}`);
        console.log(response);
      }
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm,this.state.searchLimit).then(response => {
      this.setState({
        searchResults: response,
        searchTerm: searchTerm
      });
    });
  }

  searchMore() {
    const searchOffset = this.state.searchOffset + this.state.searchLimit;
    this.setState({ searchOffset: searchOffset });
    
    Spotify.search(this.state.searchTerm,this.state.searchLimit,searchOffset).then(response => {
      this.setState({ searchResults: response });
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
              limit={this.state.searchLimit}
              onAdd={this.addTrack}
              onLoadMore={this.searchMore}
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

export default withAlert(App);