import {
    Body, Delete, Get, HttpCode, JsonController, OnUndefined, Param, Post, Put, QueryParam
} from 'routing-controllers';

import { NotePresenter, NoteResponse } from '../presenters/NotePresenter';
import { NoteService } from '../services/NoteService';
import { BulkUpdateNoteRequest, DeleteNoteRequest, NoteRequest } from './requests/NoteRequests';

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

    @Get('/:id([0-9]+)')
    public async one(@Param('id') id: number): Promise<NoteResponse> {
        const note = await this.noteService.findOne(id);
        return this.notePresenter.createResponse(note);
    }

    @HttpCode(201)
    @Post()
    public async create(@Body() noteRequest: NoteRequest): Promise<NoteResponse> {
        const note = await this.noteService.create(noteRequest);
        return this.notePresenter.createResponse(note);
    }

    @Put('/:id([0-9]+)')
    public async update(@Param('id') id: number, @Body() noteRequest: NoteRequest): Promise<NoteResponse> {
        const note = await this.noteService.update(id, noteRequest);
        return this.notePresenter.createResponse(note);
    }

    @Delete('/:id([0-9]+)')
    @OnUndefined(200)
    public async delete(@Param('id') id: number): Promise<void> {
        return await this.noteService.delete(id);
    }

    @HttpCode(201)
    @Post('/bulk')
    public async createBulk(@Body({ required: true }) body: NoteRequest[]): Promise<any[]> {
        return await this.noteService.createBulk(body);
    }

    @Put('/bulk')
    public async updateBulk(@Body({ required: true }) body: BulkUpdateNoteRequest[]): Promise<any[]> {
        return await this.noteService.updateBulk(body);
    }

    @Delete('/bulk')
    public async deleteBulk(@Body({ required: true }) body: DeleteNoteRequest[]): Promise<any[]> {
        return await this.noteService.deleteBulk(body);
    }
}
