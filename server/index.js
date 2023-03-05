import express from 'express';
import mongoose from 'mongoose';
import { PostValidator, registerValidator } from './validations/validator.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import multer from 'multer';
import cors from 'cors';


mongoose
  .connect(
    'mongodb+srv://jakasyak:5JEbkQfnQnnzAokB@cluster0.ozmz0gl.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('DB connect successfuly');
  })
  .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidator, UserController.registration);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, PostValidator, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

app.listen(4444, (err) => {
  if (err) {
    return err;
  }
  console.log('Server works');
});
