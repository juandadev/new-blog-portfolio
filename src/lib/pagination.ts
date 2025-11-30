import { PaginationParams, PaginationMeta } from '@/types/pagination';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 5;
const MIN_PAGE = 1;
const MIN_PAGE_SIZE = 1;
const MAX_PAGE_SIZE = 100;

export function parsePaginationParams(
  searchParams:
    | URLSearchParams
    | { [key: string]: string | string[] | undefined }
): PaginationParams {
  const getParam = (key: string): string | null => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.get(key);
    }

    const value = searchParams[key];

    if (Array.isArray(value)) {
      return value[0] || null;
    }

    return value || null;
  };

  const pageParam = getParam('page');
  const pageSizeParam = getParam('pageSize');

  const page = pageParam
    ? Math.max(MIN_PAGE, parseInt(pageParam, 10) || DEFAULT_PAGE)
    : DEFAULT_PAGE;
  const pageSize = pageSizeParam
    ? Math.max(
        MIN_PAGE_SIZE,
        Math.min(
          MAX_PAGE_SIZE,
          parseInt(pageSizeParam, 10) || DEFAULT_PAGE_SIZE
        )
      )
    : DEFAULT_PAGE_SIZE;

  return { page, pageSize };
}

export function calculatePaginationMeta(
  totalItems: number,
  page: number,
  pageSize: number
): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  return {
    page: currentPage,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
