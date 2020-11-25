import externalConfig from '../../externalConfig';
import recipes from '../../recipes.json';
import tags from '../../tags.json';
import users from '../../users.json';
import FuzzySet from 'fuzzyset.js';

//const aggsQuery = (key, displayName) => {
// const obj = {
//   aggs: {}
// };
// obj.aggs[displayName] = {
//   terms: {
//     field: key,
//     size: 50
//   }
// };
// return obj;
//};

//const queryStringQuery = (qVal) => {
//  if (!qVal || qVal === '') {
//    return null;
//  }
//  return {
//    query: {
//      query_string: {
//        query: qVal
//      }
//    }
//  };
//}

export async function queryEs(qVal, pageSize) {
  const hits = [];
  if (qVal === "") {
    return {
      status: 200,
      response: recipes
    };
  }
  const recIds = [];
  const searchForTheseTags = qVal.split();
  for(var searchTag in searchForTheseTags) {
    searchTag = searchForTheseTags[searchTag];
    const origTag = Object.assign(searchTag, "");
    searchTag = origTag.toLowerCase();
    const fs = FuzzySet(Object.keys(tags).map(s => s.toLowerCase())); // add fuzzy searching
    const res = fs.get(searchTag);
    for (var r in res) {
      r = res[r][1]
      if (Object.keys(tags).map(s => s.toLowerCase()).includes(r)) {
        const loc = Object.keys(tags).map(s => s.toLowerCase()).indexOf(r);
        const recordsIds = tags[Object.keys(tags)[loc]].recipes;
        for (var id in recordsIds) {
          id = recordsIds[id].toString();
          if (Object.keys(recipes).includes(id) && !recIds.includes(id)) {
            hits.push(recipes[id]);
            recIds.push(id);
          }
        }
      }
    }
  }
  return {
    status: 200,
    response: hits
  };
}

export async function getRecipes(q, from = 0, size = externalConfig.pageSize) {
  const hits = [];
  if (q === "") {
    return {
      status: 200,
      response: Object.keys(recipes).slice(from, from+size).map(k => recipes[k])
    };
  }
  const searchForTheseTags = q.split();
  for(var searchTag in searchForTheseTags) {
      if (searchTag in Object.keys(tags)) {
        const recordsIds = tags[searchTag];
        for (var id in recordsIds) {
          if (id in Object.keys(recipes)) {
            hits.push(recipes[id]);
          }
        }
      }
    }
  return {
    status: 200,
    response: hits
  };
}

export function getAggregations(key, displayName) {
  const buckets = [];
  for(var tag in Object.keys(tags)) {
    tag = Object.keys(tags)[tag];
    const tagObj = tags[tag];
    if(key === tagObj.key) {
      const num = tagObj.recipes.length;
      buckets.push({
        key: tag,
        doc_count: num
      });
    }
  }

  return {
    status: 200,
    response: {
      aggregations: {
        [displayName]: {
          buckets: buckets
        }
      }
    }
  };
}

export async function submitRecipe(newRecipe) {
  let newRecipes = await recipes;
  newRecipes.concat(newRecipe);
  recipes = newRecipes
  return {
    status: 200,
    response: recipes
  };
}

export async function getRecipe(id) {
  let response = await recipes[id];
  return {
    status: response.status,
    response: response
  };
}

export async function getUser(id, userObj) {
  return {
    status: 200,
    response: await users[id]
  }
}

export async function createAndGetUser(id, userObj) {
  let newId = users;
  newId = newId.length + 5;
  userObj.id = newId
  let newUsers = users;
  newUsers.concat(userObj);
  users = newUsers;
  return {
    status: 200,
    response: userObj
  };
}