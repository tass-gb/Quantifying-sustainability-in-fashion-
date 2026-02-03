# Quantifying-sustainability-in-fashion-

This project focuses on developing a quantitative sustainability scoring system for  fashion products using product-level data such as material composition, certifications,  and country of origin information typically available on product labels or e-commerce  platforms.

📌 Project Description

This project develops a data-driven sustainability scoring system for fashion products and explores whether sustainability characteristics influence retail price using machine learning. the Dataset is not real data is artificial data to simulate the score system, and it is based on LCA indicators.

The system integrates:

Estimate Material Life Cycle Assessment (LCA) indicators

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

📂 Key Files Explained
Raw Dataset
FashionProductsDataset_Original.csv


Original fashion product data used as the foundation of the analysis.

Reference Tables

Used to enrich the dataset with environmental impact indicators:

Material_Reference.csv

Origin_Reference.csv

Care_Instruction_Reference.csv

Certification_Reference.csv

These tables approximate LCA ranges to enable transparent sustainability estimation.

Processed Datasets
File	Description
Merged_product_dataset.csv	Cleaned and merged dataset
sustainability_scores.csv	Final sustainability scoring output
df_ml_ready_for_model.csv	Machine-learning-ready dataset
⚙️ Installation

Clone the repository:

git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name


Create a virtual environment:

python -m venv venv


Activate it:

Windows
venv\Scripts\activate

Mac/Linux
source venv/bin/activate


Install dependencies:

pip install pandas numpy scikit-learn matplotlib seaborn plotly yellowbrick


(Optional but recommended)

pip install jupyter


Run notebooks:

jupyter notebook

📊 Methodology

The project combines statistical aggregation with machine learning:

Sustainability Score

Built using:

Weighted impact calculation

Normalization

Composite environmental burden

Certification bonuses

Resulting in a transparent and interpretable sustainability metric.

Machine Learning Analysis

The objective is exploratory rather than predictive — to determine whether sustainability signals are reflected in product pricing.

Tree-based models achieved the strongest performance, suggesting that pricing relationships are non-linear and driven by interactions between materials, origin, and certifications.

⚠️ Important Notes

✅ The scoring system is designed as a prototype under real-world data constraints.

✅ Reference tables are informed by academic and industry LCA literature but simplified for transparency.

✅ The machine learning models are intended for analysis and insight generation, not production deployment.

🔬 Future Improvements

Integration of open-access LCA datasets

Expansion to additional product categories

Inclusion of brand positioning variables

Deployment of an interactive scoring interface (e.g., Streamlit)

📜 License

This project is licensed under the MIT License.

👩‍💻 Author

Tassia Baes
MSc Data Analytics / Data Science