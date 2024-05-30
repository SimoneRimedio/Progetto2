import pkg from 'jsonwebtoken';
const { verify } = pkg;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

export default verifyToken;