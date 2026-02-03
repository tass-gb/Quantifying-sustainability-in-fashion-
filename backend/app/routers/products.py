"""API routes for sample products."""

import random
from typing import Optional

from fastapi import APIRouter, HTTPException, Request, Query

from app.schemas.product import (
    ProductSummary,
    ScoreResponse,
    ScoreBreakdown,
    MaterialImpactBreakdown,
    ImpactBreakdown,
    OriginImpactBreakdown,
)

router = APIRouter()


@router.get("/products", response_model=list[ProductSummary])
async def list_products(
    request: Request,
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    category: Optional[str] = Query(default=None),
) -> list[ProductSummary]:
    """
    List sample products from the dataset.

    Returns scored products for browsing in the demo UI.
    """
    sample_products = request.app.state.sample_products

    if sample_products is None or sample_products.empty:
        return []

    df = sample_products.copy()

    # Filter by category if specified
    if category:
        df = df[df["Category"].str.lower() == category.lower()]

    # Apply pagination
    df = df.iloc[offset : offset + limit]

    # Convert to response format
    products = []
    for _, row in df.iterrows():
        products.append(
            ProductSummary(
                id=int(row["Id"]),
                product_name=row["Product_Name"],
                brand=row.get("Brand", "Unknown"),
                category=row.get("Category", "Other"),
                subcategory=row.get("Subcategory", "Other"),
                price=str(row["Price"]) if "Price" in row else None,
                score=float(row["Score_100"]),
            )
        )

    return products


@router.get("/products/{product_id}", response_model=ProductSummary)
async def get_product(product_id: int, request: Request) -> ProductSummary:
    """
    Get a single product by ID.
    """
    sample_products = request.app.state.sample_products

    if sample_products is None or sample_products.empty:
        raise HTTPException(status_code=404, detail="No products available")

    product = sample_products[sample_products["Id"] == product_id]

    if product.empty:
        raise HTTPException(status_code=404, detail=f"Product {product_id} not found")

    row = product.iloc[0]
    return ProductSummary(
        id=int(row["Id"]),
        product_name=row["Product_Name"],
        brand=row.get("Brand", "Unknown"),
        category=row.get("Category", "Other"),
        subcategory=row.get("Subcategory", "Other"),
        price=str(row["Price"]) if "Price" in row else None,
        score=float(row["Score_100"]),
    )


@router.get("/categories", response_model=list[str])
async def list_categories(request: Request) -> list[str]:
    """
    List available product categories.
    """
    sample_products = request.app.state.sample_products

    if sample_products is None or sample_products.empty:
        return []

    return sample_products["Category"].dropna().unique().tolist()


@router.get("/products/random", response_model=ScoreResponse)
async def get_random_product(request: Request) -> ScoreResponse:
    """
    Get a random product with its full score breakdown.

    Used for the "Use Pre-loaded Product" demo flow.
    """
    sample_products = request.app.state.sample_products

    if sample_products is None or sample_products.empty:
        raise HTTPException(status_code=404, detail="No products available")

    # Pick a random product
    idx = random.randint(0, len(sample_products) - 1)
    row = sample_products.iloc[idx]

    # Build the score response with breakdown
    # Note: The scored dataset has normalized values already
    return ScoreResponse(
        product_name=row["Product_Name"],
        brand=row.get("Brand", "Unknown"),
        final_score=float(row["Score_100"]),
        environmental_score=round(float(row.get("S_env", 0)) * 100, 1),
        certification_bonus=round(float(row.get("Certification_Total", 0)) * 100, 1),
        breakdown=ScoreBreakdown(
            material_impact=MaterialImpactBreakdown(
                co2=round(float(row.get("Material_CO2_norm", 0)) * 100, 1),
                water=round(float(row.get("Material_Water_norm", 0)) * 100, 1),
                energy=round(float(row.get("Material_Energy_norm", 0)) * 100, 1),
                chemical=round(float(row.get("Material_Chemical_norm", 0)) * 100, 1),
            ),
            care_impact=ImpactBreakdown(
                co2=round(float(row.get("Care_CO2_norm", 0)) * 100, 1),
                water=round(float(row.get("Care_Water_norm", 0)) * 100, 1),
                energy=round(float(row.get("Care_Energy_norm", 0)) * 100, 1),
            ),
            origin_impact=OriginImpactBreakdown(
                grid=round(float(row.get("Origin_Grid_norm", 0)) * 100, 1),
                transport=round(float(row.get("Origin_Transport_norm", 0)) * 100, 1),
                manufacturing=round(float(row.get("Origin_Manufacturing_norm", 0)) * 100, 1),
            ),
        ),
    )
