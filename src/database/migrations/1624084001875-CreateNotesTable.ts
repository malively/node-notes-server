import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotesTable1624084001875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('CREATE TABLE `note` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(1024) NULL, `content` varchar(16384) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE `note`');
    }

}
