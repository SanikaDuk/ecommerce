const ProductSkeleton = () => {
  return (
    <div className="skeu-card space-y-0">
      <div className="aspect-[3/4] animate-shimmer m-1 rounded-sm" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 animate-shimmer rounded-sm" />
        <div className="h-4 w-3/4 animate-shimmer rounded-sm" />
        <div className="h-3 w-1/3 animate-shimmer rounded-sm" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
