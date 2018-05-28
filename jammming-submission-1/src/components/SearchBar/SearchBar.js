import React, { Component } from 'react';
import './SearchBar.css';

const searchTermArray = window.location.href.match(/state=([^&]*)/);

export class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.search = this.search.bind(this);
		this.state = {
			term: ''
		}
		// When the app requests a new access token, the redirects clear the search bar and no search is performed. This code corrects that.
		if (searchTermArray) {
			this.state.term = searchTermArray[1];
			this.search();
		}
	}

	handleKeyPress(e) {
	  if(e.key === 'Enter'){
	    this.search();
	  }
	}

	handleTermChange(e) {
		this.setState({term: e.target.value});
	}

	search() {
		this.props.onSearch(this.state.term);
	}

  render() {
    return (
    	<div className="SearchBar">
    		<input onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} placeholder="Enter A Song, Album, or Artist" value={this.state.term} id="search-field" />
    		<a onClick={this.search} id="search-button" >SEARCH</a>
			</div>
    );
  }
}