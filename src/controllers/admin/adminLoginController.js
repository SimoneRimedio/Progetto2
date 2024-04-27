const login = (req, res) => {
    const { username, password } = req.body;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
        return res.status(400).json({ "error": "Username and password are required." });
    }

    if (username == adminUsername && password == adminPassword) {
        return res.json({ "response": true });
    } else {
        return res.json({ "response": false });
    }
};

module.exports = login;
