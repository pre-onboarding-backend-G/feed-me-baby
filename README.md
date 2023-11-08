<img src="https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/0d10467a-b672-4e24-a2a8-049d31b62e23" alt="feed-me-baby" width="100%" />

# Feed Me Baby :sushi:

**메뉴 고르는 게 가장 힘든 당신에게! :eyes:**

우리 서비스는 공공데이터를 활용하여, 더 나은 다양한 음식 경험을 제공하고자 노력합니다.<br>
Feed Me Baby는 사용자 위치에 맞게 맛집 및 메뉴를 추천하며, 또한 지역 음식점 목록을 자동으로 업데이트 하고 이를 활용합니다.

<br>

## 목차 :clipboard:

- [개요](#개요)
- [사용 기술](#사용-기술)
- [파일 구조](#파일-구조)
- [API Endpoint](#api-endpoint)
- [API Reference](#api-reference)
- [프로젝트 진행 및 이슈 관리](#프로젝트-진행-및-이슈-관리)
- [구현과정(설계 및 의도)](#구현과정설계-및-의도)
- [Did You Know](#did-you-know)
- [설치](#설치)
- [팀원](#팀원)
- [참고자료](#참고자료)

<br/>

## 개요

본 서비스는 사용자가 관심 있는 지역 및 음식 카테고리에 따라 맞춤형 맛집 정보를 한눈에 볼 수 있도록 해주는 어플리케이션입니다.

이 서비스는 방문자 수, 리뷰 평점, 인기 메뉴 등의 필터링 옵션을 제공함으로써 사용자가 보다 세밀한 기준으로 맛집을 탐색하고 결정할 수 있도록 지원합니다.
이를 통해 사용자는 자신의 취향과 요구에 부합하는 최적의 식당을 효율적으로 찾아내는 경험을 할 수 있습니다.

또한, 본 서비스는 점심추천서비스를 통해, 주변 맛집을 사용자에게 제공합니다.
이와 같이 직관적이고 종합적인 맛집 검색 기능을 제공하여 사용자의 음식 탐색과 선택 과정을 간소화하고, 식도락에 관한 풍부한 정보를 신속하게 제공하는 것이 본 서비스의 핵심 목적입니다.

<br/>

## 사용 기술

<div align="left">
<br/>

언어 및 프레임워크

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

<br/>

데이터 베이스

![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

<br/>

문서화

![Swagger](https://img.shields.io/badge/swagger-%23Clojure.svg?style=for-the-badge&logo=swagger&logoColor=white)

</div>

<br/>

## 파일 구조

<details>
<summary> 파일 구조 보기 </summary>

```
src
├── restaurant
│   ├── controller
│   ├── service
│   ├── entity
│   ├── repository
│   ├── dto
│   ├── scheduler
│   └── test
├── restaurant-guide
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   └── test
├── review
│   ├── controller
│   ├── service
│   ├── entity
│   ├── repository
│   ├── dto
│   ├── decorator
│   ├── entitiy
│   ├── repository
│   └── test
├── user
│   ├── controller
│   ├── service
│   ├── entity
│   ├── repository
│   ├── dto
│   ├── decorator
│   └── test
├── auth
│   ├── controller
│   ├── service
│   ├── guard
│   ├── dto
│   ├── decorator
│   └── test
├── common
│   ├── env-validation
│   ├── exception-filter
│   ├── logger
│   └── response-entity
└── migration
```

</details>

<br/>

## API Endpoint

| API              | Endpoint    | Method  | Feature          |
| ---------------- | ----------- | ------- | ---------------- |
| auth             | /sign-up    | `POST`  | 회원가입         |
| auth             | /sign-in    | `POST`  | 로그인           |
| users            |             | `GET`   | 유저 정보 조회   |
| users            |             | `PATCH` | 유저 정보 수정   |
| reviews          |             | `POST`  | 리뷰 작성        |
| restaurant-guide |             | `GET`   | 맛집 목록 조회   |
| restaurant-guide | /city-lists | `GET`   | 지역 조회        |

<br/>

## API Reference

<details>

<summary>Swagger 이미지</summary>

![스크린샷 2023-11-08 오후 8 39 47](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/5b241a91-a740-4ce4-a8df-5452c8f5bec0)
![스크린샷 2023-11-08 오후 8 40 06](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/ee25ff75-0004-4090-bb03-36dbefcff42b)
![스크린샷 2023-11-08 오후 8 40 22](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/1b6dd53b-e0bf-42ed-adb8-1e8b484b91d6)
![스크린샷 2023-11-08 오후 8 40 32](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/649244e7-b2fc-47a4-a83a-33b4654b3342)
![스크린샷 2023-11-08 오후 8 40 49](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/fde22e26-db52-4d64-8b3e-4a89d8e688bb)
![스크린샷 2023-11-08 오후 8 41 02](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/31e41731-2e58-464b-a0c6-5a8b10ce5889)

</details>

<br/>

## 프로젝트 진행 및 이슈 관리

[![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)](https://www.notion.so/dev-j/6a83f5bfa7874dc49e4fac30653aaa53?v=25c6ca9163064a8c879dcf124a914f29&pvs=4)

<br>

## 구현과정(설계 및 의도)

<details>
<summary>맛집 목록 확장성 및 검증</summary>

- **맛집 목록 가져오기**

  1. 공간 데이터베이스를 사용하는 대신 '위도', '경도' 컬럼에서 해당하는 범위의 데이터를 가져옵니다.

  ![범위 쿼리](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/d651d976-8603-4908-b85a-21798c8d09bd)

  2. 배열 메서드 filter를 이용해서 해당 범위보다 긴 값들을 제외하고 반환 했습니다.

  ![Array.prototype.filter](https://github.com/pre-onboarding-backend-G/feed-me-baby/assets/96982072/7a7b2d28-ee00-4cc9-90d6-10fea6766ac7)

- **JSON 반환 타입**

  1. 맛집의 데이터는 이름, 위치, 평점 등이 필요합니다.
  2. 우선은 가시적인 데이터를 볼 수 있게 GeoJson 포맷에 맞춰서 JSON으로 반환합니다.
  3. GeoJson 포맷으로 `GeoJsonResponse`, `GetRestaurantsDto`를 사용하고
     추후 클라이언트 포맷에 맞춰 반환 타입을 변경, 교체할 수 있게 만들었습니다.

- **위도, 경도 범위로 Custom Validation**

  1. 쿼리 파라미터에서 위도, 경도로 위치 값을 숫자 받습니다.
  2. 현재 공공데이터가 경기도 범위인 것을 확인하여 경기도 범위 내의 사용자 위치 값만 받도록 validation을 변경했습니다.

  - 경기도 최남단 위도: 약 36.0도
  - 경기도 최북단 위도: 약 38.0도
  - 경기도 최서단 경도: 약 126.0도
  - 경기도 최동단 경도: 약 128.0도

</details>

<br/>

<details>
<summary>인증/사용자 정보</summary>

- **사용자 인증 방식으로 JWT 채택**

  1.  토큰을 클라이언트에서 관리하기 때문에 서버 자원의 오버헤드가 적음
  2.  세션 방식보다 API 서버 확장(scale out)에 용이한 점을 고려

- **DTO를 활용한 회원가입 데이터 유효성 검사**

  1.  데이터 유효성 검사에 대한 책임을 DTO로 분리(AOP)
  2.  class-validator 패키지를 활용한 데이터 검증
      - 이메일은 올바른 이메일 구조를 가져야 하고 gmail, naver, daum, kakao 등의 도메인만 허용하는 white list 설정
      - 패스워드는 8자 이상으로 알파벳 대문자와 특수문자, 숫자를 각각 최소 1개 이상 포함하는 조건으로 제한
      - 패스워드는 db 저장 시, 암호화하여 저장

- **AuthGuard를 활용한 엑세스 토큰 검증**

  1.  대부분의 기능에서 사용하는 유저 검증 로직을 AuthGuard로 분리(AOP)하여 재사용성 향상
  2.  컨트롤러의 함수 인자에서 인증된 유저 정보에 접근할 수 있도록 @UserId 데코레이터 제작

- **Unit Test 작성**

  1.  구현 의도에 맞게 동작하는지 검증하기 위한 Unit test 작성
  2.  행위 검증보다 상태 검증을 위해 Mocking 대신 Stubbing 사용
  3.  Mocking은 테스트 대상의 구현에 강하게 결합되어 구현부 변경에 취약한 반면, Stub은 변경에 유연하게 설계 가능

</details>

<br/>

<details>
<summary>데이터 동기화 고려사항</summary>

- **데이터 보호 및 접근 제어**

  1. API 키는 환경 변수를 통해 안전하게 관리되며, 코드 내에 직접적으로 노출되지 않습니다.
  2. 데이터베이스 트랜잭션은 식당 데이터 처리 시 일관성과 원자성을 보장하기 위해 사용됩니다.
  3. 예외 처리 로직을 통해 장애가 발생하더라도 시스템이 계속 작동할 수 있도록 설계 되어 있습니다.
- **데이터 검증 및 취약점 방지**

  1. 입력 데이터는 엄격하게 검증되며, 잘못된 위도나 경도 값은 거부됩니다.
  2. 전화번호는 정제 과정을 거쳐 형식이 맞지 않는 경우에는 기본값을 붙여 데이터의 일관성을 유지합니다.
- **신뢰성 및 가용성 향상**

  1. `Promise.allSettled`를 사용함으로써, 비동기 처리 중 일부 프로미스가 실패하더라도 전체 프로세스가 중단되지 않고, 가능한 많은 데이터 처리를 시도합니다.
  2. 재시도 로직을 통해 일시적인 네트워크 장애나 API 응답 문제가 발생하더라도 데이터 동기화 작업이 중단되지 않습니다.
  3. 프로그레스 바와 상세한 로깅을 통해 시스템의 현재 상태와 진행률을 모니터링할 수 있습니다.

</details>

<br/>

<details>
<summary>평가 기능 고려사항</summary>

- **맛집 평가 종합 테이블을 이용한 평점 업데이트 효율화**

  1. 평가 총점 계산 시, 맛집 평가 종합 테이블을 이용하여 테이블 조회를 최소화합니다.
  2. 맛집 테이블의 평점 정보를 맛집 평가 종합 테이블로 분리했습니다.
  3. 평가, 평가 종합 테이블을 평가 모듈에서 관리하여 테이블 캡슐화하였습니다.

- **AOP에 기반한 데이터 유효성 검사**

  1. 입력 데이터의 유효성을 검증하며, 책임을 DTO로 분리했습니다.
  2. 평가 점수와 후기의 길이의 최소값과 최대값을 정의하여 데이터의 일관성 유지합니다.

- **테스트 용이한 코드 작성**

  1. DB 관련 로직을 엔티티로 캡슐화하여 응집도를 높였습니다.
  2. 구조분해 할당을 이용하여 간결한 코드로 작성하였습니다.
  3. TypeORM 단축 속성을 이용하여 코드 중복을 최소화 하였습니다.

</details>

<br/>

## Did You Know

- [Custom Validator](https://zamoca42.github.io/blog/js-ts/nest-js/custom-validator.html)
- [맛집 목록 가져와서 지도에 표시하기](https://zamoca42.github.io/blog/js-ts/nest-js/query-range.html)

<br/>

## 설치

<details>
<summary> Feed Me baby 설치 방법 </summary>

```bash
# 패키지 설치
npm install

# 도커 빌드
docker compose up --build
```

Dev 컨테이너를 사용하기 위해서, 'Rebuild and Reopen in Container' 메뉴를 선택하시면 됩니다. (VSCODE)
.env example이 있으므로,.env example에 따라, .env를 작성하시면 됩니다.

</details>
<br/>

## 팀원


<div align="center">

<br/>

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)<br>
<a href="https://github.com/zamoca42">추연규</a> <a href="https://github.com/refigo">고미종</a> <a href="https://github.com/msleeffice">이명석</a> <a href="https://github.com/Sangun-Lee-6">이상운</a> <a href="https://github.com/hojoonSong">송호준</a>

</div>

<br/>

## 참고자료

<details>
<summary>Redis</summary>

- [NestJS에서 Redis 사용하기](https://velog.io/@yujiniii/Nest.js-%EC%97%90%EC%84%9C-Redis-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- [REDIS-📚-캐시Cache-설계-전략-지침-총정리](https://inpa.tistory.com/entry/REDIS-%F0%9F%93%9A-%EC%BA%90%EC%8B%9CCache-%EC%84%A4%EA%B3%84-%EC%A0%84%EB%9E%B5-%EC%A7%80%EC%B9%A8-%EC%B4%9D%EC%A0%95%EB%A6%AC)
- [REDIS-📚-개념-소개-사용처-캐시-세션-한눈에-쏙-정리](https://inpa.tistory.com/entry/REDIS-%F0%9F%93%9A-%EA%B0%9C%EB%85%90-%EC%86%8C%EA%B0%9C-%EC%82%AC%EC%9A%A9%EC%B2%98-%EC%BA%90%EC%8B%9C-%EC%84%B8%EC%85%98-%ED%95%9C%EB%88%88%EC%97%90-%EC%8F%99-%EC%A0%95%EB%A6%AC)

</details>


<details>
<summary>Unit Test</summary>

- [효율적인 테스트를 위한 stub 객체 활용법](https://medium.com/daangn/%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8%EB%A5%BC-%EC%9C%84%ED%95%9C-stub-%EA%B0%9D%EC%B2%B4-%ED%99%9C%EC%9A%A9%EB%B2%95-5c52a447dfb7)
- [테스트하기 좋은 코드 - 외부에 의존하는 코드 개선](https://jojoldu.tistory.com/680)
- [Stub을 이용한 Service 계층 단위 테스트하기](https://jojoldu.tistory.com/637)

</details>

<details>
<summary>Library</summary>

- [custom-validation-classes](https://github.com/typestack/class-validator#custom-validation--classes)

</details>
