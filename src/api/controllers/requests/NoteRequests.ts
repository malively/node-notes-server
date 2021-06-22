export class NoteRequest {
    public title: string;
    public content: string;
}

export class BulkUpdateNoteRequest {
    public title: string;
    public content: string;
    public id: number;
}

export class DeleteNoteRequest {
    public id: number;
}
