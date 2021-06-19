import { Service } from 'typedi';

import { Note } from '../models/Note';

export interface NoteResponse {
    id: number;
    title: string;
    content: string;
    updatedAt: Date;
    createdAt: Date;
}

@Service()
export class NotePresenter {

  public createResponse(note: Note): NoteResponse {
    return note;
  }
}
