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
  const response = await fetch(externalConfig.endpoints.esEndpoint + '_search', {
    method: 'POST',
    body: JSON.stringify({
      request: {
        ...queryStringQuery(qVal),
        size: pageSize
      },
      indices: [externalConfig.recipesEsIndex, externalConfig.userEsIndex].join()
    }),
    headers: {
      'Content-Type': 'application/json',
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
  const esRequest = {
    request: {
      from: from,
      size: size
    },
    indices: [externalConfig.recipesEsIndex, externalConfig.userEsIndex].join()
  };
  if (q && q !== '') {
    esRequest.request['query'] = queryStringQuery(q)['query'];
  } else {
    delete esRequest.request['query'];
  }
  const response = await fetch(externalConfig.endpoints.esEndpoint + '_search', {
    method: 'POST',
    body: JSON.stringify(esRequest),
    headers: {
      'Content-Type': 'application/json',
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
  const response = await fetch(externalConfig.endpoints.esEndpoint + '_search', {
    method: 'POST',
    body: JSON.stringify({
      request: {
        ...aggsQuery(key, displayName),
      },
      indices: [externalConfig.recipesEsIndex, externalConfig.userEsIndex].join()
    }),
    headers: {
      'Content-Type': 'application/json',
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
      'Content-Type': 'application/json',
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