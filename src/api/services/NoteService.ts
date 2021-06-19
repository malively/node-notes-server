import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { NoteRequest } from '../controllers/NoteController';
import { NoteBadRequest } from '../errors/NoteBadRequest';
import { Note } from '../models/Note';
import { NoteRepository } from '../repositories/NoteRepository';

@Service()
export class NoteService {

    constructor(
        @OrmRepository() private noteRepository: NoteRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async find(): Promise<Note[]> {
        this.log.info('Find all notes');
        return this.noteRepository.find();
    }

    public async search(query: string): Promise<Note[]> {
        this.log.info('Find all notes');
        return this.noteRepository.findBySearchQuery(query);
    }

    public async findOne(id: number): Promise<Note | undefined> {
        this.log.info(`Find note for id ${id}`);
        return this.noteRepository.findOne({ id });
    }

    public async create(title: string, content: string): Promise<Note> {
        const note = new Note();
        note.title = title;
        note.content = content;

        this.log.info('Create a new note => ', note.toString());
        this.validateNote(note);
        const newnote = await this.noteRepository.save(note);
        return newnote;
    }

    public async createBulk(notes: NoteRequest[]): Promise<Note[]> {
        const createdNotes = [];

        for (const noteRequest of notes) {
            const createdNote = await this.create(noteRequest.title, noteRequest.content);
            createdNotes.push(createdNote);
        }

        return createdNotes;
    }

    public async update(id: number, title: string, content: string): Promise<Note> {
        const note = new Note();
        note.title = title;
        note.content = content;
        note.id = id;

        this.log.info('Update a note');
        this.validateNote(note);
        return this.noteRepository.save(note);
    }

    public async updateBulk(notes: NoteRequest[]): Promise<Note[]> {
        const updatedNotes = [];

        for (const noteRequest of notes) {
            const updatedNote = await this.update(noteRequest.id, noteRequest.title, noteRequest.content);
            updatedNotes.push(updatedNote);
        }

        return updatedNotes;
    }

    public async delete(id: number): Promise<void> {
        this.log.info('Delete a note');
        await this.noteRepository.delete(id);
        return;
    }

    private validateNote(note: Note): void {
        if (!note.title && !note.content) {
            throw new NoteBadRequest('Note must contain at least a title or content');
        }
    }

}
