import {
    Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 1024, nullable: true })
    public title: string;

    @Column({ length: 16384, nullable: true })
    public content: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
