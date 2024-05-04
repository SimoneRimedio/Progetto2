const login = (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  if (username === adminUsername && password === adminPassword) {
    return res
      .status(200)
      .json({ authenticated: true, message: "Login successful." });
  } else {
    return res
      .status(401)
      .json({ authenticated: false, error: "Invalid credentials." });
  }
};

module.exports = login;
