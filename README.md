## Simple NodeJS React

- [x] React로 클라이언트 기능 구현
- [x] NodeJS로 서버 기능 구현 + MySQL 연동
- [x] 클라이언트 - 서버 연동
- [] 클라, 서버 추가 기능 구현해보기.

## 더 생각해 볼 사항들

### 프론트 & 백엔드 공통사항

- db.raw().then().catch() 이렇게 콜백 방식으로 하면, 아래와 같이 콜백 지옥이 빠질 수 있음. 해결 방법이 없을지?

```
step1(function (value1) {
    step2(function (value2) {
        step3(function (value3) {
            step4(function (value4) {
                step5(function (value5) {
                    step6(function (value6) {
                        // Do something with value6
                    });
                });
            });
        });
    });
});
```

- 비밀번호와 같은 Public Github에 공유되서는 안되는 정보들을 어떻게 처리할지? - (비밀 설정 정복 관리, 환경 변수 등 참고)

```
const db = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    database: "movie_db",
    password: "0212",
  },
});
```

### 백엔드

- 현재 knex을 사용해서 Query Builder 방식으로 처리하고 있는데.. ORM 과의 차이점은 뭐고, ORM 방식으로 (노드에서는 많이쓰이는 게 Sequelize.js 일듯?) 변경해보는 것.

  https://www.kyungyeon.dev/posts/3 <- 비교 (둘의 차이) 참고하기.

- 입력된 값에 대한 검증이 필요하지 않을까? (price 가 -1000이 들어올 수도 있고, 이름이 아무 값도 입력되지 않고 올 경우 어떻게 대응?)

```
app.post("/movie", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  ...
```
