import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import { elasticsearchOperations } from '../../redux/elasticsearch';

import './tableOfContents.scss';

class TableOfContents extends Component {
  updateSearchVal = (newVal) => {
    const { dispatch } = this.props;
    dispatch(elasticsearchOperations.updateFirstDocVal(0));
    return dispatch(elasticsearchOperations.updateSearchValue(newVal));
  }

  render() {
    return (
      <div className="cookApp_Table_Contents">
        <h3>Table of Contents</h3>
        <div className="contents">
          <Button className="bp3-minimal content" text="Appetizer" onClick={() => this.updateSearchVal("Appetizer")} />
          <Button className="bp3-minimal content" text="Breakfast" onClick={() => this.updateSearchVal("Breakfast")} />
          <Button className="bp3-minimal content" text="Lunch" onClick={() => this.updateSearchVal("Lunch")} />
          <Button className="bp3-minimal content" text="Dinner" onClick={() => this.updateSearchVal("Dinner")} />
          <Button className="bp3-minimal content" text="Beverage" onClick={() => this.updateSearchVal("Beverage")} />
          <Button className="bp3-minimal content" text="Dessert" onClick={() => this.updateSearchVal("Dessert")} />
          <Button className="bp3-minimal content" text="Other" onClick={() => this.updateSearchVal("Other")} />
        </div>
      </div>
    );
  }
}

TableOfContents.propTypes = {
};

function mapStateToProps(state, props) {
  return {};
}

export default withRouter(connect(mapStateToProps)(TableOfContents));
