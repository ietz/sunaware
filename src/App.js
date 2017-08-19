import './App.css'
import React, { Component } from 'react'

import {Redirect, Route, Switch} from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { fetchExistingReports, subscribeToNewReports } from "./actions/reports"
import { connect, Provider } from 'react-redux'

import SunawareLayout from './page/app/layout/SunawareLayout/SunawareLayout'
import MakeEntry from './page/weather/MakeEntryPage/MakeEntryPage'
import WelcomeMessage from './page/app/info/WelcomePage/WelcomePage'
import Start from './page/weather/StartPage/StartPage'
import Login from './page/user/LoginPage/LoginPage'
import SignUp from './page/user/SignUpPage/SignUpPage'
import Settings from "./page/user/SettingsPage/SettingsPage";
import GuardedRoute from './page/app/routing/GuardedRoute/GuardedRoute'
import GuardedRouteGroup from "./page/app/routing/GuardedRouteGroup/GuardedRouteGroup";


class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: false
		}
	}

	componentDidMount() {
		this.props.actions.fetchExistingReports()
		this.props.actions.subscribeToNewReports()
	}

	render() {
		const loggedIn = this.props.isLoggedIn

		return (
			<Provider store={this.props.store}>
				<BrowserRouter>
					<SunawareLayout>
						<Route exact path="/start" component={Start}/>

						<GuardedRouteGroup active={loggedIn} redirect="/">
							<GuardedRoute exact path="/settings" component={Settings} />
							<GuardedRoute exact path="/start/entry" component={MakeEntry} />
						</GuardedRouteGroup>

						<GuardedRouteGroup active={!loggedIn} redirect="/start">
							<GuardedRoute exact path="/" component={WelcomeMessage} />
							<GuardedRoute exact path="/login" component={Login} />
							<GuardedRoute exact path="/signup" redirect="/settings" component={SignUp} />
						</GuardedRouteGroup>
					</SunawareLayout>
				</BrowserRouter>
			</Provider>
		)
	}
}

function mapStateToProps(state) {
	return {
		isLoggedIn: state.auth.isLoggedIn
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ fetchExistingReports, subscribeToNewReports }, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
