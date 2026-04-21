export class AuthenticationError extends Error {
	constructor(readonly message: string) {
		super(message)
	}
}
