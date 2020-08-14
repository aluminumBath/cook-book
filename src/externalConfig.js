const externalConfig = {
  unclassDevEnv: true,
  appName: 'TJ\'s Cook Book',
  appMsg: 'TJ\'s Cookin',
  appMode: 'demo',
  logo: './logo.svg',
  endpoints: {
    esEndpoint: 'http://localhost:9000/es/',
  },
  color_scheme: {
    header: 'black',
  },
  recipesEsIndex: 'recipes',
  userEsIndex: 'cooks',
  pageSize: 15,
};

export default externalConfig;
