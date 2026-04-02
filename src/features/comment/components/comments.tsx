"use client"
import {CommentItem} from "@/features/comment/actions/comment-item";
import {CardCompact} from "@/components/card-compact";
import {CreateCommentForm} from "@/features/comment/components/create-comment-form";
import {DeleteCommentButton} from "@/features/comment/components/delete-comment-button";
import {CommentWithMetadata} from "@/features/comment/types";
import {Button} from "@/components/ui/button";
import {getComments} from "@/features/comment/queries/get-comments";
import {useEffect, useState} from "react";
import {PaginationData} from "@/types/pagination";
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {useInView} from "react-intersection-observer";
import {Skeleton} from "@/components/ui/skeleton";

type CommentProps = {
    ticketId: string
    paginatedComments: PaginationData<CommentWithMetadata>
}
export const Comments = ({ticketId, paginatedComments}: CommentProps) => {
    const queryKey = ["comments", ticketId]

    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch} = useInfiniteQuery({
        queryKey,
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

    const queryClient = useQueryClient()

    const handleDeleteComment = (id: string) => queryClient.invalidateQueries({queryKey})

    const handleCreateComment = () => queryClient.invalidateQueries({queryKey})

    const {ref, inView} = useInView()

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage)
            fetchNextPage()
    }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

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

                {isFetchingNextPage && (
                    <>
                        <div className="flex gap-x-2">
                            <Skeleton className="h-[82px] w-full"/>
                            <Skeleton className="h-[40px] w-[40px]"/>
                        </div>
                        <div className="flex gap-x-2">
                            <Skeleton className="h-[82px] w-full"/>
                            <Skeleton className="h-[40px] w-[40px]"/>
                        </div>
                    </>
                )}
            </div>

            <div ref={ref}>
                {!hasNextPage && (
                    <p className="text-right text-xs italic">No more comments.</p>
                )}
            </div>
        </>
    )
}