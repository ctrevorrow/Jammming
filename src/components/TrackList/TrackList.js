import React, { Component } from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(e) {
    this.props.onLoadMore();
  }

  renderLoadMore() {
    if (this.props.full && !this.props.isRemoval) {
      return <a className="Load-more" onClick={this.loadMore}>LOAD MORE</a>;
    }
  }

  render() {
    return (
    	<div className="TrackList">
    		{ this.props.tracks.map(track => {
    			return <Track
    				isRemoval={this.props.isRemoval}
    				onAdd={this.props.onAdd}
    				onRemove={this.props.onRemove}
    				key={track.id}
    				track={track} />
    		})}
        {this.renderLoadMore()}
    	</div>
    );
  }
}