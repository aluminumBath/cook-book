import React from 'react';
import { Tag } from "@blueprintjs/core";
import externalConfig from '../../../../externalConfig';

const convertToHex = (str) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
     hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var c = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

export function getPrintCompFromRecipesArray(recipes) {
  if (!recipes || recipes.length < 1 ) { return null; }
  return (
    <>
      {recipes.map(r => {
        return getPrintComp(r);
      })}
    </>
  )
}

export function getPrintComp(recipe) {
  if (!recipe || !recipe._source) { return null; }
  return (
    <div className="print-sect" id={`printOnly-${recipe._index}-${recipe._id}`} key={`printOnly-${recipe._index}-${recipe._id}`}>
      <div className="print">
        <h3 className="title" style={{textAlign: 'center'}}>{recipe._source.title}</h3>
        <div className="bp3-card picture" style={{display: 'flex', justifyContent: 'center'}}>
          <img src={recipe._source.picture || externalConfig.missingImageUrl} alt={recipe._source.title} style={{display: 'block', width: '300px', height: '300px'}} />
        </div>
        <h5 className="title" style={{textAlign: 'center', margin: '3px'}}>
          Author(s)
        </h5>
        <div className="bp3-card authors" style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'grey', flexWrap: 'wrap'}}>
          {recipe._source.author && recipe._source.author.length > 0 && recipe._source.author.map(a => {
            return (
              <Tag className="tag" key={a} style={{color: 'white'}}>
                {a}
              </Tag>
            )
          })/* eslint-disable-next-line */}
          {!recipe._source.author || recipe._source.author.length < 1 &&
            <div className="no-authors" style={{backgroundColor: 'light-grey', justifyContent: 'space-around', textAlign: 'center', color: 'white'}}>Unknown</div>
          }
        </div>
        {recipe._source.tags && recipe._source.tags.length > 0 && <div className="bp3-card tags" style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-around', margin: '3px'}}>
          {recipe._source.tags.map(t => {
            return (
              <Tag className="tag" key={t} style={{display: 'flex', backgroundColor: 'white', color: '#' + convertToHex(t), margin: '5px', padding: '5px', border: 'solid 1px grey', borderRadius: '5px'}}>
                {t}
              </Tag>
            )
          })}
        </div>}
        {recipe._source.ingredients && recipe._source.ingredients.length > 0 && <h5 className="title" style={{textAlign: 'center'}}>
          Ingredient(s)
        </h5>}
        {recipe._source.ingredients && recipe._source.ingredients.length > 0 && <ul className="bp3-card ingredients">
          {recipe._source.ingredients.map(i => {
            return (
              <li className="ingredient" key={i.ingredient} style={{width: '100%'}}>
                <div className="ingr-group" style={{display: 'inline-flex', width: '100%'}}>
                  <div className="amount" style={{fontWeight: 'bold', marginRight: '3px'}}>
                    {i.amount}
                  </div>
                  <div className="title" style={{fontWeight: 'bold'}}>
                    {i.ingredient}
                  </div>
                </div>
                <div className="note" style={{display: 'block', width: '100%', marginLeft: '10px'}}>
                  {i.note}
                </div>
              </li>
            )
          })}
        </ul>}
        {recipe._source.instructions && recipe._source.instructions.length > 0 && <h5 className="title" style={{textAlign: 'center'}}>
          Instruction(s)
        </h5>}
        {recipe._source.instructions && recipe._source.instructions.length > 0 && <ul className="bp3-card instructions">
          {recipe._source.instructions.map(i => {
            return (
              <li className="step" key={i}>
                {i}
              </li>
            )
          })}
        </ul>}
        {recipe._source.notes && recipe._source.notes.length > 0 && <h5 className="title" style={{textAlign: 'center'}}>
          Note(s)
        </h5>}
        {recipe._source.notes && recipe._source.notes.length > 0 && <ul className="bp3-card notes">
          {recipe._source.notes.map(i => {
            return (
              <li className="note" key={i}>
                - {i}
              </li>
            )
          })}
        </ul>}
      </div>
    </div>
  )
}