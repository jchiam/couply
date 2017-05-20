import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { red100 } from 'material-ui/styles/colors';

const headerStates = {
  HOME: 'home',
  TIMELINE: 'timeline'
};

const styles = {
  app: {
    margin: -8
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 8,
    height: 50,
    background: red100
  },
  headerButton: {
    height: 50,
    border: 'none',
    margin: '0 10px'
  },
  headerButtonSelected: {
    height: 50,
    borderBottom: '5px solid red',
    margin: '0 10px'
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerState: headerStates.HOME
    };
  }

  renderHeaderBar() {
    const { headerState } = this.state;
    return (
      <div style={styles.headerBar}>
        <FlatButton
          style={headerState === headerStates.HOME ? styles.headerButtonSelected : styles.headerButton}
          label="Home"
          onClick={() => this.setState({ headerState: headerStates.HOME })}
          secondary
        />
        <FlatButton
          style={headerState === headerStates.TIMELINE ? styles.headerButtonSelected : styles.headerButton}
          label="Timeline"
          onClick={() => this.setState({ headerState: headerStates.TIMELINE })}
          secondary
        />
      </div>
    );
  }

  render() {
    return (
      <div style={styles.app}>
        {this.renderHeaderBar()}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

App.defaultProps = {
  children: null
};
