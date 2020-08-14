import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon } from '@blueprintjs/core';

import './appTitle.scss';

class AppTitle extends Component {
  goToHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const {appName, logo} = this.props;
    return (
      <div className="cookApp_App_Title" onClick={() => this.goToHome()}>
        {logo && logo !== '' && <image url="logo" />}
        {(!logo || logo === '') && <Icon icon="book" />}
        <Button className="title bp3-minimal" text={appName} />
      </div>
    );
  }
}

AppTitle.propTypes = {
  appName: PropTypes.string.isRequired,
  logo: PropTypes.string,
};

function mapStateToProps(state, props) {
  return {};
}

export default withRouter(connect(mapStateToProps)(AppTitle));
