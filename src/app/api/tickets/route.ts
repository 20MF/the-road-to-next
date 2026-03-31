import {searchParamsCache} from "@/features/ticket/search-params";
import {getTickets} from "@/features/ticket/queries/get-tickets";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    console.log("searchParams",searchParams)

    const untypedSearchParams = Object.fromEntries(searchParams)
    console.log("untypedSearcdParams",untypedSearchParams)

    const typedSearchParams = searchParamsCache.parse(untypedSearchParams)
    console.log("typedSearchParams",typedSearchParams)

    const {list, metadata} = await getTickets(undefined, typedSearchParams)
    return Response.json({list, metadata})
}