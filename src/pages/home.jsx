import React, { Component } from 'react';
import moment from 'moment';

const styles = {
  wallpaper: {
    backgroundImage: `url(${process.env.WALLPAPER})`,
    backgroundSize: 'cover'
  }
};

export default class Home extends Component {

  static formatTimelineDate(startDay, startMonth, startYear) {
    return moment(`${startDay} ${startMonth} ${startYear}`, 'DD MM YYYY')
    .format('DD MMM YYYY');
  }

  static renderBody() {
    const { START_YEAR, START_MONTH, START_DAY } = process.env;
    const startDate = moment(`${START_YEAR}-${START_MONTH}-${START_DAY}`, 'YYYY-MM-DD');
    const currentDate = moment();
    return (
      <div className="body">
        <div className="header" style={styles.header}>
          <div className="contents">
            <div className="content-less-em">Jon & Becca</div>
            <div className="content-more-em">{currentDate.diff(startDate, 'days')}</div>
          </div>
        </div>
        <div className="wallpaper" style={styles.wallpaper} />
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  render() {
    return (
      <div className="home">
        {Home.renderBody()}
      </div>
    );
  }
}
