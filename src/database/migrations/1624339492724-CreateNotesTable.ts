import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotesTable1624339492724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // tslint:disable-next-line: max-line-length
        await queryRunner.query("CREATE TABLE `note` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(1024) NOT NULL DEFAULT '', `content` varchar(16384) NOT NULL DEFAULT '', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE `note`');
    }

}
