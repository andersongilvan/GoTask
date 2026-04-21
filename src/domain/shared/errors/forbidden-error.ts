export class ForbiddenError extends Error {
	constructor(readonly message: string) {
		super(message)
	}
}
