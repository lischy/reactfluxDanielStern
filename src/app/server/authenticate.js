import uuid from "uuid";
import md5 from "md5";
import { connectDB } from "./connect-db";

const authenticationTokens = [];
async function assembleUserState(user) {
  let db = await connectDB();
  let tasks = await db.collection(`tasks`).find({ owner: user.id }).toArray();
  let groups = await db.collection(`groups`).find({ owner: user.id }).toArray();

  return {
    tasks,
    groups,
    session: { authentiacted: `AUTHENTICATED`, id: user.id },
  };
}
export const authenticationRoute = (app) => {
  app.post("/authenticate", async (req, res) => {
    let { username, password } = req.body;
    try {
      let db = await connectDB();
      let collection = db.collection(`users`);

      let user = await collection.findOne({ name: username });
      if (!user) {
        return res.status(500).send({ message: "User not found." });
      }
      let hash = md5(password);
      let passwordCorrect = hash === user.passwordHash;
      if (!passwordCorrect) {
        return res.status(500).send({ message: "Password is incorrect." });
      }
      let token = uuid();
      authenticationTokens.push({
        token,
        userID: user.id,
      });
      let state = await assembleUserState(user);
      res.send({ token, state });
    } catch (exception) {
      res.send(exception);
      console.log(exception.stack);
    }
  });
};