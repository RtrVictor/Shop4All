import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    password: bcrypt.hashSync('1234', 10),
    email: 'admin@email.com',
    isAdmin: true,
  },
  {
    name: 'Victor Rotaru',
    password: bcrypt.hashSync('1234', 10),
    email: 'victor@email.com',
    isAdmin: false,
  },
  {
    name: 'Valy Popa',
    password: bcrypt.hashSync('1234', 10),
    email: 'valy@email.com',
    isAdmin: false,
  },
]

export default users
