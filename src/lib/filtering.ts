import { BaseFilterParams, FilterConfig } from '@/types/filtering';
import { Prisma } from '@prisma/client';

export function parseFilterParams<T extends BaseFilterParams>(
  searchParams:
    | URLSearchParams
    | { [key: string]: string | string[] | undefined },
  config: FilterConfig<T>
): Partial<T> {
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

  const filters: Partial<T> = {};

  for (const [key, filterConfig] of Object.entries(config)) {
    const paramValue = getParam(key);

    if (paramValue === null || paramValue === undefined) {
      if (filterConfig.defaultValue !== undefined) {
        filters[key as keyof T] = filterConfig.defaultValue;
      }
      continue;
    }

    if (filterConfig.type === 'enum' && filterConfig.enumValues) {
      if (filterConfig.enumValues.includes(paramValue)) {
        filters[key as keyof T] = paramValue as T[keyof T];
      }
    } else if (filterConfig.type === 'boolean') {
      filters[key as keyof T] = (paramValue ===
        'true') as unknown as T[keyof T];
    } else if (filterConfig.type === 'string') {
      filters[key as keyof T] = paramValue as T[keyof T];
    }
  }

  return filters;
}

export function buildPrismaWhereClause<T extends BaseFilterParams>(
  filters: Partial<T>
  // @ts-expect-error this works but is throwing a warning anyway
): Prisma.SubscriberWhereInput {
  // @ts-expect-error this works but is throwing a warning anyway
  const where: Prisma.SubscriberWhereInput = {};

  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === 'all') {
      continue;
    }

    if (key === 'search') {
      where.email = {
        contains: value as string,
        mode: 'insensitive',
      };
    } else if (key === 'status' && value !== 'all') {
      where.status = value as 'SUBSCRIBED' | 'UNSUBSCRIBED';
    } else if (key === 'verified' && value !== 'all') {
      where.verified = value === 'verified';
    }
  }

  return where;
}
