import React, { Component } from 'react';
import moment from 'moment';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center'
  },
  body: {
    textAlign: 'center'
  }
};

export default class Home extends Component {
  static renderHeader() {
    return (
      <div style={styles.header}>
        <h1>Jon</h1>
        <img alt="alt couple" />
        <h1>Becca</h1>
      </div>
    );
  }

  static renderBody() {
    const { START_YEAR, START_MONTH, START_DAY } = process.env;
    const startDate = moment(`${START_YEAR}-${START_MONTH}-${START_DAY}`, 'YYYY-MM-DD');
    const currentDate = moment();
    return (
      <div style={styles.body}>
        <h2>{currentDate.diff(startDate, 'days')}</h2>
        <h2>days and counting</h2>
      </div>
    );
  }

  render() {
    return (
      <div>
        {Home.renderHeader()}
        {Home.renderBody()}
      </div>
    );
  }
}
