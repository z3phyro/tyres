export interface TPager<T> {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  pagedItems: T[];
}
export function createPager<T>(data: T[], pageSize: number, pageNumber: number): TPager<T> {
  const pager: TPager<T> = {} as TPager<T>; pager.pageNumber = pageNumber;
  pager.pageSize = pageSize;
  pager.totalItems = data.length;
  pager.totalPages = Math.ceil(data.length / pageSize);
  pager.pagedItems = data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  return pager;
}