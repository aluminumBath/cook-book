import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dialog, Tag } from "@blueprintjs/core";
import { recipesOperations } from '../../redux/recipes';
import Select from 'react-select';

import './submissionDialog.scss';

const defState = {
  title: '',
  ingredients: [],
  instructions: [],
  notes: [],
  tags: [],
  author: [],
  picture: '',
  newIngredientObj: null,
  newInstruction: null,
  newTag: null,
  newNote: null,
  newAuthor: null
}

class SubmissionDialog extends Component {
  constructor(props) {
    super(props);
    this.state = defState;
  }

  cancelNewRecipe = () => {
    this.props.closeSubmissionDialog()
    return this.setState(defState);
  }

  canSubmit = () => {
    const { title, ingredients, instructions, tags, author } = this.state;
    return (title && title.length > 0 ? true : false) && (ingredients && ingredients.length > 0 ? true : false) &&
      (instructions && instructions.length > 0 ? true : false) && (tags && tags.length > 0 ? true : false) &&
      (author && author.length > 0 ? true : false);
  }

  submitRecipe = () => {
    const { dispatch } = this.props;
    const { title, ingredients, instructions, notes, tags, author, picture } = this.state;
    const newRecipe = {
      title,
      ingredients,
      instructions,
      notes,
      tags,
      author,
      picture
    };
    this.props.closeSubmissionDialog();
    this.setState(defState);
    return dispatch(recipesOperations.submitRecipe(newRecipe));
  }

  updateValue = (key, newValue) => {
    return this.setState({
      ...this.state,
      [key]: newValue
    });
  }

  addNewIngredient = () => {
    const newIngObj = {
      ingredient: '',
      amount: '',
      note: ''
    };
    return this.setState({...this.state, newIngredientObj: newIngObj});
  }

  cancelNewIngrObj = () => {
    return this.setState({
      ...this.state,
      newIngredientObj: null
    });
  }

  addNewIngrObj = () => {
    const { ingredients, newIngredientObj } = this.state;
    const newArray = Object.assign([], ingredients);
    newArray.push(newIngredientObj);
    return this.setState({
      ...this.state,
      ingredients: newArray,
      newIngredientObj: null
    });
  }

  removeIngrObj = (idx) => {
    var newIngredientsCpy = Object.assign([], this.state.ingredients);
    delete newIngredientsCpy[idx];
    newIngredientsCpy = newIngredientsCpy.filter(o => o !== null);
    return this.setState({
      ...this.state,
      ingredients: newIngredientsCpy
    });
  }

  cancelNewInst = () => {
    return this.setState({
      ...this.state,
      newInstruction: null,
    });
  }

  removeInstruction = (instr) => {
    var newInstructsCpy = Object.assign([], this.state.instructions);
    delete newInstructsCpy[instr];
    newInstructsCpy = newInstructsCpy.filter(o => o !== null);
    return this.setState({
      ...this.state,
      instructions: newInstructsCpy
    });
  }

  addNewEmptyInstruction = () => {
    return this.setState({
      ...this.state,
      newInstruction: '',
    });
  }

  addNewInstruction = () => {
    const { instructions, newInstruction } = this.state;
    const newArray = Object.assign([], instructions);
    newArray.push(newInstruction);
    return this.setState({
      ...this.state,
      instructions: newArray,
      newInstruction: null,
    });
  }

  removeTag = (t) => {
    var newTagsCpy = Object.assign([], this.state.tags);
    delete newTagsCpy[t];
    newTagsCpy = newTagsCpy.filter(o => o !== null);
    return this.setState({
      ...this.state,
      tags: newTagsCpy
    });
  }

  addNewEmptyTag = () => {
    return this.setState({
      ...this.state,
      newTag: '',
    });
  }

  addNewTag = () => {
    const { tags, newTag } = this.state;
    const newArray = Object.assign([], tags);
    newArray.push(newTag);
    return this.setState({
      ...this.state,
      tags: newArray,
      newTag: null,
    });
  }

  cancelNewTag = () => {
    return this.setState({
      ...this.state,
      newTag: null,
    });
  }

  removeAuthor = (a) => {
    var newAuthorCpy = Object.assign([], this.state.author);
    delete newAuthorCpy[a];
    newAuthorCpy = newAuthorCpy.filter(o => o !== null);
    return this.setState({
      ...this.state,
      author: newAuthorCpy
    });
  }

  addNewEmptyAuthor = () => {
    return this.setState({
      ...this.state,
      newAuthor: '',
    });
  }

  addNewAuthor = () => {
    const { author, newAuthor } = this.state;
    const newArray = Object.assign([], author);
    newArray.push(newAuthor);
    return this.setState({
      ...this.state,
      author: newArray,
      newAuthor: null,
    });
  }

  cancelNewAuthor = () => {
    return this.setState({
      ...this.state,
      newAuthor: null,
    });
  }

  removeNote = (n) => {
    var newNotesCpy = Object.assign([], this.state.notes);
    delete newNotesCpy[n];
    newNotesCpy = newNotesCpy.filter(o => o !== null);
    return this.setState({
      ...this.state,
      notes: newNotesCpy
    });
  }

