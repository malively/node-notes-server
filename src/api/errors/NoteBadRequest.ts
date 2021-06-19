import { HttpError } from 'routing-controllers';

export class NoteBadRequest extends HttpError {
    constructor(errorMessage: string) {
        super(400, errorMessage);
    }
}
