export default {
  corsOrigin: "http://localhost:3000",
  port: 4000,
  host: "localhost",
  dbUri: "mongodb://localhost:27017/gladiator-plane-api",
  saltWorkFactor: 10,
  accessTokenTimeToLive: "15m",
  refreshTokenTimeToLive: "1y",
  privateKey: process.env.PRIVATE_KEY || "",
};
