import { Category } from './category';

export class Note {
  id: number;
  title: string;
  date: Date;
  content: string;
  category: Category;
}
