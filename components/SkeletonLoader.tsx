export function SkeletonLoader() {
    return (
        <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-80 mb-2 flex justify-between"></div>
            <div className="h-6 bg-gray-300 rounded w-90 mb-2 flex justify-center"></div>
            <div className="h-6 bg-gray-300 rounded w-70 mb-2 flex justify-center"></div>
        </div>
    )
}