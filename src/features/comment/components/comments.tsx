"use client"
import {CommentItem} from "@/features/comment/actions/comment-item";
import {CardCompact} from "@/components/card-compact";
import {CreateCommentForm} from "@/features/comment/components/create-comment-form";
import {DeleteCommentButton} from "@/features/comment/components/delete-comment-button";
import {CommentWithMetadata} from "@/features/comment/types";
import {Button} from "@/components/ui/button";
import {getComments} from "@/features/comment/queries/get-comments";
import {useState} from "react";
import {PaginationData} from "@/types/pagination";
import {useInfiniteQuery} from "@tanstack/react-query";

type CommentProps = {
    ticketId: string
    paginatedComments: PaginationData<CommentWithMetadata>
}
export const Comments = ({ticketId, paginatedComments}: CommentProps) => {

    const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ["comments", ticketId],
        queryFn: ({pageParam}) => getComments(ticketId, pageParam),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) =>
            lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
        initialData: {
            pages: [{
                list: paginatedComments.list,
                metadata: paginatedComments.metadata
            }],
            pageParams: [undefined]
        }
    })

    //2、每个page是我们从获取评论中返回的对象之一,
    //3、把数据扁平话,最终得到评论列表
    const comments = data?.pages.flatMap(page => page.list)

    //1、 每个单独的请求都会在本地缓存中处理一个页面
    const handleMore = () => fetchNextPage()

    const handleDeleteComment = (id: string) => {
    }

    const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
    }

    return (
        <>
            <CardCompact title="Create Comment"
                         content={<CreateCommentForm
                             ticketId={ticketId}
                             onCreateComment={handleCreateComment}
                         />}
                         description="A new comment will be created"
            />
            <div className="flex flex-col gap-x-2 ml-8">
                {comments.map(comment => (
                    <CommentItem key={comment.id}
                                 comment={comment}
                                 buttons={[
                                     ...(comment.isOwner
                                         ? [<DeleteCommentButton
                                             key="0"
                                             id={comment.id}
                                             onDeleteComment={handleDeleteComment}
                                         />]
                                         : [])
                                 ]}
                    />
                ))}
            </div>
            <div className="flex flex-col gap-y-2 ml-8">
                {hasNextPage && (
                    <Button onClick={handleMore} variant="ghost">
                        More
                    </Button>)}
            </div>
        </>
    )
}