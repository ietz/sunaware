import './MakeEntry.css'

import React, {Component} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormErrors } from '../../../FormErrors'

import Notifications, {notify} from 'react-notify-toast';
import { submitReport } from '../../../actions/reports'

import ImageSelect from '../../app/components/ImageSelect/ImageSelect'
import Content from "../../app/layout/Content/Content";
import {
	Box, Button, Control, Field, Input, Label, Modal, ModalBackground, ModalClose, ModalContent,
	Subtitle
} from "bloomer";
import {withRouter} from "react-router";

class MakeEntry extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rain: null,
			clouds: null,
			temperature: '',
            formErrors: {rain: '', clouds: '', temperature: ''},
            formValid: false,
			rainValid: false,
			cloudsValid: false,
			temperatureValid: false
		}
	}

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let rainValid = this.state.rainValid;
        let cloudsValid = this.state.cloudsValid;
        let temperatureValid = this.state.temperatureValid;

        switch(fieldName) {
            case 'rain':
                rainValid = value !== null;
                fieldValidationErrors.rain = rainValid ? '' : ' input is invalid';
                break;
            case 'clouds':
                cloudsValid = value !== null;
                fieldValidationErrors.clouds = cloudsValid ? '' : ' input is invalid';
                break;
            case 'temperature':
                temperatureValid = value.match(/^-?\d{1,2}$/g);
                fieldValidationErrors.temperature = temperatureValid ? '': 'please select an Input between -99 and 99 degrees';
     			 break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            rainValid: rainValid,
            cloudsValid: cloudsValid,
            temperatureValid: temperatureValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.rainValid && this.state.cloudsValid && this.state.temperatureValid});
    }

	componentWillReceiveProps(nextProps) {
		if (this.props.isPending && !nextProps.isPending) {
			if (nextProps.errors)
				notify.show(nextProps.errors.message, 'error', 2000)
			else
				this.props.history.push('/start')
		}
	}

	handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(
        	{[name]: value},
            () => { this.validateField(name, value) }
		);
	}

	handleReactInputChange = (value, field) => {
		this.setState(
			{[field]: value},
			() => { this.validateField(field, value) }
		)
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.actions.submitReport(this.state.clouds, this.state.rain, this.state.temperature)
	}

	handleModalClose = event => {
		event.preventDefault()
		this.props.history.push('/start')
	}


	render() {
		return (
			<Modal isActive>
				<Notifications />
				<ModalBackground onClick={this.handleModalClose} />
				<ModalClose onClick={this.handleModalClose} />
				<ModalContent>
					<Content size="medium">
						<Box className="make-entry-box">
							<form onChange={this.handleInputChange}>
								<Subtitle isSize={5}>
									Let us know about the weather at your place.
								</Subtitle>

								<Field>
									<Label>
										Rain type
									</Label>

									<ImageSelect
										name="rain"
										defaultValue={this.state.rain}
										onChange={this.handleReactInputChange}
										values={[0,1,2,3].map(v => ({
											value: v,
											img: '/img/weather/rain/' + v + '.png'
										}))} />
								</Field>

								<Field>
									<Label>
										Cloudiness
									</Label>

									<ImageSelect
										name="clouds"
										defaultValue={this.state.clouds}
										onChange={this.handleReactInputChange}
										values={[0,1,2,3,4].map(v => ({
											value: v,
											img: '/img/weather/clouds/' + v + '.png'
										}))} />
								</Field>

								<Field>
									<Control>
										<Input name="temperature" placeholder="Temperature in degrees"
											   isColor={this.props.temperatureValid && "danger"}
												/>

										<FormErrors formErrors={this.state.formErrors} />
									</Control>
								</Field>

								<Field isGrouped="centered">
									<Button isColor="warning"
											isLoading={this.props.isPending}
											disabled={!this.state.formValid}
											onClick={this.handleSubmit}>
										Submit
									</Button>
								</Field>
							</form>
						</Box>
					</Content>
				</ModalContent>
			</Modal>
		);
	}
}


function mapStateToProps(state) {
	return {
		isPending: state.reports.submit.isPending,
		errors: state.reports.submit.errors
	}
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators({ submitReport }, dispatch) }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MakeEntry))