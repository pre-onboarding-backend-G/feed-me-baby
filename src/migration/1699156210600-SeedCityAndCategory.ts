import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCityAndCategory1699156210600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO city (name) VALUES
      ('고양시'), ('안양시'), ('화성시'), ('평택시'), ('안산시'),
      ('수원시'), ('파주시'), ('이천시'), ('포천시'), ('광주시'),
      ('성남시'), ('안성시'), ('용인시'), ('남양주시'), ('김포시'),
      ('구리시'), ('과천시'), ('시흥시'), ('동두천시'), ('의정부시'),
      ('군포시'), ('오산시'), ('부천시'), ('연천군'), ('양주시'),
      ('하남시'), ('의왕시'), ('여주시'), ('광명시'), ('가평군'), ('양평군');
    `);

    await queryRunner.query(`
      INSERT INTO category (name) VALUES
      ('한식'), ('식육(숯불구이)'), ('김밥(도시락)'), ('호프/통닭'), ('기타'),
      ('중국식'), ('통닭(치킨)'), ('일식'), ('탕류(보신용)'), ('경양식'),
      ('분식'), ('회집'), ('정종/대포집/소주방'), ('키즈카페'), ('까페'),
      ('횟집'), ('뷔페식'), ('냉면집'), ('패스트푸드'), ('외국음식전문점(인도,태국등)'),
      ('복어취급'), ('패밀리레스트랑'), ('라이브카페'), ('출장조리'),
      ('감성주점'), ('전통찻집'), ('이동조리');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // City 테이블에서 모든 데이터 삭제
    await queryRunner.query(`DELETE FROM city;`);

    // Category 테이블에서 모든 데이터 삭제
    await queryRunner.query(`DELETE FROM category;`);
  }
}
