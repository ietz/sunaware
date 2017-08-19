import {SYNCHRONIZE_TIMER, TOGGLE_TIMER} from './types'

export function synchronizeTimer() {
	return {
		'BAQEND': {
			type: SYNCHRONIZE_TIMER,
			payload: db => db.Timer.find().equal('user', db.User.me).descending('start').limit(1).resultStream()
		}
	}
}

export function toggleTimer() {
	return {
		'BAQEND': {
			type: TOGGLE_TIMER,
			payload: db => {
				return db.Timer.find().equal('user', db.User.me).descending('start').singleResult(timer => {
					if (!timer || timer.end) {
						return new db.Timer().save();
					} else {
						timer.end = new Date();
						return timer.save();
					}
				})
			}
		}
	}
}
