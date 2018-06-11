import React, { Component } from 'react';
import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList';

export class SearchResults extends Component {
  render() {
    return (
    	<div className="SearchResults">
    		<h2>Results</h2>
    		<TrackList
          full={this.props.searchResults.length >= this.props.limit ? true : false }
    			isRemoval={false}
    			onAdd={this.props.onAdd}
          onLoadMore={this.props.onLoadMore}
    			tracks={this.props.searchResults} />
    	</div>
    );
  }
}