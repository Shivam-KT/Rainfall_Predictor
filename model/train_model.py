import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle
import os

# Load dataset
df = pd.read_csv('model/rainfall_data.csv')

# Drop rows with NA
df.dropna(inplace=True)

# Use only relevant numerical features
features = ['MinTemp', 'MaxTemp', 'Humidity9am', 'Humidity3pm', 'Temp9am', 'Temp3pm', 'Pressure9am', 'Pressure3pm']
target = 'Rainfall'

X = df[features]
y = df[target]

# Train Linear Regression model
model = LinearRegression()
model.fit(X, y)

# Save model
with open('model/model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("✅ Model trained and saved.")
