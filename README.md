
#  CO2 Prediction & Car Recommendation Project

Nowadays, car buyers are becoming increasingly aware of environmental sustainability. As a result, factors like CO2 emissions, fuel efficiency, and overall environmental impact are playing a more critical role in their purchasing decisions. However, with an overwhelming number of car brands and models available, it can be difficult for consumers to efficiently identify vehicles that align with their environmental and personal preferences. To address this challenge, we develop an AI-powered solution that leverages Machine Learning (ML) to assist users in making eco-conscious and informed choices.

Our system offers two core features:

- CO2 Emissions Prediction: By inputting key vehicle attributes such as manufacturer, model, vehicle class, engine size, cylinder count, and more, users can instantly receive an accurate prediction of a car’s CO2 emissions. This eliminates the need to manually sift through different car brand websites.

- Car Recommendation Engine: Users can also specify their desired features—such as preferred engine size, number of cylinders, estimated fuel consumption, or a target CO2 emission level—and the system will recommend vehicles that match those expectations. When used in tandem with the prediction functionality, this greatly streamlines the car selection process for environmentally conscious buyers.

## Run Frontend

In the project directory, you can run:

### `yarn install`

To install all libraries in Package.json 

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Run Backend

> Install modules via `VENV` (windows)

```bash
cd backend
virtualenv env
source env/Scripts/activate
pip install -r requirements.txt
```

> Start the app

```bash
python manage.py runserver
```

> Update requirements.txt

```bash
pip freeze > requirements.txt
```
