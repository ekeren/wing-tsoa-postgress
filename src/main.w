bring tsoa;
bring postgres;
bring cloud;

let db = new postgres.Database(
  name: "users"
);

let api = new tsoa.Service(
  controllerPathGlobs: ["./controllers/*.ts"],
  outputDirectory: "../build",
  routesDir: "../build"
) as "TOSA Service";

api.liftClient("db", db, ["connectionOptions"]);

  // new cloud.OnDeploy(inflight () => {
  //   db.query("CREATE TABLE users (
  //     id SERIAL PRIMARY KEY,
  //     name VARCHAR(255) NOT NULL,
  //     email VARCHAR(255) UNIQUE NOT NULL
  //   );");
  // });