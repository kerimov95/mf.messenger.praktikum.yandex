type PlainObject<T = unknown> = {
  /* eslint-disable no-unused-vars */
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

function queryString(data: PlainObject) {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data).map((arr) => arr.join('=')).join('&');
}

function isEqual(lhs: any, rhs: any) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual((value as any), (rightValue as any))) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

function merge<T extends Record<string, unknown>>(lhs: T, rhs: T): T {
  const target = lhs as Record<string, unknown>;
  merger(rhs);

  function merger(obj: Record<string, unknown>) {
    if (obj === null) return;
    for (const prop in obj) {
      if (Object.hasOwnProperty.call(obj, prop)) {
        if (typeof obj[prop] === 'object' && !Array.isArray(obj[prop])) {
          if (!target[prop]) {
            target[prop] = {};
          };
          target[prop] = merge(
            target[prop] as Record<string, unknown>,
            obj[prop] as Record<string, unknown>,
          );
        } else {
          target[prop] = obj[prop];
        }
      }
    }
  }

  return target as T;
}


export {queryString, isPlainObject, isArray, isEqual, isArrayOrObject, merge};
