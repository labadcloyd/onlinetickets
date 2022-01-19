export class DatabaseConnectionError extends Error {
	statusCode = 500
	reason = 'Error in connecting to database'
	constructor() {
		super()

		//Only because we are extending a built in class
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
	}

	serializeErrors() {
		return [
			{ message: this.reason }
		]
	}
}