import prisma from "../../connection/connection.js";
import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  const user = await prisma.admin.findFirst({
    where: {
      username: username,
    },
  });

  if (!user) {
    return res.json({ error: "User Not Found" });
  }

  const storedHashedPassword = user.password;
  const userInputHashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const isAuthenticated = userInputHashedPassword === storedHashedPassword;

  if (isAuthenticated) {
    const token = jwt.sign({ username }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  } else {
    return res
      .status(401)
      .json({ error: "Credenziali di accesso non valide." });
  }
};

export default login;
