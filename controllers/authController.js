const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const JWT_SECRET = 'claveSecreta';
const JWT_EXPIRES_IN = '10m';

async function login(req, res) {
    const { username, password } = req.body;
    const user = userModel.getUserByUsername(username);
    if (!user) {
      return res.status(403).json({ code: 403, message: "Usuario no encontrado" });
    }
      
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(403).json({ code: 403, message: "Contraseña incorrecta" });
  
    const token = jwt.sign(
        { username: user.username }, 
        JWT_SECRET, 
        {expiresIn: JWT_EXPIRES_IN}
    );
  
    return res.status(200).json({code: 200,message: "Inicio de sesión exitoso",token,});
}

async function createUser(req, res) {
    const { username, password } = req.body;
    
    if(!username || !password) {
        return res.status(400).json({ code: 400, message: 'Falta el nombre de usuario o la contraseña' });
    }

    const userExists = userModel.getUserByUsername(username);

    if(userExists) {
        return res.status(409).json({ code: 409, message: 'El usuario ya existe' });
    }

    const newUser = userModel.createUser(username, password);
    res.status(201).json({ 
        code: 201,
        message: 'Usuario creado exitosamente', 
        username: newUser.username,
        apikey: newUser.apikey
    });
}




module.exports = {login, createUser,JWT_SECRET};