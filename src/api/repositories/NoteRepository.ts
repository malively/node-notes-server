import { EntityRepository, Repository } from 'typeorm';

import { Note } from '../models/Note';

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {
    public findBySearchQuery(query: string): Promise<Note[]> {
        return this.createQueryBuilder('note')
            .select()
            .where(`note.title LIKE '%${query}%' OR note.content LIKE '%${query}%'`)
            .getMany();
    }
}
