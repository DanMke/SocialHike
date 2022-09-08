import express from "express";

var admin = require("firebase-admin");

const checkAuth = async (req: any, res: express.Response, next: express.NextFunction) => {
    console.log(req.headers)
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const token = req.headers.authorization.split(' ')[1];

      try {
          const idToken = await admin.auth().verifyIdToken(token)
          req.decodedToken = idToken
          return next();
      } catch {
          return res.status(401).json({ error: 'Usuário não autorizado' });
      }
  }
  return res.status(403).json({ error: 'Usuário não está autenticado' });
};

export default checkAuth;