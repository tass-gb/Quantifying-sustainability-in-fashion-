import type { ProductSummary } from '../types';

interface ProductCardProps {
  product: ProductSummary;
  onClick?: () => void;
}

function getScoreBadgeColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 60) return 'bg-lime-100 text-lime-800';
  if (score >= 40) return 'bg-yellow-100 text-yellow-800';
  if (score >= 20) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const badgeColor = getScoreBadgeColor(product.score);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
    >
      {/* Score Badge */}
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${badgeColor}`}>
          {Math.round(product.score)}/100
        </span>
        <span className="text-xs text-gray-400 uppercase">{product.category}</span>
      </div>

      {/* Product Info */}
      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
        {product.product_name}
      </h3>
      <p className="text-sm text-gray-500 mb-2">{product.brand}</p>

      {/* Subcategory & Price */}
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{product.subcategory}</span>
        {product.price && (
          <span className="font-medium text-gray-700">{product.price}</span>
        )}
      </div>
    </div>
  );
}
