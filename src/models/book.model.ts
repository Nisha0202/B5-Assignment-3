import mongoose, { Schema, Document, Model } from 'mongoose';

export type GenreType = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';

export interface IBook extends Document {
  title: string;
  author: string;
  genre: GenreType;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  updateAvailability(): Promise<void>;
}

const BookSchema: Schema<IBook> = new Schema<IBook>(
  {
    title: { type: String, required: [true, 'Title is required'] },
    author: { type: String, required: [true, 'Author is required'] },
    genre: {
      type: String,
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
      required: [true, 'Genre is required'],
    },
    isbn: { type: String, required: [true, 'ISBN is required'], unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: [true, 'Copies is required'],
      min: [0, 'Copies must be a positive number'],
      validate: {
        validator: Number.isInteger,
        message: 'Copies must be an integer',
      },
    },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Instance method to update availability based on copies
BookSchema.methods.updateAvailability = async function () {
  this.available = this.copies > 0;
  await this.save();
};

// Pre 'save' middleware to ensure available flag is correct
BookSchema.pre<IBook>('save', function (next) {
  this.available = this.copies > 0;
  next();
});

//Post 'findOneAndUpdate' middleware to update available after update
BookSchema.post('findOneAndUpdate', async function (doc: IBook) {
  if (doc) {
    doc.available = doc.copies > 0;
    await doc.save();
  }
});

BookSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  }
});

export const Book: Model<IBook> = mongoose.model<IBook>('Book', BookSchema);