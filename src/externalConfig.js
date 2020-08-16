const externalConfig = {
  unclassDevEnv: true,
  appName: 'TJ\'s Cook Book',
  appMsg: 'TJ\'s Cookin',
  appMode: 'demo',
  logo: './logo.svg',
  endpoints: {
    esEndpoint: 'https://cookbook-7119007023.us-east-1.bonsaisearch.net:443/',
    esEndpointUserName: '28ed2l3600',
    esEndpointPassword: '2rhzl7n523'
  },
  color_scheme: {
    header: 'black',
  },
  recipesEsIndex: 'recipes',
  userEsIndex: 'cooks',
  pageSize: 15,
};

export default externalConfig;
