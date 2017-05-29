import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Gallery from 'react-grid-gallery';

import LeftChevron from 'images/chevron_left.svg';
import RightChevron from 'images/chevron_right.svg';
import { fetchAlbums } from 'actions';
import DataStates from 'constants/dataStates';
import { PhotoProps } from 'propTypes';

class TimelinePage extends Component {

  static formatTimelineDate(startDay, startMonth, startYear) {
    return moment(`${startDay} ${startMonth} ${startYear}`, 'DD MM YYYY')
    .format('DD MMM YYYY');
  }

  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  renderGallery() {
    const { index } = this.state;
    const { albums } = this.props;

    if (!albums || albums.length === 0) {
      return null;
    }

    const galleryPhotos = [];
    albums[index].photos.forEach((photo) => {
      galleryPhotos.push({
        src: photo.secure_url,
        thumbnail: photo.secure_url,
        thumbnailWidth: 320,
        thumbnailHeight: 320
      });
    });

    return (
      <div className="gallery">
        <Gallery images={galleryPhotos} />
      </div>
    );
  }

  renderTimeline() {
    const { dataState } = this.props;
    if (dataState === DataStates.Fetched) {
      return (
        <div className="timeline-container">
          <LeftChevron width={30} />
          {this.renderGallery()}
          <RightChevron width={30} />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="timeline">
        {this.renderTimeline()}
      </div>
    );
  }
}

TimelinePage.propTypes = {
  albums: PropTypes.arrayOf(PhotoProps).isRequired,
  dataState: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    albums: state.timeline.albums,
    dataState: state.timeline.dataState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => dispatch(fetchAlbums())
  };
}

const Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelinePage);
export default Timeline;
