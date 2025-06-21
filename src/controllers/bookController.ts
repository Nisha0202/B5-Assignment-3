import { Request, Response, NextFunction } from 'express';
import { Book } from '../models/book.model';

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    const query: any = {};
    if (filter) query.genre = filter;

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'desc' ? -1 : 1 })
      .limit(Number(limit));

    res.json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) throw new Error('Book not found');
    res.json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) throw new Error('Book not found');
    res.json({
      success: true,
      message: 'Book updated successfully',
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) throw new Error('Book not found');
    res.json({
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};