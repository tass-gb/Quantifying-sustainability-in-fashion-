import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { getProducts } from '../api/client';
import type { ProductSummary } from '../types';

export function Home() {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts(12);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sustainability Scoring
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-2xl">
            Quantify the environmental impact of fashion products using LCA data
            for materials, manufacturing origins, and care instructions.
          </p>
          <Link
            to="/score"
            className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors"
          >
            Score a Product
          </Link>
        </div>
      </div>

      {/* How it Works */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Enter Product Details</h3>
            <p className="text-gray-600 text-sm">
              Specify materials, manufacturing origin, care instructions, and certifications
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">LCA Analysis</h3>
            <p className="text-gray-600 text-sm">
              Our algorithm calculates environmental impact using lifecycle assessment data
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Get Your Score</h3>
            <p className="text-gray-600 text-sm">
              Receive a 0-100 sustainability score with detailed breakdown by category
            </p>
          </div>
        </div>
      </div>

      {/* Sample Products */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Sample Products
          </h2>
          <Link
            to="/score"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Score your own →
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            <p className="font-medium">Failed to load products</p>
            <p className="text-sm">{error}</p>
            <p className="text-sm mt-2">
              Make sure the API is running: <code className="bg-red-100 px-1 rounded">uvicorn app.main:app --reload</code>
            </p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No products available. Start the API server to see sample products.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">
            Sustainability Scoring System - Quantifying Environmental Impact in Fashion
          </p>
        </div>
      </footer>
    </div>
  );
}
