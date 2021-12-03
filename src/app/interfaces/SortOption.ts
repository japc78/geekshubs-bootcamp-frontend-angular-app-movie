import { IQuery, QueryMovie, QueryTv } from './Query';
import { SortBy } from '../classes/Config';
export interface SortOption {
  id: SortBy;
  name: string;
  query?: IQuery | QueryMovie | QueryTv;
}