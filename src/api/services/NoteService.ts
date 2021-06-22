import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import {
    BulkUpdateNoteRequest, DeleteNoteRequest, NoteRequest
} from '../controllers/requests/NoteRequests';
import { NoteBadRequest } from '../errors/NoteBadRequest';
import { NoteNotFound } from '../errors/NoteNotFound';
import { Note } from '../models/Note';
import { NoteRepository } from '../repositories/NoteRepository';

@Service()
export class NoteService {
    constructor(
        @OrmRepository() private noteRepository: NoteRepository
    ) { }

    public async find(): Promise<Note[]> {
        return this.noteRepository.find();
    }

    public async search(query: string): Promise<Note[]> {
        return this.noteRepository.findBySearchQuery(query);
    }

    public async findOne(id: number): Promise<Note | undefined> {
        return await this.findNoteOrThrow(id);
    }

    public async create(noteRequest: NoteRequest): Promise<Note> {
        const note = new Note();
        note.title = noteRequest.title;
        note.content = noteRequest.content;

        this.validateNote(note);
        const newnote = await this.noteRepository.save(note);
        return newnote;
    }

    public async createBulk(notes: NoteRequest[]): Promise<any[]> {
        const createdNotes = [];

        for (const noteRequest of notes) {
            try {
                const createdNote = await this.create(noteRequest);
                createdNotes.push({ created: true, error: false, note: createdNote });
            } catch (e) {
                createdNotes.push({ created: false, error: true, note: noteRequest, error_message: e });
            }
        }

        return createdNotes;
    }

    public async update(id: number, noteRequest: NoteRequest): Promise<Note> {
        const note = await this.findNoteOrThrow(id);
        note.title = noteRequest.title;
        note.content = noteRequest.content;

        this.validateNote(note);
        return await this.noteRepository.save(note);
    }

    public async updateBulk(notes: BulkUpdateNoteRequest[]): Promise<any[]> {
        const updatedNotes = [];

        for (const noteRequest of notes) {
            try {
                const updatedNote = await this.update(noteRequest.id, noteRequest);
                updatedNotes.push({ updated: true, error: false, note: updatedNote });
            } catch (e) {
                updatedNotes.push({ updated: false, error: true, note: noteRequest, error_message: e });
            }
        }

        return updatedNotes;
    }

    public async delete(id: number): Promise<void> {
        await this.findNoteOrThrow(id);
        await this.noteRepository.delete(id);
        return;
    }

    public async deleteBulk(notes: DeleteNoteRequest[]): Promise<any[]> {
        const deletedNotes = [];

        for (const noteRequest of notes) {
            try {
                await this.delete(noteRequest.id);
                deletedNotes.push({ deleted: true, error: false, id: noteRequest.id });
            } catch (e) {
                deletedNotes.push({ deleted: false, error: true, id: noteRequest.id, error_message: e });
            }
        }

        return deletedNotes;
    }

    private validateNote(note: Note): void {
        if (!note.title && !note.content) {
            throw new NoteBadRequest('Note must contain at least a title or content');
        }
    }

    private async findNoteOrThrow(id: number): Promise<Note> {
        const note = await this.noteRepository.findOne(id);
        if (!note) {
            throw new NoteNotFound();
        }

        return note;
    }
}
