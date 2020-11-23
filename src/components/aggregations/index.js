import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tag } from '@blueprintjs/core';
import PropTypes from'prop-types';
import { elasticsearchOperations } from '../../redux/elasticsearch';

import './aggregations.scss';

class Aggregations extends Component {
  convertToHex = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }

  updateSearchVal = (newVal) => {
    const { dispatch } = this.props;
    dispatch(elasticsearchOperations.updateFirstDocVal(0));
    return dispatch(elasticsearchOperations.updateSearchValue(newVal));
  }

  render() {
    const { aggregations, keyProp, keyDisplay } = this.props;
    return (
      <div className={`bp3-card cookApp_Aggregations ${keyProp}`}>
        <h3>{keyDisplay}</h3>
        <div className="aggregations">
          {/*eslint-disable-next-line*/}
          {!aggregations || !aggregations.results || !aggregations.results.buckets || aggregations.results.buckets.length < 1 &&
            <div className="message">No recipes found.</div>
          }
          {aggregations && aggregations.results && aggregations.results.buckets && aggregations.results.buckets.length > 0 &&
            aggregations.results.buckets.map(tag => {
              return (
                <Tag key={tag.key} style={{backgroundColor: '#' + this.convertToHex(tag.key)}} onClick={() => this.updateSearchVal(tag.key)}>
                  {tag.key}: {tag.doc_count}
                </Tag>
              )
            })
          }
        </div>
      </div>
    );
  }
}

Aggregations.propTypes = {
  keyObj: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  const { elasticsearch } = state;
  var aggs = [];
  var keyProp = '';
  var keyDisplay = '';
  if (props.keyObj && props.keyObj.key) {
    keyProp = props.keyObj.key;
  }
  if (props.keyObj && props.keyObj.displayName) {
    keyDisplay = props.keyObj.displayName;
  }
  if (keyProp !== '' && elasticsearch.aggregationResults && elasticsearch.aggregationResults[keyProp]) {
    aggs = elasticsearch.aggregationResults[keyProp];
  }
  return {
    aggregations: aggs,
    keyProp,
    keyDisplay
  };
}

export default withRouter(connect(mapStateToProps)(Aggregations));
