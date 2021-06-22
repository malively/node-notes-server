import { EntityRepository, Repository } from 'typeorm';

import { Note } from '../models/Note';

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {
    public async findBySearchQuery(query: string): Promise<Note[]> {
        return await this.createQueryBuilder('note')
            .select()
            .where(`note.title LIKE '%${query}%' OR note.content LIKE '%${query}%'`)
            .getMany();
    }
}
