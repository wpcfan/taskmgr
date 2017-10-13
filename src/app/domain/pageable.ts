export interface Pageable<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  'number': number;
  sort: string | null;
  numberOfElements: number;
  first: boolean;
}
