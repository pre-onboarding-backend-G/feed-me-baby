<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 커밋 템플릿 적용 방법

```bash
# 로컬 환경에서 커밋 템플릿 적용
git config --local commit.template .gitmessage.txt

# 커밋 템플릿으로 커밋
git commit
```

## vscode 확장앱 설치

<img width="1635" alt="스크린샷 2023-10-27 오후 10 16 17" src="https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/eda1da6a-d3f1-4af4-adb4-6e84f6f3c87a">

## 처음 로컬 환경에서 도커 시작

```bash
# 빌드 후 시작
docker compose up --build
# 빌드가 완료되면 도커 종료
```

![스크린샷 2023-11-01 오후 12 52 33](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/ecde9923-53a3-42f7-9daa-152f63592510)

## DevContainer로 시작

- [DevContainer란?](https://zamoca42.github.io/blog/etc/docker/dev-container.html)

1. 명령팔레트에서 `F1` 누르고 컨테이너 다시 빌드하고 다시 열기 선택

    ![스크린샷 2023-11-01 오후 12 58 45](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/382597d1-1f83-44f6-95ab-eb819efdc74b)

2. 기다리기 (오래 걸림)

3. 왼쪽 아래 상태바를 확인

    ![스크린샷 2023-11-01 오후 12 47 10](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/df9c1158-aaa1-4a87-9550-3df51ce45aac)

## Nest - TypeORM - Postgres 설정 과정 요약

- [NestJS-TypeORM 문서](https://docs.nestjs.com/recipes/sql-typeorm#getting-started)

postgresql 연결 확인

![스크린샷 2023-11-01 오후 1 55 44](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/70c52f8f-8e06-4c9f-b3e9-d6ac0a92efc5)

pgadmin에 postgresql 연결

![스크린샷 2023-11-01 오후 2 06 18](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/20cb6666-8612-4325-818e-02df7220be23)

pgadmin 연결 확인

![스크린샷 2023-11-01 오후 2 06 48](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/3e0fde53-64c4-4894-b81a-d2ce20f5b60b)

nest 연결 확인

![스크린샷 2023-11-01 오후 2 17 51](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/7214da31-ce47-4d02-a15b-f94bf1ec70cb)
