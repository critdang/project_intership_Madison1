const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server-express');

const { User } = require('../../database/models');

module.exports = {
  Mutation: {
    async register(root, args, context) {
      const { email, password, firstName, lastName,phoneNumber,age,avatar } = args.input;
      return User.create({ email, password,firstName, lastName,phoneNumber,age,avatar });
    },

    async login(root, { input }, context) {
      const { email, password } = input;
      const user = await User.findOne({ where: { email } });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'mySecret');
        return { ...user.toJSON(), token };
      }
      throw new AuthenticationError('Invalid credentials');
    },
    
    
  },
};
