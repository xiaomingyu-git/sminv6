import type { SortOrder } from 'antd/es/table/interface';
import { each } from 'lodash-es';
import qs from 'qs';

export const defaultPagination: PageRequest = { current: 1, pageSize: 50 };

export function toSort(sort: Record<string, SortOrder>): string[] {
  const result: string[] = [];
  each(sort, (value, key) => {
    if (value !== null) {
      result.push(`${key},${value}`);
    }
  });
  return result;
}

type Compareable = number | Date | string;
export const compare = (a: Compareable, b: Compareable) => {
  if (a < b) return -1;
  if (b < a) return 1;
  return 0;
};

export function paramsSerializer(params: Record<string, unknown>) {
  return qs.stringify(params, { arrayFormat: 'repeat' });
}
