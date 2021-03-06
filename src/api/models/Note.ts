import {
    Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 1024, default: '' })
    public title: string;

    @Column({ length: 16384, default: '' })
    public content: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
