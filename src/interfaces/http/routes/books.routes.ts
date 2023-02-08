import express from 'express';
import { getBooks } from '../../../controllers/books.controller';

const booksRoutes = express.Router();
booksRoutes.get('/', getBooks);

export default booksRoutes;
