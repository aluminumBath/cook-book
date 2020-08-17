import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { appOperations } from '../redux/app';
import { recipesOperations } from '../redux/recipes';
import { userOperations } from '../redux/user';
import RecipeCardFull from '../components/recipeStage/components/recipeCardFull';
import './Pages.scss';

class SingleRecipePage extends Component {
  constructor(props) {
    super(props);
    props.dispatch(appOperations.setNavRoute(`/recipe/${props.id}`));
    props.dispatch(recipesOperations.getRecipe(props.id));
    props.dispatch(userOperations.getUser());
  }

  render() {
    const { recipe, currentRecipeIndex } = this.props;
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
  id: PropTypes.string.isRequired,
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
    isLoading: recipes.loading
  };
}

export default withRouter(connect(mapStateToProps)(SingleRecipePage));
