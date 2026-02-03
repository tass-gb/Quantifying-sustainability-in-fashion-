import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScoreForm } from '../components/ScoreForm';
import { ScoreGauge } from '../components/ScoreGauge';
import { ScoreBreakdown } from '../components/ScoreBreakdown';
import { scoreProduct, predictPrice } from '../api/client';
import type { ProductInput, ScoreResponse, PricePredictionResponse } from '../types';

export function ScoreProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScoreResponse | null>(null);
  const [pricePrediction, setPricePrediction] = useState<PricePredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<ProductInput | null>(null);

  const handleSubmit = async (product: ProductInput) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setPricePrediction(null);
    setLastInput(product);

    try {
      const scoreResult = await scoreProduct(product);
      setResult(scoreResult);

      // Also get price prediction
      try {
        const priceResult = await predictPrice({
          score: scoreResult.final_score,
          brand: product.brand || 'Unknown',
          category: product.category || 'Other',
          subcategory: product.subcategory || 'Other',
        });
        setPricePrediction(priceResult);
      } catch {
        // Price prediction is optional, don't show error
        console.log('Price prediction not available');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate score');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setPricePrediction(null);
    setError(null);
    setLastInput(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-green-600 hover:text-green-700 font-medium">
            ← Back to Home
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">Score a Product</h1>
          <div className="w-24"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!result ? (
          <>
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            <ScoreForm onSubmit={handleSubmit} isLoading={isLoading} />
          </>
        ) : (
          <div className="space-y-8">
            {/* Score Result */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {result.product_name}
                </h2>
                <p className="text-gray-500">{result.brand}</p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                <ScoreGauge score={result.final_score} size="lg" />

                {pricePrediction && (
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 mb-1">Predicted Price</p>
                    <p className="text-3xl font-bold text-blue-800">
                      {pricePrediction.predicted_price.toFixed(2)}
                    </p>
                    <p className="text-xs text-blue-500 mt-1">
                      Confidence: {pricePrediction.confidence}
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Summary */}
              {lastInput && (
                <div className="border-t pt-6 mt-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Product Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Materials:</span>
                      <p className="font-medium">
                        {lastInput.materials.map(m => `${m.name} (${m.percentage}%)`).join(', ')}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Origin:</span>
                      <p className="font-medium">{lastInput.origin}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Care:</span>
                      <p className="font-medium">{lastInput.care_instruction}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Certifications:</span>
                      <p className="font-medium">
                        {[lastInput.certification1, lastInput.certification2]
                          .filter(c => c && c !== 'None')
                          .join(', ') || 'None'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Breakdown */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Score Breakdown
              </h3>
              <ScoreBreakdown
                breakdown={result.breakdown}
                environmentalScore={result.environmental_score}
                certificationBonus={result.certification_bonus}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Score Another Product
              </button>
              <Link
                to="/"
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
