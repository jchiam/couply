import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerState: headerStates.HOME
    };
  }

  renderHeaderBar() {
    const { headerState } = this.state;
    const { history } = this.props;
    return (
      <div style={styles.headerBar}>
        <FlatButton
          style={headerState === headerStates.HOME ? styles.headerButtonSelected : styles.headerButton}
          label="Home"
          onClick={() => {
            this.setState({ headerState: headerStates.HOME });
            history.push('/');
          }}
          secondary
        />
        <FlatButton
          style={headerState === headerStates.TIMELINE ? styles.headerButtonSelected : styles.headerButton}
          label="Timeline"
          onClick={() => {
            this.setState({ headerState: headerStates.TIMELINE });
            history.push('/timeline');
          }}
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
  children: PropTypes.node,
  history: PropTypes.object.isRequired  // eslint-disable-line react/forbid-prop-types
};

App.defaultProps = {
  children: null
};

export default withRouter(App);
