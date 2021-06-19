import { HttpError } from 'routing-controllers';

export class NoteNotFound extends HttpError {
    constructor() {
        super(404, 'Note not found!');
    }
}
