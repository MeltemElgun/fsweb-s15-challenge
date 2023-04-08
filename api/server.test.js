const supertest = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});

// testleri buraya yazın
test("[0] Testler çalışır durumda]", () => {
  expect(true).toBe(true);
});

describe("Auth test", () => {
  it("[1] Register payload dolu başarılı sonuç", async () => {
    let sampleUser = {
      username: "veysel12",
      password: "1234",
      rolename: "admin",
    };
    const res = await supertest(server)
      .post("/api/auth/register")
      .send(sampleUser);
    expect(res.status).toBe(201);
    expect(res.body.user_id).toBeGreaterThan(0);
  });
  it("[2] Register payload boş başarısız sonuç", async () => {
    let sampleUser = { username: "meltem12" };
    const res = await supertest(server)
      .post("/api/auth/register")
      .send(sampleUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("username veya password eksik");
  });
  it("[3] Login Şifre yanlış başarısız sonuç", async () => {
    let sampleUser = { username: "meltem", password: "12345" };
    const res = await supertest(server)
      .post("/api/auth/login")
      .send(sampleUser);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Geçersiz kriter");
  });
  it("[4] Login doğru payload başarılı token", async () => {
    let sampleUser = { username: "meltem", password: "1234" };
    const res = await supertest(server)
      .post("/api/auth/login")
      .send(sampleUser);
    expect(res.status).toBe(200);
    expect(res.body.token).not.toBeNull();
  });
  it("[5] Bilmeceler tokensiz açılmaz", async () => {
    const res = await supertest(server).get("/api/bilmeceler");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("token gereklidir");
  });
  it("[6] Bilmeceler token ile listeleniyor", async () => {
    let sampleUser = { username: "meltem", password: "1234" };
    const loginResult = await supertest(server)
      .post("/api/auth/login")
      .send(sampleUser);

    const res = await supertest(server)
      .get("/api/bilmeceler")
      .set("authorization", loginResult.body.token);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
  });
});
