
const ProductSkeleton = () => (
  <div className="flex flex-col gap-4 animate-pulse">
    {/* Image Placeholder */}
    <div className="aspect-square w-full bg-gray-200 rounded-2xl" />
    {/* Title Placeholder */}
    <div className="h-4 w-3/4 bg-gray-200 rounded" />
    {/* Price Placeholder */}
    <div className="h-4 w-1/4 bg-gray-200 rounded" />
  </div>
);

export default ProductSkeleton;