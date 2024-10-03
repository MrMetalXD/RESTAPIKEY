const bcrypt = require('bcryptjs');
const { v4: uuidv4} = require('uuid');

let users = [
    {
      username: 'admin',
      password: bcrypt.hashSync('12345', 10), // Contraseña encriptada
      apikey: bcrypt.hashSync(uuidv4(), 10)
    },
    {
      username: 'user',
      password: bcrypt.hashSync('password', 10), // Contraseña encriptada
      apikey: bcrypt.hashSync(uuidv4(), 10)
    }
  ];

  function getUserByUsername(username) {
    return users.find(user => user.username === username);
  }

  function getUserByApiKey(apikey) {
    return users.find(user => bcrypt.compareSync(apikey, user.apikey));
  };

  function createUser(username, password){
    const apikey = uuidv4();
    
    const hashedPassword = bcrypt.hashSync(password, 10); // Contraseña encriptada
    const hashedApiKey = bcrypt.hashSync(apikey, 10);  // API Key encriptada

    const newUser = {
      username,
      password: hashedPassword,
      apikey: hashedApiKey
    };

    users.push(newUser);
    return {username: newUser.username, apikey};
    
  }

  module.exports = {
    getUserByUsername,
    getUserByApiKey,
    createUser
  }