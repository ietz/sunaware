import React, {Component} from 'react'
import PageBody from "../../app/layout/PageBody/PageBody"
import Content from "../../app/layout/Content/Content"
import './StatsPage.css'
import '../../app/components/CalendarColumn/CalendarColumn'
import CalendarColumn from "../../app/components/CalendarColumn/CalendarColumn"
import moment from 'moment'


class StatsPage extends Component {

	/**
	 * Calculates first weekday of current month
	 * @param m date
	 * @returns {moment.Moment | number}
	 */
	startMonth = (m) => {
		let currDate = m.startOf('month');
		return currDate.day();
	}

	/**
	 * Calculates how many days there are in a month
	 * @param m
	 * @returns {*|number}
	 */
	daysInMonth = (m) => {
		return m.daysInMonth();
	}

	render () {
		return(
			<PageBody>
				<Content size="large">
					<div className="month">
						<div className="left">
							&lt;
						</div>
						<div className="right">
							&gt;
						</div>
					</div>

					<div className="weekdays">
						<CalendarColumn values={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}/>
					</div>

					<div className="calendar">
						<CalendarColumn values={["1", "2", "3", "4", "5", "6", "7"]}/>
						<CalendarColumn values={["8", "9", "10", "11", "12", "13", "14"]}/>
						<CalendarColumn values={["15", "16", "17", "18", "19", "20", "21"]}/>
						<CalendarColumn values={["22", "23", "24", "25", "26", "27", "28"]}/>
						<CalendarColumn values={["29", "30", "31", "", "", "", ""]}/>
					</div>
				</Content>
			</PageBody>
		)
	}

}

export default StatsPage