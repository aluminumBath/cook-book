import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { elasticsearchOperations } from '../../../../redux/elasticsearch';

import './searchBar.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  updateSearchBarVal = (newVal) => {
    const { dispatch } = this.props;
    console.log('newVal: ', newVal);
    return dispatch(elasticsearchOperations.updateSearchValue(newVal));
  }

  render() {
    const { searchValue } = this.props;
    return (
      <div className="cookApp_SearchBar">
        <input className="bp3-input search-bar" type="text" value={searchValue} placeholder="Hot Beverage..." dir="auto" onChange={(e) => this.updateSearchBarVal(e.target.value) } />
      </div>
    );
  }
}

SearchBar.propTypes = {};

function mapStateToProps(state, props) {
  const { elasticsearch } = state;
  return {
    searchValue: elasticsearch.searchValue
  };
}

export default withRouter(connect(mapStateToProps)(SearchBar));
