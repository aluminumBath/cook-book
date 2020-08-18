import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon } from '@blueprintjs/core';
import { elasticsearchOperations } from '../../../../redux/elasticsearch';

import './appTitle.scss';

class AppTitle extends Component {
  goToHome = () => {
    const { dispatch, history } = this.props;
    history.push('/');
    dispatch(elasticsearchOperations.updateSearchValue(''));
  }

  goToBook = () => {
    const { dispatch, history } = this.props;
    history.push('/book');
    dispatch(elasticsearchOperations.updateSearchValue(''));
  }

  render() {
    const {appName, logo} = this.props;
    return (
      <div className="cookApp_App_Title">
        {logo && logo !== '' && <image url="logo" onClick={() => this.goToBook()} />}
        {(!logo || logo === '') && <Icon icon="book" onClick={() => this.goToBook()} />}
        <Button className="title bp3-minimal" text={appName} onClick={() => this.goToHome()} />
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
