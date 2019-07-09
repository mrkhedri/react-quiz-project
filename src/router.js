import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './pages/Login';
import PassCode from './pages/PassCode';
import Register from './pages/Register';
import User from './pages/User';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from './styles/theme';
import createHistory from 'history/createBrowserHistory';
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { jssPreset } from '@material-ui/core/styles';

const history = createHistory();

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.

class SiteRouter extends React.Component {
    // state = {
    //
    // };

    render() {

        return <JssProvider jss={jss}>
            <MuiThemeProvider theme={theme}>
                <Router history={history}>
                    <div className='app-wrapper'>
                        <Route exact path="/" history={history} component={Login} />
                        <Route path="/passcode" history={history} component={PassCode} />
                        <Route path="/register" history={history} component={Register} />
                        <Route path="/user" history={history} component={User} />
                    </div>
                </Router>
            </MuiThemeProvider>
        </JssProvider>
    }
}

export default SiteRouter;