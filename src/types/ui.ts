import type { Category } from '../../content/categories';

export interface FilterState {
  search: string;
  category: Category | null;
  threatLevel: number | null;
}
