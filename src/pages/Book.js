import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { appOperations } from '../redux/app';
import { recipesOperations } from '../redux/recipes';
import { userOperations } from '../redux/user';
import RecipeStage from '../components/recipeStage';
import { getPrintCompFromRecipesArray } from '../components/recipeStage/components/recipeCardFull/printUtils';
import { Button } from "@blueprintjs/core";
import './Pages.scss';

class BookPage extends Component {
  constructor(props) {
    super(props);
    props.dispatch(appOperations.setNavRoute('/book'));
    props.dispatch(recipesOperations.getRecipes());
    props.dispatch(userOperations.getUser());
    this.state = { pageSize: 10 };
  }

  printAll = () => {
    var newWindow = window.open("", "");
    newWindow.document.body.innerHTML = document.getElementById('printOnly').innerHTML;
    newWindow.print();
  }

  render() {
    const { recipes, totalRecipes } = this.props;
    return (
      <div id="app_base" className="cookApp_Book_Page">
        <div id="app_base_center_panel" className="container bp3-card cookApp_row_center">
          <div className="header-row">
            <div className="pages">
              Showing {recipes.length} of {totalRecipes} recipes
            </div>
            <Button icon="git-push" onClick={() => this.printAll(recipes)} />
          </div>
          <RecipeStage showAll={true} />
        </div>
        <div className="printOnly" id="printOnly">
          {getPrintCompFromRecipesArray(recipes)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { elasticsearch, recipes, user } = state;
  const aggs = elasticsearch.aggregationResults && elasticsearch.aggregationResults.aggregations &&
    elasticsearch.aggregationResults.aggregations.tags && elasticsearch.aggregationResults.aggregations.tags.buckets ? elasticsearch.aggregationResults.aggregations.tags.buckets : [];
  return {
    aggregations: aggs,
    pageSize: recipes.pageSize,
    totalRecipes: recipes.totalRecipes,
    currentRecipeIndex: recipes.currentRecipeIndex,
    recipes: recipes.recipes,
    userInfo: user.userInfo
  };
}

export default withRouter(connect(mapStateToProps)(BookPage));
