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
    return res
      .status(200)
      .json({ authenticated: true, message: "Login successful." });
  } else {
    return res
      .status(401)
      .json({ authenticated: false, error: "Invalid credentials." });
  }
};

export default login;
