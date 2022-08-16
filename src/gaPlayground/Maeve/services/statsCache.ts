import { cloneDeep } from "lodash";

export interface IStatsEntry {}

export interface IStatsCache {
    [key: string]: IStatsEntry;
}

export function createCache(): IStatsCache {
    return {};
}

export function getCacheRecord(cache: IStatsCache, key: string): IStatsEntry {
    return cache[key];
}

export function setCacheRecord(
    cache: IStatsCache,
    key: string,
    value: IStatsEntry
): IStatsCache {
    const cacheClone = cloneDeep(cache);
    cacheClone[key] = value;
    return cacheClone;
}

export default {
    createCache,
    getCacheRecord,
    setCacheRecord,
};
