import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import adminConfig from '../recipeAdminConfig';
import { appOperations } from '../redux/app';
import Aggregations from '../components/aggregations';
import RecipeStage from '../components/recipeStage';
import SubmissionDialog from '../components/submissionDialog';
import TableOfContents from '../components/tableOfContents';
import { getPrintCompFromRecipesArray } from '../components/recipeStage/components/recipeCardFull/printUtils';
import { Button, Divider } from "@blueprintjs/core";
import './Pages.scss';

class HomePage extends Component {
  constructor(props) {
    super(props);
    props.dispatch(appOperations.setNavRoute('/home'));
    this.state = {activeTabId: "campaign", submissionDialogIsOpen: false};
  }

  toggleSubmissionDialog = () => {
    return this.setState({...this.state, submissionDialogIsOpen: !this.state.submissionDialogIsOpen});
  }

  closeSubmissionDialog = () => {
    return this.setState({...this.state, submissionDialogIsOpen: false});
  }

  printAll = () => {
    var newWindow = window.open("", "");
    newWindow.document.body.innerHTML = document.getElementById('printOnly').innerHTML;
    newWindow.print();
  }

  render() {
    const { recipes, totalRecipes, userInfo } = this.props;
    const { submissionDialogIsOpen } = this.state;
    let canSubmit = false;
    if (userInfo && userInfo.email) {
      canSubmit = adminConfig.canSubmitRecipeEmails.includes(userInfo.email);
    }
    return (
      <div id="app_base" className="cookApp_Home_Page">
        <div id="app_base_left_panel" className="container bp3-card cookApp_row_left">
          <TableOfContents />
          {canSubmit && <><Divider />
          <div className="submission_section">
            <Button text="Submit Recipe" onClick={() => this.toggleSubmissionDialog()} />
          </div></>}
        </div>
        <div id="app_base_center_panel" className="container bp3-card cookApp_row_center">
          <div className="header-row">
            <div className="pages">
              Showing {recipes.length} of {totalRecipes} recipes
            </div>
            <Button icon="git-push" onClick={() => this.printAll(recipes)} />
          </div>
          <RecipeStage />
          <SubmissionDialog isOpen={submissionDialogIsOpen} closeSubmissionDialog={this.closeSubmissionDialog} />
        </div>
        <div id="app_base_right_panel" className="container bp3-card cookApp_row_right">
          <Aggregations keyObj={{key: 'tags.keyword', displayName: 'Tags'}} />
          <Aggregations keyObj={{key: 'author.keyword', displayName: 'Authors'}} />
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

export default withRouter(connect(mapStateToProps)(HomePage));
