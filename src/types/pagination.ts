import {CommentWithMetadata} from "@/features/comment/types";

export type PaginationData<T> = {
    list: T[]
    metadata: { count: number, hasNextPage: boolean, cursor?: string }
}