import externalConfig from '../../externalConfig';

const aggsQuery = (key, displayName) => {
 const obj = {
   aggs: {}
 };
 obj.aggs[displayName] = {
   terms: {
     field: key,
     size: 50
   }
 };
 return obj;
};

const queryStringQuery = (qVal) => {
  if (!qVal || qVal === '') {
    return null;
  }
  return {
    query: {
      query_string: {
        query: qVal
      }
    }
  };
}

export async function queryEs(qVal, pageSize) {
  const response = await fetch(externalConfig.endpoints.esEndpoint + [externalConfig.recipesEsIndex].join() + '/_search', {
    method: 'POST',
    body: JSON.stringify({
      ...queryStringQuery(qVal),
      size: pageSize
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.status !== 200) {
    console.error('Error retrieving notifications. Error: ', response);
    return {
      status: response.status,
      response: {},
      error: response
    };
  } else {
    const bodyRes = await response.text();
    return {
      status: response.status,
      response: bodyRes
    };
  }
}

export async function getRecipes(q, from = 0, size = externalConfig.pageSize) {
  console.log('getRecipes');

  const esRequest = {
    from: from,
    size: size
  };
  if (q && q !== '') {
    esRequest['query'] = queryStringQuery(q)['query'];
  } else {
    delete esRequest['query'];
  }
  
  
  const response = await fetch(externalConfig.endpoints.esEndpoint + [externalConfig.recipesEsIndex].join() + '/_search', {
    method: 'POST',
    body: JSON.stringify(esRequest),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.status !== 200) {
    console.error('Error retrieving notifications. Error: ', response);
    return {
      status: response.status,
      response: {},
      error: response
    };
  } else {
    const bodyRes = await response.text();
    return {
      status: response.status,
      response: bodyRes
    };
  }
}

export async function getAggregations(key, displayName) {
  const response = await fetch(externalConfig.endpoints.esEndpoint + [externalConfig.recipesEsIndex].join() + '/_search', {
    method: 'POST',
    body: JSON.stringify({
      ...aggsQuery(key, displayName),
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.status !== 200) {
    console.error('Error retrieving notifications. Error: ', response);
    return {
      status: response.status,
      response: {},
      error: response
    };
  } else {
    const bodyRes = await response.text();
    return {
      status: response.status,
      response: bodyRes
    };
  }
}

export async function submitRecipe(newRecipe) {
  const response = await fetch(externalConfig.endpoints.esEndpoint + externalConfig.recipesEsIndex + '/_doc/', {
    method: 'PUT',
    body: JSON.stringify(newRecipe),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.status !== 200) {
    console.error('Error submitting recipe. Error: ', response);
    return {
      status: response.status,
      response: {},
      error: response
    };
  } else {
    const bodyRes = await response.text();
    if (bodyRes['result'] !== 'created') {
      return {
        status: 405,
        response: bodyRes,
        error: bodyRes
      };
    }
    return {
      status: response.status,
      response: bodyRes
    };
  }
}

export async function getRecipe(id) {
  const response = await fetch(externalConfig.endpoints.esEndpoint + externalConfig.recipesEsIndex + '/_doc/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.status !== 200) {
    console.error('Error retrieving recipe. Error: ', response);
    return {
      status: response.status,
      response: {},
      error: response
    };
  } else {
    const bodyRes = await response.text();
    return {
      status: response.status,
      response: bodyRes
    };
  }
}

export async function getUser(id, userObj) {
  const response = await fetch(externalConfig.endpoints.esEndpoint + externalConfig.userEsIndex + '/_doc/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.status !== 200) {
    console.info('Unable to find user. Creating a user.');
    return {
      status: response.status,
      response: await response.text()
    }
  } else {
    const bodyRes = await response.text();
    return {
      status: response.status,
      response: bodyRes
    };
  }
}

export async function createAndGetUser(id, userObj) {
  const response = await fetch(externalConfig.endpoints.esEndpoint + externalConfig.userEsIndex + '/_doc/' + id, {
    method: 'PUT',
    body: JSON.stringify(userObj),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.status !== 200) {
    console.error('Error submitting recipe. Error: ', response);
    return {
      status: response.status,
      response: {},
      error: response
    };
  } else {
    const bodyRes = await response.text();
    if (bodyRes['result'] !== 'created') {
      return {
        status: 405,
        response: bodyRes,
        error: bodyRes
      };
    }
    return {
      status: response.status,
      response: bodyRes
    };
  }
}