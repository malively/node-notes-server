import {
    Body, BodyParam, Delete, Get, HttpCode, JsonController, OnUndefined, Param, Post, Put,
    QueryParam
} from 'routing-controllers';

import { NoteNotFound } from '../errors/NoteNotFound';
import { Note } from '../models/Note';
import { NotePresenter, NoteResponse } from '../presenters/NotePresenter';
import { NoteService } from '../services/NoteService';

export class NoteRequest {
    public title: string;
    public content: string;
    public id?: number;
}

@JsonController('/notes')
export class NoteController {

    constructor(
        private noteService: NoteService,
        private notePresenter: NotePresenter
    ) { }

    @Get()
    public async find(): Promise<NoteResponse[]> {
        const notes = await this.noteService.find();
        return notes.map(note => this.notePresenter.createResponse(note));
    }

    @Get('/search')
    public async search(@QueryParam('q', { required: true }) query: string): Promise<NoteResponse[]> {
        const notes = await this.noteService.search(query);
        return notes.map(note => this.notePresenter.createResponse(note));
    }

    @Get('/:id')
    @OnUndefined(NoteNotFound)
    public async one(@Param('id') id: number): Promise<NoteResponse | undefined> {
        const note = await this.noteService.findOne(id);
        return this.notePresenter.createResponse(note);
    }

    @HttpCode(201)
    @Post()
    public async create(@BodyParam('title') title: string, @BodyParam('content') content: string): Promise<Note> {
        const note = await this.noteService.create(title, content);
        return this.notePresenter.createResponse(note);
    }

    @HttpCode(201)
    @Post('/bulk')
    public async createBulk(@Body({ required: true }) body: NoteRequest[]): Promise<NoteResponse[]> {
        const createdNotes = await this.noteService.createBulk(body);

        return createdNotes.map(note => this.notePresenter.createResponse(note));
    }

    @Put('/bulk')
    public async updateBulk(@Body({ required: true }) body: NoteRequest[]): Promise<NoteResponse[]> {
        const updatedNotes = await this.noteService.updateBulk(body);

        return updatedNotes.map(note => this.notePresenter.createResponse(note));
    }

    @Delete('/bulk')
    @OnUndefined(200)
    public async deleteBulk(@Body({ required: true }) body: NoteRequest[]): Promise<void> {
        console.log('inside bulk delete');
        for (const noteBody of body) {
            await this.noteService.delete(noteBody.id);
        }
    }

    @Put('/:id')
    public async update(@Param('id') id: number, @BodyParam('title') title: string, @BodyParam('content') content: string): Promise<Note> {
        return await this.noteService.update(id, title, content);
    }

    @Delete('/:id')
    @OnUndefined(200)
    public async delete(@Param('id') id: number): Promise<void> {
        return await this.noteService.delete(id);
    }
}
