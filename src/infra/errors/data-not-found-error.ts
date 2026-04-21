export class DataNotFound extends Error {
	constructor(readonly message: string) {
		super(message)
	}
}
