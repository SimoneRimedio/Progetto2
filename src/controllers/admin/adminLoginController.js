
const login = (res,req) => {
    const { username, password } = req.body;

    const admin_username = process.env.ADMIN_USERNAME;
    const admin_password = process.env.ADMIN_PASSWORD;

    if(username === admin_username && password === admin_password)
    {
        res.send(true);
    }
    else
    {
        res.send(false);
    }
};

module.exports = login;