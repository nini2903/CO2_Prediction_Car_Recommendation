from django.http import JsonResponse
import joblib
import numpy as np
import os
from django.views.decorators.csrf import csrf_exempt
import json
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
linear_reg_model = joblib.load(os.path.join(BASE_DIR, 'backend_src/models/linear_regression_model.pkl'))
decision_tree_model = joblib.load(os.path.join(BASE_DIR, 'backend_src/models/decision_tree_model.pkl'))
kmeans = joblib.load(os.path.join(BASE_DIR, 'backend_src/models/kmeans_model.pkl'))
scaler = joblib.load(os.path.join(BASE_DIR, 'backend_src/models/scaler.pkl'))

def encode_make(make_key):
    encode_dict = {'ACURA': 0, 'ALFA ROMEO': 1, 'ASTON MARTIN': 2, 'AUDI': 3, 'BENTLEY': 4, 'BMW': 5,
       'BUGATTI': 6, 'BUICK': 7, 'CADILLAC': 8, 'CHEVROLET': 9, 'CHRYSLER': 10, 'DODGE': 11,
       'FIAT': 12, 'FORD': 13, 'GENESIS': 14, 'GMC': 15, 'HONDA': 16, 'HYUNDAI': 17, 'INFINITI': 18,
       'JAGUAR': 19, 'JEEP': 20, 'KIA': 21, 'LAMBORGHINI': 22, 'LAND ROVER': 23, 'LEXUS': 24,
       'LINCOLN': 25, 'MASERATI': 26, 'MAZDA': 27, 'MERCEDES-BENZ': 28, 'MINI': 29,
       'MITSUBISHI': 30, 'NISSAN': 31, 'PORSCHE': 32, 'RAM': 33, 'ROLLS-ROYCE': 34, 'SCION': 35,
       'SMART': 36, 'SRT': 37, 'SUBARU': 38, 'TOYOTA': 39, 'VOLKSWAGEN': 40, 'VOLVO': 41}
    return encode_dict[make_key]

def encode_vehicle_class(vehicle_class_key):
    encode_dict = {'COMPACT': 0, 'FULL-SIZE': 1, 'MID-SIZE': 2, 'MINICOMPACT': 3, 'MINIVAN': 4,
       'PICKUP TRUCK - SMALL': 5, 'PICKUP TRUCK - STANDARD': 6,
       'SPECIAL PURPOSE VEHICLE': 7, 'STATION WAGON - MID-SIZE': 8,
       'STATION WAGON - SMALL': 9, 'SUBCOMPACT': 10, 'SUV - SMALL': 11,
       'SUV - STANDARD': 12, 'TWO-SEATER': 13, 'VAN - CARGO': 14, 'VAN - PASSENGER': 15}
    return encode_dict[vehicle_class_key]

def encode_transmission(transmission_key):
    encode_dict = {'A10': 0, 'A4': 1, 'A5': 2, 'A6': 3, 'A7': 4, 'A8': 5, 'A9': 6, 'AM5': 7, 'AM6': 8, 'AM7': 9,
       'AM8': 10, 'AM9': 11, 'AS10': 12, 'AS4': 13, 'AS5': 14, 'AS6': 15, 'AS7': 16, 'AS8': 17, 'AS9': 18,
       'AV': 19, 'AV10': 20, 'AV6': 21, 'AV7': 22, 'AV8': 23, 'M5': 24, 'M6': 25, 'M7': 26}
    return encode_dict[transmission_key]

def encode_fuel_type(fuel_type_key):
    encode_dict = {'D': 0, 'E': 1, 'N': 2, 'X': 3, 'Z': 4}
    return encode_dict[fuel_type_key]

def preprocess_input(data):
    with open(os.path.join(BASE_DIR, 'backend_src/models/encoded_data_columns.json'), 'r') as f:
        columns = json.load(f)
    with open(os.path.join(BASE_DIR, 'backend_src/models/models_converted_to_other.json'), 'r') as f2:
        others = json.load(f2)
 
    # Label encoding
    data["make"] = encode_make(data["make"])
    data["vehicle_class"] = encode_vehicle_class(data["vehicle_class"])
    data["transmission"] = encode_transmission(data["transmission"])
    data["fuel_type"] = encode_fuel_type(data["fuel_type"])
    data["model"] = data["model"] if data["model"] not in others else "Other"
    
    # Convert json to dataframe
    df = pd.DataFrame([data])

    # Encode model
    encoded_df = pd.get_dummies(df, columns=['model'])
    encoded_df = encoded_df.reindex(columns=columns, fill_value=0)
    encoded_df = encoded_df.drop(columns=['co2'])

    return encoded_df.copy()

@csrf_exempt
def predict_co2(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            preprocessed_data_df = preprocess_input(data)
            
            if data["ml_model"] == 0:
                prediction = linear_reg_model.predict(preprocessed_data_df.iloc[[0]])[0]
            else:
                prediction = decision_tree_model.predict(preprocessed_data_df.iloc[[0]])[0]
        
            return JsonResponse({ 'prediction': prediction }, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method. Use POST.'}, status=405)


def recommend_car(desired_engine_size, desired_cylinders, desired_fuel_consumption, desired_co2):
    df_recommender = pd.read_csv(os.path.join(BASE_DIR, 'backend_src/models/df_recommender.csv'))

    # Scale the input features
    scaled_input = scaler.transform([[desired_engine_size, desired_cylinders, desired_fuel_consumption, desired_co2]])[0]
    
    # Predict the closest cluster
    cluster_centers = kmeans.cluster_centers_
    closest_cluster_idx = np.argmin(np.linalg.norm(cluster_centers - scaled_input, axis=1))
    
    # Filter cars in the closest cluster
    cluster_cars = df_recommender[df_recommender['cluster'] == closest_cluster_idx].copy()
    
    # Calculate distances to all cars in the cluster
    cluster_cars['distance'] = cluster_cars.apply(
        lambda row: np.linalg.norm(scaler.transform([[row['engine_size'], row['cylinders'], row['fuel_consumption'], row['co2']]])[0] - scaled_input),
        axis=1
    )
    
    # Recommend the car with the smallest distance
    recommended_cars = cluster_cars.nsmallest(8, 'distance')
    
    return recommended_cars[["make", "model", "vehicle_class", "transmission", "fuel_type"]].drop_duplicates()

@csrf_exempt
def recommender(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            desired_engine_size = data["desired_engine_size"]
            desired_cylinders = data["desired_cylinders"]
            desired_fuel_consumption = data["desired_fuel_consumption"]
            desired_co2 = data["desired_co2"]

            recommendation = recommend_car(desired_engine_size, desired_cylinders, desired_fuel_consumption, desired_co2)
            recommendation_list = []
            for index, row in recommendation.iterrows():
                recommendation_list.append(row.to_dict())
            return JsonResponse(recommendation_list, safe=False, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method. Use POST.'}, status=405)