  addNewEmptyNote = () => {
    return this.setState({
      ...this.state,
      newNote: '',
    });
  }

  addNewNote = () => {
    const { notes, newNote } = this.state;
    const newArray = Object.assign([], notes);
    newArray.push(newNote);
    return this.setState({
      ...this.state,
      notes: newArray,
      newNote: null,
    });
  }

  cancelNewNote = () => {
    return this.setState({
      ...this.state,
      newNote: null,
    });
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

  render() {
    const { isOpen, closeSubmissionDialog, authors, tagsList } = this.props;
    const { title, ingredients, instructions, notes, tags, author, picture, newIngredientObj, newInstruction, newTag, newNote, newAuthor } = this.state;
    const canSubmit = this.canSubmit();
    const currTagKeys = tags.map(t => t.value);
    const currAuthorKeys = tags.map(t => t.value);
    const tagOptions = tagsList.filter(t => !currTagKeys.includes(t.value));
    const authOptions = authors.filter(a => !currAuthorKeys.includes(a.value));

    return (
      <Dialog
        className="submission_dialog"
        onClose={closeSubmissionDialog}
        title="New Recipe"
        isOpen={isOpen}
      >
        <div className="new-recipe">
          <div className="title section">
            <div className="label">
              Title
            </div>
            <input
              className="value title-input bp3-input"
              value={title || ''}
              onChange={e => this.updateValue('title', e.target.value)}
              placeholder="Recipe Title..."
            />
          </div>
          <div className="picture section">
            <div className="label">
              Picture URL
            </div>
            <input
              className="value picture-input bp3-input"
              value={picture || ''}
              onChange={e => this.updateValue('picture', e.target.value)}
              placeholder="Recipe Picture..."
            />
          </div>
          <div className="ingredients section">
            <div className="label">
              Ingredients
            </div>
            {ingredients && ingredients.length > 0 && <ul className="bp3-card ingredients">
              {ingredients.map((i, index) => {
                return (
                  <li className="ingredient" key={i.ingredient}>
                    <div className="ingr-group">
                      <Button icon="trash" className="delete-button bp3-intent-error" onClick={() => this.removeIngrObj(index)} />
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
            {!newIngredientObj &&
              <Button className="new-ingredient-button" icon="plus" onClick={() => this.addNewIngredient()} />
            }
            {newIngredientObj &&
              <div className="new-ingredient">
                <div className="ingredient subsection">
                  <div className="label">
                    Ingredient
                  </div>
                  <input
                    className="value title-input bp3-input"
                    value={newIngredientObj.ingredient || ''}
                    onChange={e => this.updateValue('newIngredientObj', { ...this.state.newIngredientObj, ingredient: e.target.value })}
                    placeholder="Ingredient..."
                  />
                </div>
                <div className="amount subsection">
                  <div className="label">
                    Amount
                  </div>
                  <input
                    className="value title-input bp3-input"
                    value={newIngredientObj.amount || ''}
                    onChange={e => this.updateValue('newIngredientObj', { ...this.state.newIngredientObj, amount: e.target.value })}
                    placeholder="Amount..."
                  />
                </div>
                <div className="note subsection">
                  <div className="label">
                    Note
                  </div>
                  <input
                    className="value title-input bp3-input"
                    value={newIngredientObj.note || ''}
                    onChange={e => this.updateValue('newIngredientObj', { ...this.state.newIngredientObj, note: e.target.value })}
                    placeholder="Note..."
                  />
                </div>
                <div className="subsection">
                  <Button className="bp3-intent-warning" text="Cancel" onClick={() => this.cancelNewIngrObj()} />
                  <Button className="bp3-intent-primary" text="Add Ingredient" onClick={() => this.addNewIngrObj()} />
                </div>
              </div>
            }
          </div>
          <div className="instructions section">
            <div className="label">
              Instructions
            </div>
            {instructions && instructions.length > 0 && <ul className="bp3-card instructions">
              {instructions.map((i, index) => {
                return (
                  <li className="instruction" key={i}>
                    <div className="ingr-group">
                      <Button icon="trash" className="delete-button bp3-intent-error" onClick={() => this.removeInstruction(index)} />
                      <div className="step">
                        - {i}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>}
            {(newInstruction === null || newInstruction === undefined) &&
              <Button className="new-instruction-button" icon="plus" onClick={() => this.addNewEmptyInstruction()} />
            }
            {newInstruction !== null && newInstruction !== undefined  &&
              <div className="new-instruction">
                <div className="instruction subsection">
                  <div className="label">
                    Instruction
                  </div>
                  <input
                    className="value title-input bp3-input"
                    value={newInstruction || ''}
                    onChange={e => this.updateValue('newInstruction', e.target.value)}
                    placeholder="Instruction..."
                  />
                </div>
                <div className="subsection">
                  <Button className="bp3-intent-warning" text="Cancel" onClick={() => this.cancelNewInst()} />
                  <Button className="bp3-intent-primary" text="Add Instruction" onClick={() => this.addNewInstruction()} />
                </div>
              </div>
            }
          </div>
          <div className="tags section">
            <div className="label">
              Tags
            </div>
            {tags && tags.length > 0 && <div className="bp3-card tags">
              {tags.map((t, index) => {
                return (
                  <Tag className="tag" key={t.value} style={{backgroundColor: '#' + this.convertToHex(t.label)}}  onRemove={() => this.removeTag(index)}>
                    {t.label}
                  </Tag>
                )
              })}
            </div>}
            {(newTag === null || newTag === undefined) &&
              <Button className="new-tag-button" icon="plus" onClick={() => this.addNewEmptyTag()} />
            }
            {newTag !== null && newTag !== undefined  &&
              <div className="new-tag">
                <div className="tag subsection">
                  <div className="label">
                    New Tag
                  </div>
                  <Select options={tagOptions} onChange={e => this.updateValue('newTag', e)} className="value tags-input" />
                </div>
                <div className="subsection">
                  <Button className="bp3-intent-warning" text="Cancel" onClick={() => this.cancelNewTag()} />
                  <Button className="bp3-intent-primary" text="Add Tag" onClick={() => this.addNewTag()} />
                </div>
              </div>
            }
          </div>
          <div className="notes section">
            <div className="label">
              Notes
            </div>
            {notes && notes.length > 0 && <div className="bp3-card notes">
              {notes.map((n, index) => {
                return (
                  <li className="note" key={n}>
                    <div className="ingr-group">
                      <Button icon="trash" className="delete-button bp3-intent-error" onClick={() => this.removeNote(index)} />
                      <div className="step">
                        - {n}
                      </div>
                    </div>
                  </li>
                )
              })}
            </div>}
            {(newNote === null || newNote === undefined) &&
              <Button className="new-note-button" icon="plus" onClick={() => this.addNewEmptyNote()} />
            }
            {newNote !== null && newNote !== undefined  &&
              <div className="new-note">
                <div className="note subsection">
                  <div className="label">
                    Note
                  </div>
                  <input
                    className="value title-input bp3-input"
                    value={newNote || ''}
                    onChange={e => this.updateValue('newNote', e.target.value)}
                    placeholder="Note..."
                  />
                </div>
                <div className="subsection">
                  <Button className="bp3-intent-warning" text="Cancel" onClick={() => this.cancelNewNote()} />
                  <Button className="bp3-intent-primary" text="Add Note" onClick={() => this.addNewNote()} />
                </div>
              </div>
            }
          </div>
          <div className="author section">
            <div className="label">
              Author(s)
            </div>
            {author && author.length > 0 && <div className="bp3-card author">
              {author.map((a, index) => {
                return (
                  <li className="author" key={a.value}>
                    <div className="ingr-group">
                      <Button icon="trash" className="delete-button bp3-intent-error" onClick={() => this.removeAuthor(index)} />
                      <div className="step">
                        - {a.label}
                      </div>
                    </div>
                  </li>
                )
              })}
            </div>}
            {(newAuthor === null || newAuthor === undefined) &&
              <Button className="new-author-button" icon="plus" onClick={() => this.addNewEmptyAuthor()} />
            }
            {newAuthor !== null && newAuthor !== undefined  &&
              <div className="new-author">
                <div className="author subsection">
                  <div className="label">
                    New Author
                  </div>
                  <Select options={authOptions} onChange={e => this.updateValue('newAuthor', e)} />
                </div>
                <div className="subsection">
                  <Button className="bp3-intent-warning" text="Cancel" onClick={() => this.cancelNewAuthor()} />
                  <Button className="bp3-intent-primary" text="Add Author" onClick={() => this.addNewAuthor()} />
                </div>
              </div>
            }
          </div>
          <div className="recipe-buttons section">
            <Button className="bp3-intent-warning" text="Cancel" onClick={() => this.cancelNewRecipe()} />
            <Button className="bp3-intent-primary" text="Submit Recipe" onClick={() => this.submitRecipe()} disabled={!canSubmit} />
          </div>
        </div>
      </Dialog>
    );
  }
}

SubmissionDialog.propTypes = {
  closeSubmissionDialog: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

function mapStateToProps(state, props) {
  const { recipes, elasticsearch } = state;
  var tagsList = [];
  if (elasticsearch && elasticsearch.aggregationResults && elasticsearch.aggregationResults.tags &&
    elasticsearch.aggregationResults.tags.results && elasticsearch.aggregationResults.tags.results.aggregations &&
    elasticsearch.aggregationResults.tags.results.aggregations.Tags && elasticsearch.aggregationResults.tags.results.aggregations.Tags.buckets) {
      tagsList = Object.values(elasticsearch.aggregationResults.tags.results.aggregations.Tags.buckets).map((t, index) => {
        return { value: index, label: t.key }
      })
    }
  return {
    authors: recipes.authors.map(a => {
      return { value: a._id, label: a.author }
    }),
    tagsList
  };
}

export default withRouter(connect(mapStateToProps)(SubmissionDialog));
