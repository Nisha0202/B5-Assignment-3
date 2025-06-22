import { Request, Response, NextFunction } from 'express';
import { Borrow } from '../models/borrow.model';

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book, quantity, dueDate } = req.body;
    if (!book || !quantity || !dueDate) {
      throw new Error('book, quantity, and dueDate are required');
    }
    // Using static method for business logic
    const borrow = await (Borrow as any).borrowBook(book, quantity, dueDate);

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });
  } catch (err) {
    next(err);
  }
};

export const getBorrowSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Using aggregation pipeline
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      { $unwind: '$bookDetails' },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn'
          },
          totalQuantity: 1
        }
      }
    ]);


        // order fix
        const formattedSummary = summary.map(item => ({
          book: item.book,
          totalQuantity: item.totalQuantity
        }));

    res.json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: formattedSummary,
    });
  } catch (err) {
    next(err);
  }
};