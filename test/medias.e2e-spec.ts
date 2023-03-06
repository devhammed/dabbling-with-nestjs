import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Media Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/medias (GET)', () => {
    return request(app.getHttpServer())
      .get('/medias')
      .expect(200)
      .expect('Hello World!');
  });

  it('/medias/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/medias/1')
      .expect(200)
      .expect('This action returns a #1 cat');
  });
});
