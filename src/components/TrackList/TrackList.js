import React, { Component } from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends Component {
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
    	</div>
    );
  }
}