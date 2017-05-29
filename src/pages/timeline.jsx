import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Gallery from 'react-grid-gallery';
import { red100 } from 'material-ui/styles/colors';

import { fetchAlbums } from 'actions';
import DataStates from 'constants/dataStates';
import { PhotoProps } from 'propTypes';

const styles = {
  home: {
    backgroundColor: red100,
    height: '100vh',
    marginLeft: -8,
    marginRight: -8,
    marginBottom: -8,
    padding: 8
  },
  header: {
    display: 'flex',
    justifyContent: 'center'
  },
  body: {
    textAlign: 'center'
  },
  timelineContainer: {
    textAlign: 'center'
  },
  timelinePane: {
    display: 'flex',
    justifyContent: 'space-between'
  }
};

class TimelinePage extends Component {

  static formatTimelineDate(startDay, startMonth, startYear) {
    return moment(`${startDay} ${startMonth} ${startYear}`, 'DD MM YYYY')
    .format('DD MMM YYYY');
  }

  static renderHeader() {
    return (
      <div style={styles.header}>
        <h1>Jon</h1>
        <img alt="alt couple" />
        <h1>Becca</h1>
      </div>
    );
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
    return <Gallery images={galleryPhotos} />;
  }

  renderTimeline() {
    const { dataState } = this.props;

    if (dataState === DataStates.Fetched) {
      return (
        <div style={styles.timelineContainer}>
          {this.renderGallery()}
        </div>
      );
    }
    return null;
  }

  renderBody() {
    return (
      <div style={styles.body}>
        {this.renderTimeline()}
      </div>
    );
  }

  render() {
    return (
      <div style={styles.home}>
        {TimelinePage.renderHeader()}
        {this.renderBody()}
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
