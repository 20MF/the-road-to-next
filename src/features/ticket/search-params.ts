import {createSearchParamsCache, parseAsString, parseAsInteger} from "nuqs/server";

export const searchParser = parseAsString.withDefault("").withOptions({
    //是否向服务器发送更新状态,false是发,true不发
    shallow: false,
    //检测当前值是否是默认值
    clearOnDefault: true
})

export const sortOption = {
    shallow: false,
    clearOnDefault: true
}

export const paginationOption = {
    shallow: false,
    clearOnDefault: true
}

export const sortParser = {
    sortKey: parseAsString.withDefault("createdAt"),
    sortValue: parseAsString.withDefault("desc")
}

export const paginationParser = {
    page: parseAsInteger.withDefault(0),
    size: parseAsInteger.withDefault(0)
}


export const searchParamsCache = createSearchParamsCache({
    search: searchParser,
    ...sortParser,
    ...paginationParser
})


export type ParsedSearchParams = Awaited<typeof searchParamsCache.parse>