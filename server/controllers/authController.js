import User from "../models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
  try {
    const { name, email, password} = req.body;

  const userExist = await User.findOne({email});

  if(!userExist) {
    return res.status(400).json({
      message: 'Invalid credentials'
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.status(201).json({
    message: 'User created successfully',
    user
  });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

  const user = await User.findOne({email});

  if(!user) {
    return res.status(400).json({
      message: 'user does not exist'
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
    return res.status(400).json({
      message: 'invalid credentials'
    })
  }

  const token = jwt.sign(
    {id: user._id},
    process.env.SECRET,
    {expiresIn: '7d'}
  );

  res.status(201).json({
    message: 'log in success',
    token
  });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
