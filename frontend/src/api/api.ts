export const predictCO2 = async (data: any) => {
    const response = await fetch("https://django-backend-route-sdx-assignment-nhantran.2.rahtiapp.fi/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const recommendCar = async (data: any) => {
    const response = await fetch("https://django-backend-route-sdx-assignment-nhantran.2.rahtiapp.fi/recommend", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
};
