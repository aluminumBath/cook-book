const externalConfig = {
  unclassDevEnv: true,
  appName: 'TJ\'s Cook Book',
  appMsg: 'TJ\'s Cookin',
  appMode: 'demo',
  logo: './logo.svg',
  missingImageUrl: 'https://vilas.extension.wisc.edu/files/2013/12/Recipes-Title.png',
  endpoints: {
    esEndpoint: 'https://search-cookbook-ugbabvb522c6bmxbc3xfwe2l4e.us-east-2.es.amazonaws.com/'
  },
  color_scheme: {
    header: 'black',
  },
  recipesEsIndex: 'recipes',
  userEsIndex: 'cooks',
  pageSize: 15,
};

export default externalConfig;
