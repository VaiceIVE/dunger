export interface CacheAuthData {
  accessToken: string;
  refreshToken: string;
  refreshTokenExp: number;
}

export interface CacheEntry {
  body: CacheAuthData;
  exp: number;
}

export type MaybePromise<T> = Promise<T> | T;

export interface ICache {
  set<T = CacheEntry>(key: string, entry: T): MaybePromise<void>;
  get<T = CacheEntry>(key: string): MaybePromise<T | undefined>;
  remove(key: string): MaybePromise<void>;
  allKeys?(): MaybePromise<string[]>;
}

export class Cache implements ICache {
  constructor(private prefix: string) {}

  public getKey(key: string) {
    return `${this.prefix}${key}`;
  }

  public set<T = CacheEntry>(key: string, entry: T) {
    localStorage.setItem(this.getKey(key), JSON.stringify(entry));
  }

  public get<T = CacheEntry>(key: string): T | undefined {
    const json = window.localStorage.getItem(this.getKey(key));

    if (!json) {
      return;
    }

    try {
      return JSON.parse(json) as T;
    } catch (e) {
      return;
    }
  }

  public remove(key: string) {
    localStorage.removeItem(this.getKey(key));
  }

  public allKeys() {
    return Object.keys(window.localStorage).filter((key) => key.startsWith(this.prefix));
  }
}
