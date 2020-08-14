import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppShell from './components/appShell';
import externalConfig from './externalConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class InnerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
//    const { campaignChoice } = this.props;
    return(
     <div className="App_TJs_COOKBOOK">
        <ToastContainer />
        <AppShell className="App-body"
          logoPath={externalConfig.logo}
          appName={externalConfig.appName}
        />
     </div>
    )
  };
}

function mapStateToProps(state, props) {
  return {};
}

export default withRouter(connect(mapStateToProps)(InnerApp));
