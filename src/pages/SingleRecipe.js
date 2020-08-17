import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from "@blueprintjs/core";
import { appOperations } from '../redux/app';
import { recipesOperations } from '../redux/recipes';
import { userOperations } from '../redux/user';
import RecipeCardFull from '../components/recipeStage/components/recipeCardFull';
import './Pages.scss';

class SingleRecipePage extends Component {
  constructor(props) {
    super(props);
    props.dispatch(appOperations.setNavRoute(`/recipe/${props.match.params.id}`));
    props.dispatch(recipesOperations.getRecipe(props.match.params.id));
    props.dispatch(userOperations.getUser());
  }

  render() {
    const { recipe, currentRecipeIndex, isLoading } = this.props;
    if (isLoading) {
      return (
        <Spinner />
      )
    }
    if (!recipe) {
      return (
        <div id="app_base" className="cookApp_Recipe_Page">
          <h3 className="not-found">Unable to find your recipe</h3>
        </div>
      )
    }
    return (
      <div id="app_base" className="cookApp_Recipe_Page">
        <div id="app_base_center_panel" className="container bp3-card cookApp_row_center">
          <RecipeCardFull showAllDetails={true} key={recipe._id} recipe={recipe} currentRecipeIndex={currentRecipeIndex} />
        </div>
      </div>
    );
  }
}

SingleRecipePage.propTypes = {
  match: PropTypes.object.isRequired,
  recipe: PropTypes.object,
  isLoading: PropTypes.bool
};

SingleRecipePage.defaultProps = {
  isLoading: true
};

function mapStateToProps(state, props) {
  const { recipes } = state;
  return {
    currentRecipeIndex: recipes.currentRecipeIndex,
    recipe: recipes.specRecipe,
    isLoading: recipes.loading,
    id: props.match.params.id
  };
}

export default withRouter(connect(mapStateToProps)(SingleRecipePage));
