import React from 'react';

const URL = 'http://localhost:8080';

export default class ApiDataService extends React.Component {
    static getMeals() {
        return fetch(URL + '/meals/all',
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(responseData => {
                return responseData;
            })
            .catch(error => console.warn(error));
    }

    static getTrainings() {
        return fetch(URL + '/trainings/all',
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(responseData => responseData)
            .catch(error => console.warn(error));
    }
};


