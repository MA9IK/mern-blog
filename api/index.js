const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { validationResult } = require('express-validator');
const multer = require('multer');
const fs = require('fs');

const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

const User = require('./models/UserModel');
const Post = require('./models/PostModel');
const { registerValidator } = require('./validations/UserValidation');

const uploadMiddleware = multer({ dest: 'uploads/' });

app.use('/uploads', express.static('uploads'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect('mongodb+srv://Ivan:124567899034fefe@cluster0.wwfgmm0.mongodb.net/')
  .then(() => {
    console.log('connected');
  });

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/register', registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userDoc = await User.create({
      username: username,
      password: hashedPassword
    });
    res.json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    await User.findOne({ username: username }).then(user => {
      if (user) {
        let match = bcrypt.compareSync(password, user.password);
        if (match) {
          const token = jwt.sign({ username, id: user._id }, 'secret');
          res.cookie('token', token).json({
            id: user._id,
            username
          });
        } else {
          res.status(400).json({ error: 'Invalid Credentials' });
        }
      } else {
        res.status(400).json({ error: 'Invalid Credentials' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'Not Authorized' });
  }

  jwt.verify(token, 'secret', {}, (err, decoded) => {
    if (err) throw err;
    res.json(decoded);
  });
});

app.post('/logout', (req, res) => {
  res.clearCookie('token').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, 'secret', {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      file: newPath,
      author: info.id
    });
    res.json(postDoc);
  });
});

app.get('/post', async (req, res) => {
  res.json(
    await Post.find()
      .populate('author', 'username')
      .sort('-createdAt')
      .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  res.json(await Post.findById(req.params.id).populate('author', 'username'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
