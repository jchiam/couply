import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Gallery from 'react-grid-gallery';

import { fetchEvents } from 'actions';
import DataStates from 'constants/dataStates';

const styles = {
  home: {
    backgroundImage: `url(${process.env.WALLPAPER})`,
    backgroundSize: 'cover',
    height: '100vh',
    margin: -8,
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

class HomePage extends Component {

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

  static renderGallery(photos) {
    if (!photos) {
      return null;
    }

    const galleryPhotos = [];
    photos.forEach((photo) => {
      galleryPhotos.push({
        src: photo,
        thumbnail: photo,
        thumbnailWidth: 320,
        thumbnailHeight: 320
      });
    });
    return <Gallery images={galleryPhotos} />;
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

  renderTimeline() {
    const { dataState } = this.props;

    if (dataState === DataStates.Fetched) {
      const { index } = this.state;
      const { events } = this.props;
      return (
        <div style={styles.timelineContainer}>
          <div>
            <h4>{events[index].date}<br />{events[index].title}</h4>
          </div>
          <div style={styles.timelinePane}>
            <button
              onClick={() => {
                if (index > 0) {
                  this.setState({ index: index - 1 });
                }
              }}
            >
              left
            </button>
            <div style={{ display: 'block', overflow: 'auto', width: '100%', minHeight: '1px' }}>
              {HomePage.renderGallery(events[index].photos)}
            </div>
            <button
              onClick={() => {
                if (index < events.length - 1) {
                  this.setState({ index: index + 1 });
                }
              }}
            >
              right
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  renderBody() {
    const { START_YEAR, START_MONTH, START_DAY } = process.env;
    const startDate = moment(`${START_YEAR}-${START_MONTH}-${START_DAY}`, 'YYYY-MM-DD');
    const currentDate = moment();
    return (
      <div style={styles.body}>
        <h2>{currentDate.diff(startDate, 'days')}</h2>
        <h2>days and counting</h2>
        {this.renderTimeline()}
      </div>
    );
  }

  render() {
    return (
      <div style={styles.home}>
        {HomePage.renderHeader()}
        {this.renderBody()}
      </div>
    );
  }
}

HomePage.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      title: PropTypes.string,
      photos: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  dataState: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired
};

HomePage.defaultProps = {
  events: []
};

function mapStateToProps(state) {
  return {
    events: state.home.events,
    wallpaper: state.home.wallpaper,
    dataState: state.home.dataState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => dispatch(fetchEvents())
  };
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
export default Home;
