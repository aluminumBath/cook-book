import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Tag } from '@blueprintjs/core';
import { getPrintComp } from './printUtils';

import './recipeCardFull.scss';

class RecipeCardFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false
    };
  }

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

  toggleShowMore = () => {
    return this.setState({
      ...this.state,
      showMore: !this.state.showMore
    });
  }

  clickToPrint = (id, recipe) => {
    var newWindow = window.open("", recipe._source.title);
    newWindow.document.body.innerHTML = document.getElementById(id).innerHTML;
    newWindow.print();
  }

  renderPrintSect() {
    const { recipe } = this.props;
    return getPrintComp(recipe);
  }

  render() {
    const { recipe } = this.props;
    const { showMore } = this.state;
    if (recipe && recipe._source) {
      return (
        <div id={`${recipe._source.title}-print`} className="cookApp_Recipe_Card_Full bp3-card bp3-elevation-3">
          <div className="title">
            <h3 className="title">{recipe._source.title}</h3>
            <Button className="print-btn" id="noPrint" icon="print" onClick={() => this.clickToPrint(`printOnly-${recipe._index}-${recipe._id}`, recipe)} />
          </div>
          {recipe._source.picture && recipe._source.picture !== '' && <div className="bp3-card picture">
            <img src={recipe._source.picture} alt={recipe._source.title} />
          </div>}
          <div className="bp3-card authors">
            <h5 className="title">
              Author(s)
            </h5>
            {recipe._source.author && recipe._source.author.length > 0 && recipe._source.author.map(a => {
              return (
                <Tag className="tag" key={a}>
                  {a}
                </Tag>
              )
            })/* eslint-disable-next-line*/}
            {!recipe._source.author || recipe._source.author.length < 1 &&
              <div className="no-authors">Unknown</div>
            }
          </div>
          {recipe._source.tags && recipe._source.tags.length > 0 && <div className="bp3-card tags">
            {recipe._source.tags.map(t => {
              return (
                <Tag className="tag" key={t} style={{backgroundColor: '#' + this.convertToHex(t)}}>
                  {t}
                </Tag>
              )
            })}
          </div>}
          {!showMore &&
            <Button className="show-more" id="noPrint" text="Show More" onClick={() => this.toggleShowMore()} />
          }
          {showMore && <>
            {recipe._source.ingredients && recipe._source.ingredients.length > 0 && <ul className="bp3-card ingredients">
              {recipe._source.ingredients.map(i => {
                return (
                  <li className="ingredient" key={i.ingredient}>
                    <div className="ingr-group">
                      <div className="amount">
                        - {i.amount}
                      </div>
                      <div className="title">
                        {i.ingredient}
                      </div>
                    </div>
                    <div className="note">
                      {i.note}
                    </div>
                  </li>
                )
              })}
            </ul>}
            {recipe._source.instructions && recipe._source.instructions.length > 0 && <ul className="bp3-card instructions">
              {recipe._source.instructions.map(i => {
                return (
                  <li className="step" key={i}>
                    - {i}
                  </li>
                )
              })}
            </ul>}
            {recipe._source.notes && recipe._source.notes.length > 0 && <ul className="bp3-card notes">
              {recipe._source.notes.map(i => {
                return (
                  <li className="note" key={i}>
                    - {i}
                  </li>
                )
              })}
            </ul>}
            <Button className="show-less" id="noPrint" text="Show Less" onClick={() => this.toggleShowMore()} />
          </>}
          {this.renderPrintSect()}
        </div>
      );
    }
    return null;
  }
}

RecipeCardFull.propTypes = {
  recipe: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {};
}

export default withRouter(connect(mapStateToProps)(RecipeCardFull));
