# Quantifying-sustainability-in-fashion-

This project focuses on developing a quantitative sustainability scoring system for  fashion products using product-level data such as material composition, certifications,  and country of origin information typically available on product labels or e-commerce  platforms.

📌 Project Description

This project develops a data-driven sustainability scoring system for fashion products and explores whether sustainability characteristics influence retail price using machine learning.

The system integrates:

Material Life Cycle Assessment (LCA) indicators

Manufacturing origin impacts

Care-phase environmental costs

Sustainability certifications

These components are aggregated into a standardized 0–100 Sustainability Score, enabling comparison across products even when detailed supply-chain data is unavailable.

The project follows the CRISP-DM framework to ensure a structured and reproducible data science workflow.

🚀 How to Use This Project:
✅ Recommended Execution Order

To fully reproduce the pipeline, run the notebooks in the following order:
1️⃣ Data Preparation and Exploration
👉 Start here:
Data.ipynb
This notebook:

Loads the original fashion dataset

Cleans and standardizes variables

Merges reference tables

Performs exploratory data analysis

Produces the merged dataset

Output:

Merged_product_dataset.csv

2️⃣ Sustainability Scoring System
Score_System.ipynb

This notebook implements the statistical scoring methodology:

Weighted material impacts

Min–Max normalization

Environmental burden calculation

Certification bonus integration

Final Sustainability Score (0–100)

Outputs:
sustainability_scores.csv
These datasets contain one aggregated record per product with computed sustainability indicators.

3️⃣ Machine Learning – Price Prediction
Model_Predict_Price.ipynb

This notebook prepares the machine-learning-ready dataset and evaluates multiple models to determine whether sustainability attributes contain pricing signals.

Models implemented:

EDA

Decision Tree

Random Forest

Gradient Boosting

Key steps:

Feature selection

One-hot encoding

Train/test split

Hyperparameter tuning

Model evaluation

Feature importance analysis

Output:
df_ml_ready_for_model.csv
