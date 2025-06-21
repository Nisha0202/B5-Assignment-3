import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { IBook, Book } from '../models/book.model';

export interface IBorrow extends Document {
  book: Types.ObjectId | IBook;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BorrowSchema: Schema<IBorrow> = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Book reference is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer',
      },
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    }
  },
  { timestamps: true }
);

// Static method for borrow logic
BorrowSchema.statics.borrowBook = async function (bookId: string, quantity: number, dueDate: Date) {
  const book = await Book.findById(bookId);
  if (!book) throw new Error('Book not found');
  if (book.copies < quantity) throw new Error('Not enough copies available');
  book.copies -= quantity;
  await book.updateAvailability();
  const borrow = await this.create({ book: book._id, quantity, dueDate });
  return borrow;
};

export interface BorrowModel extends Model<IBorrow> {
  borrowBook(bookId: string, quantity: number, dueDate: Date): Promise<IBorrow>;
}

export const Borrow: BorrowModel = mongoose.model<IBorrow, BorrowModel>('Borrow', BorrowSchema);