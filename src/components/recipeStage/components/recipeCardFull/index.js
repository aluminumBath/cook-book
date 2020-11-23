import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Tag } from '@blueprintjs/core';
import { getPrintComp } from './printUtils';
import externalConfig from '../../../../externalConfig';

import './recipeCardFull.scss';

class RecipeCardFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false
    };
    if (props.showAllDetails) {
      this.state.showMore = props.showAllDetails;
    }
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
    const { recipe, showAllDetails } = this.props;
    const { showMore } = this.state;
    const authorArr = recipe.author || recipe._source.author;
    const tagsArr = recipe.tags || recipe._source.tags;
    const ingrArr = recipe.ingredients || recipe._source.ingredients;
    const instrArr = recipe.instructions || recipe._source.instructions;
    const notesArr = recipe.notes || recipe._source.notes;
    if (recipe) {
      return (
        <div id={`${recipe.title || recipe._source.title}-print`} className="cookApp_Recipe_Card_Full bp3-card bp3-elevation-3">
          <div className="title">
            <h3 className="title">{recipe.title || recipe._source.title}</h3>
            <Button className="print-btn" id="noPrint" icon="print" onClick={() => this.clickToPrint(`printOnly-${recipe._index}-${recipe._id}`, recipe)} />
          </div>
          {((recipe.picture && recipe.picture !== '') || (recipe._source.picture && recipe._source.picture !== '')) && <div className="bp3-card picture">
            <img src={recipe.picture || recipe._source.picture || externalConfig.missingImageUrl} alt={recipe.title || recipe._source.title} />
          </div>}
          {showMore && <div className="bp3-card authors">
            <h5 className="title">
              Author(s)
            </h5>
            {authorArr && authorArr.length > 0 && authorArr.map(a => {
              return (
                <Tag className="tag" key={a}>
                  {a}
                </Tag>
              )
            })/* eslint-disable-next-line*/}
            {!authorArr || authorArr.length < 1 &&
              <div className="no-authors">Unknown</div>
            }
          </div>}
          {showMore && tagsArr && tagsArr.length > 0 && <div className="bp3-card tags">
            {tagsArr.map(t => {
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
            {ingrArr && ingrArr.length > 0 && <ul className="bp3-card ingredients">
              {ingrArr.map(i => {
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
            {instrArr && instrArr.length > 0 && <ul className="bp3-card instructions">
              {instrArr.map(i => {
                return (
                  <li className="step" key={i}>
                    - {i}
                  </li>
                )
              })}
            </ul>}
            {notesArr && notesArr.length > 0 && <ul className="bp3-card notes">
              {notesArr.map(i => {
                return (
                  <li className="note" key={i}>
                    - {i}
                  </li>
                )
              })}
            </ul>}
            {!showAllDetails && <Button className="show-less" id="noPrint" text="Show Less" onClick={() => this.toggleShowMore()} />}
          </>}
          {this.renderPrintSect()}
        </div>
      );
    }
    return null;
  }
}

RecipeCardFull.propTypes = {
  recipe: PropTypes.object.isRequired,
  showAllDetails: PropTypes.bool
};

function mapStateToProps(state, props) {
  return {};
}

export default withRouter(connect(mapStateToProps)(RecipeCardFull));
