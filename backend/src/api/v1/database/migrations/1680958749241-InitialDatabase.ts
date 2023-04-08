import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1680958749241 implements MigrationInterface {
    name = 'InitialDatabase1680958749241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`categories\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`blogs\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`title\` varchar(20) NULL,
                \`content\` text NULL,
                \`user_id\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`avatar\` varchar(255) NULL,
                \`email\` varchar(255) NULL,
                \`name\` varchar(255) NULL,
                \`password\` varchar(255) NULL,
                \`isAdmin\` tinyint NOT NULL DEFAULT 0,
                \`verify\` tinyint NOT NULL DEFAULT 0,
                \`token\` varchar(255) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`blogs_categories\` (
                \`blog\` int NOT NULL,
                \`category\` int NOT NULL,
                INDEX \`IDX_f2329414d1d8d00479d3e8adf2\` (\`blog\`),
                INDEX \`IDX_ac6ec75ba584c8967f9c84be3b\` (\`category\`),
                PRIMARY KEY (\`blog\`, \`category\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`blogs\`
            ADD CONSTRAINT \`FK_57d7c984ba4a3fa3b4ea2fb5553\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`blogs_categories\`
            ADD CONSTRAINT \`FK_f2329414d1d8d00479d3e8adf26\` FOREIGN KEY (\`blog\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`blogs_categories\`
            ADD CONSTRAINT \`FK_ac6ec75ba584c8967f9c84be3b0\` FOREIGN KEY (\`category\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`blogs_categories\` DROP FOREIGN KEY \`FK_ac6ec75ba584c8967f9c84be3b0\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`blogs_categories\` DROP FOREIGN KEY \`FK_f2329414d1d8d00479d3e8adf26\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`blogs\` DROP FOREIGN KEY \`FK_57d7c984ba4a3fa3b4ea2fb5553\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_ac6ec75ba584c8967f9c84be3b\` ON \`blogs_categories\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_f2329414d1d8d00479d3e8adf2\` ON \`blogs_categories\`
        `);
        await queryRunner.query(`
            DROP TABLE \`blogs_categories\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`blogs\`
        `);
        await queryRunner.query(`
            DROP TABLE \`categories\`
        `);
    }

}
