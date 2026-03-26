import {closest} from "fastest-levenshtein";

export const getActivePath = (
    path: string,
    paths: string[],
    ignorePaths?: string[]
) => {
    //closesPath: 输出path值在paths数组最近的值
    // console.log(closest('fast', ['slow', 'faster', 'fastest']))
    //=> 'faster'
    const closestPath = closest(path, paths.concat(ignorePaths || []))

    //输出找到最近的值的索引
    const index = paths.indexOf(closestPath)

    return {activeIndex: index, activePath: closestPath}
}