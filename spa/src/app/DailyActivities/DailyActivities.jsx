import React from 'react';
import Modal from 'react-modal';
import ReadOnlyDailyActivity from './ReadOnlyDailyActivity';
import EditableDailyActivity from './EditableDailyActivity';
import ApiDataService from '../services/ApiDataService';

const URL = 'http://localhost:8080/dailyActivities';

Modal.setAppElement('#react')
export default class DailyActivities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dailyActivities: [],
            modalIsOpen: false,
            canAddActivity: false,
            isEditable: false,
            isLogged: false
        };
        this.getDailyActivities();
        this.addNewActivity = this.addNewActivity.bind(this);
        this.changeModal = this.changeModal.bind(this);
    }

    changeModal() {
        this.setState({'modalIsOpen': !this.state.modalIsOpen})
    }

    getDailyActivities() {
        fetch(URL + "/all")
            .then(result => result.json())
            .then(data => {
                this.setState({dailyActivities: data})
            })
            .catch(error => console.log(error));
    }

    addNewActivity(inputValue) {
        let elements = Object.values(inputValue);
        let canSubmit = true;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].length === 0) {
                canSubmit = false;
            }
        }

        if (!canSubmit) {
            window.alert("Wypełnij wszystkie pola zaznaczone gwiazdką (*)");
        }
        else {
            fetch(URL + "/add", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: inputValue.user.id,
                    trainings: inputValue.trainings.map(train => train.id),
                    meals: inputValue.meals.map(meal => meal.id),
                    weight: inputValue.weight,
                    date: inputValue.date
                }),

            })
                .then(response => response.json())
                .then((data) => {
                    this.getDailyActivities();
                })
                .catch(error => console.log(error));
        }
    }

    render() {
        return (
            <div className="list">
                <h2>Aktywność dzienna</h2>
                <div className="activities">
                    <div className="column">
                        <h3>Wszystkie aktywności</h3>
                        <div>
                            <ul>
                                {this.state.dailyActivities.map(activity => {
                                    return <ReadOnlyDailyActivity id={activity.id} user={activity.user}
                                                                  date={activity.date} weight={activity.weight}
                                                                  trainings={activity.trainings} meals={activity.meals}
                                                                  key={activity.id}/>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="column">
                        <h3>Dodaj nową aktywność</h3>
                        <EditableDailyActivity addNewActivity={this.addNewActivity}/>
                    </div>
                </div>
            </div>
        )
    }
}