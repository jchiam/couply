import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Gallery from 'react-grid-gallery';
import Modal from 'react-modal';

import LeftChevron from 'images/chevron_left.svg';
import RightChevron from 'images/chevron_right.svg';
import { fetchAlbums } from 'actions';
import * as Cloudinary from 'cloudinaryUtils';
import DataStates from 'constants/dataStates';
import { PhotoProps } from 'propTypes';

const PHOTO_HEIGHT = 150;

class TimelinePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      thisIsIt: false
    };
  }

  componentDidMount() {
    const { authenticated, fetch } = this.props;
    fetch(authenticated);
  }

  prevGallery() {
    const { index } = this.state;
    if (index > 0) {
      this.setState({ index: index - 1, thisIsIt: false });
    }
  }

  nextGallery() {
    const { index } = this.state;
    const { albums } = this.props;
    if (index < albums.length - 1) {
      this.setState({ index: index + 1 });
    } else if (index === albums.length - 1) {
      this.setState({ index: index + 1, thisIsIt: true });
    }
  }

  renderGallery() {
    const { index } = this.state;
    const { albums } = this.props;

    if (!albums || albums.length === 0) {
      return null;
    }

    const galleryPhotos = [];
    albums[index].photos.forEach((photo) => {
      const thumbnailTransform = `c_scale,h_${PHOTO_HEIGHT}`;
      const url = Cloudinary.addTransformationToURL(photo.secure_url, thumbnailTransform);
      galleryPhotos.push({
        src: photo.secure_url,
        thumbnail: url,
        thumbnailWidth: Cloudinary.calcDesiredWidth(photo.height / photo.width, PHOTO_HEIGHT),
        thumbnailHeight: PHOTO_HEIGHT
      });
    });

    return (
      <div className="gallery">
        <Gallery images={galleryPhotos} enableImageSelection={false} />
      </div>
    );
  }

  renderGalleryTitle() {
    const { index } = this.state;
    const { albums } = this.props;

    const currentAlbum = albums[index].album;
    return (
      <div className="gallery-title">
        {moment(currentAlbum, 'YYYY-MM').format('MMMM YYYY')}
      </div>
    );
  }

  renderTimeline() {
    return (
      <div className="timeline-container">
        <LeftChevron width={30} onClick={() => this.prevGallery()} />
        {this.renderGallery()}
        <RightChevron width={30} onClick={() => this.nextGallery()} />
      </div>
    );
  }

  renderContents() {
    const { thisIsIt } = this.state;
    const { dataState } = this.props;
    if (dataState === DataStates.Fetched) {
      if (thisIsIt) {
        return (
          <Modal isOpen contentLabel="Modal">
            <img className="ring" src={process.env.RING} alt="ring" />
          </Modal>
        );
      }
      return (
        <div>
          {this.renderGalleryTitle()}
          {this.renderTimeline()}
        </div>
      );
    }
    return null;
  }

  render() {
    return <div className="timeline">{this.renderContents()}</div>;
  }
}

TimelinePage.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  albums: PropTypes.arrayOf(PhotoProps).isRequired,
  dataState: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    authenticated: !!state.auth.token,
    albums: state.timeline.albums,
    dataState: state.timeline.dataState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: authenticated => dispatch(fetchAlbums(authenticated))
  };
}

const Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelinePage);
export default Timeline;
