import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

const headerStates = {
  HOME: 'home',
  TIMELINE: 'timeline'
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
      <div className="header-bar">
        <div className="header-button">
          <FlatButton
            labelStyle={headerState === headerStates.HOME ? { fontWeight: 'bold' } : null}
            label="Home"
            onClick={() => {
              this.setState({ headerState: headerStates.HOME });
              history.push('/');
            }}
            secondary
          />
        </div>
        <div className="header-button">
          <FlatButton
            labelStyle={headerState === headerStates.TIMELINE ? { fontWeight: 'bold' } : null}
            label="Timeline"
            onClick={() => {
              this.setState({ headerState: headerStates.TIMELINE });
              history.push('/timeline');
            }}
            secondary
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
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
