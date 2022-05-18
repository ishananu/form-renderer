# Frontend Assessment: Form Renderer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Right after success response received from API, form will automatically generate this.

![image](https://user-images.githubusercontent.com/17267615/169065750-f94baf69-534c-4e58-acc5-71d611b5ad34.png)

`Form values` section shows the current state details of the form. By clicking the submit button, user can see the generated JSON with requested details in the task like this in `Submitted values` section.

![image](https://user-images.githubusercontent.com/17267615/169066385-32698b11-1f6f-4d43-a588-a5690934cb3e.png)

If user add invalid details to relavant fields, out JSON will be like this. 

![image](https://user-images.githubusercontent.com/17267615/169067609-56473e4a-0327-45bc-8eec-f4127d5c8860.png)

The API is intentionally throttled to return a valid collection or an error,to handle that alert will be showing to the user and by clicking the button below user can request the data again.

![image](https://user-images.githubusercontent.com/17267615/169065100-e72f5a07-f4b1-4b80-b258-41be8234d0f0.png)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
