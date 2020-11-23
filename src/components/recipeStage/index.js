import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import RecipeCardFull from './components/recipeCardFull';
import * as recipeOperations from '../../redux/recipes/operations';

import './recipeStage.scss';

class RecipeStage extends Component {
  paginate = (i) => {
    const { currentRecipeIndex, dispatch } = this.props;
    var newIndex = 0;
    if (i === 'prev') {
      newIndex = currentRecipeIndex-1;
    } else if (i === 'next') {
      newIndex = currentRecipeIndex+1;
    }
    return dispatch(recipeOperations.setCurrPageIndex(newIndex));
  }

  render() {
    const { recipes, currentRecipeIndex, showAll } = this.props;
    if (recipes && recipes.length < 1) {
      return (
        <div className="cookApp_Recipe_Stage">
          <h3>No recipes match your search. Try another!</h3>
        </div>
      );
    }
    return (
      <div className="cookApp_Recipe_Stage">
        {currentRecipeIndex !== 0 && !showAll &&
          <Button text="<" className="prev-button" onClick={() => this.paginate('prev')} />
        }
        {!showAll && recipes.map((r, index) => {
        console.log('r: ', r);
          if (index === currentRecipeIndex-1 || index === currentRecipeIndex || index === currentRecipeIndex+1) {
            return (
              <RecipeCardFull key={r._id} recipe={r} currentRecipeIndex={currentRecipeIndex} />
            )
          }
          return null;
        })}
        {showAll && recipes.map((r, index) => {
          return (
            <RecipeCardFull showAllDetails={true} key={r._id} recipe={r} currentRecipeIndex={currentRecipeIndex} />
          )
        })}
        {currentRecipeIndex !== recipes.length-1 && recipes.length > 2 && !showAll &&
          <Button text=">" className="prev-button" onClick={() => this.paginate('next')} />
        }
      </div>
    );
  }
}

RecipeStage.propTypes = {
  showAll: PropTypes.bool
};

RecipeStage.defaultProps = {
  showAll: false
};

function mapStateToProps(state, props) {
  const { recipes } = state;
  return {
    pageSize: recipes.pageSize,
    totalRecipes: recipes.totalRecipes,
    currentRecipeIndex: recipes.currentRecipeIndex,
    recipes: recipes.recipes
  };
}

export default withRouter(connect(mapStateToProps)(RecipeStage));
