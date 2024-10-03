const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const bycrypt = require('bcryptjs');
const JWT_SECRET = require('../controllers/authController').JWT_SECRET;


function authenticateApiKey(req, res, next) {
    const { apikey } = req.body;

    if(!apikey) {
        return res.status(403).json({ code: 403, message: 'Se requiere una API Key' });
    }

    const user = userModel.getUserByApiKey(apikey);
    if(!user) {
        return res.status(403).json({ code: 403, message: 'API Key incorrecta' });
    }

    req.user = user;
    next();
}

module.exports = authenticateApiKey;