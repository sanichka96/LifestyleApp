import React from 'react';
import Modal from 'react-modal';
import ReactAutocomplete from 'react-autocomplete';
import DailyActivity from './DailyActivity';
import moment from 'moment';

const today = moment().format('YYYY-MM-DD');

Modal.setAppElement('#react')
export default class DailyActivities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dailyActivities: [],
            users: [],
            meals: [],
            trainings: [],
            modalIsOpen: false,
            inputValue: {
                user: '',
                trainings: [],
                meals: [],
                weight: '',
                date: today
            },
            canAddActivity: false,
            currentMeal: '',
            currentTraining: '',
            currentUser: ''
        };
        this.getDailyActivities();
        this.addNewActivity = this.addNewActivity.bind(this);
        this.changeModal = this.changeModal.bind(this);
        this.isMealChosen = false;
        this.isTrainingChosen = false;
    }

    changeModal() {
        this.setState({ 'modalIsOpen': !this.state.modalIsOpen })
    }

    getDailyActivities() {
        fetch(location.href)
            .then(result => result.json())
            .then(data => this.setState({ dailyActivities: data }))
            .catch(error => console.log(error));
    }

    addNewActivity() {
        fetch(location.href + '/add/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: this.state.inputValue.user.id,
                trainings: this.state.inputValue.trainings.map(train => train.id),
                meals: this.state.inputValue.meals.map(meal => meal.id),
                weight: this.state.inputValue.weight,
                date: this.state.inputValue.date
            }),

        })
            .then(response => response.json())
    }

    setCurrentUser(value) {
        let newState = Object.assign({}, this.state.inputValue);
        let id = this.state.users.find(obj => obj.email === value).id;
        newState.user = { 'email': value, 'id': id };
        this.setState({ 'inputValue': newState });
    }

    setWeight(value) {
        let newState = Object.assign({}, this.state.inputValue);
        newState.weight = value;
        this.setState({ inputValue: newState });
    }

    setDate(value) {
        let newState = Object.assign({}, this.state.inputValue);
        newState.date = value;
        this.setState({ inputValue: newState });
    }

    enableAdd(event) {
        this.setState({ 'canAddActivity': true })
        this.setState({ 'inputValue': event.target.value });
    }

    addMealToList(value) {
        this.setState({ 'isMealChosen': true });
        let newState = Object.assign({}, this.state.inputValue);
        let id = this.state.meals.find(obj => obj.name === value).id;
        newState.meals.push({ 'name': value, 'id': id, });
        this.setState({ 'inputValue': newState });
        this.setState({ 'currentMeal': '' })
        let newMeals = Object.assign([], this.state.meals);
        newMeals.find(meal => meal.id === id).isSelectable = false;
        this.setState({ meals: newMeals })
    }

    deleteMealFromList(value) {
        let newState = Object.assign({}, this.state.inputValue);
        let id = newState.meals.find(obj => obj.name === value.name).id;
        newState.meals = newState.meals.filter(obj => obj.name !== value.name);
        this.setState({ 'inputValue': newState });
        this.setState({ 'isMealChosen': !(newState.meals.length === 0) });
        let newMeals = Object.assign([], this.state.meals);
        newMeals.find(meal => meal.id === id).isSelectable = true;
        this.setState({ meals: newMeals })
    }

    addTrainingToList(value) {
        this.setState({ 'isTrainingChosen': true });
        let newState = Object.assign({}, this.state.inputValue);
        let id = this.state.trainings.find(obj => obj.name === value).id;
        newState.trainings.push({ 'name': value, 'id': id });
        this.setState({ 'inputValue': newState });
        this.setState({ 'currentTraining': '' });
        let newTrains = Object.assign([], this.state.trainings);
        newTrains.find(train => train.id === id).isSelectable = false;
        this.setState({ trainings: newTrains })
    }

    deleteTrainingFromList(value) {
        let newState = Object.assign({}, this.state.inputValue);
        let id = newState.trainings.find(obj => obj.name === value.name).id;
        newState.trainings = newState.trainings.filter(obj => obj.name !== value.name);
        this.setState({ 'inputValue': newState });
        this.setState({ 'isTrainingChosen': !(newState.trainings.length === 0) });
        let newTrains = Object.assign([], this.state.trainings);
        newTrains.find(train => train.id === id).isSelectable = true;
        this.setState({ trainings: newTrains })
    }

    componentDidMount() {
        fetch("http://localhost:8080/users")
            .then(result => result.json())
            .then(data => this.setState({ users: data._embedded.users }))
            .catch(error => console.log(error));

        fetch("http://localhost:8080/meals")
            .then(result => result.json())
            .then(data => this.setState({ meals: data._embedded.meals }))
            .catch(error => console.log(error));

        fetch("http://localhost:8080/trainings")
            .then(result => result.json())
            .then(data => this.setState({ trainings: data._embedded.trainings }))
            .catch(error => console.log(error));
    }

    render() {
        console.log(this.state.dailyActivities);
        return (
            <div className="list">
                <h2>Aktywność dzienna</h2>
                <div className="activities">
                    <div className="column">
                        <h3>Wszystkie aktywności</h3>
                        <div>
                            <ul>
                                {this.state.dailyActivities.map(activity => {
                                    console.log(activity)
                                    return <DailyActivity id={activity.id} user={activity.user} date={activity.date} weight={activity.weight}
                                        trainings={activity.trainings} meals={activity.meals} key={activity.id} />
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="column">
                        <h3>Dodaj nową aktywność</h3>
                        <form>
                            <div>
                                <label>Użytkownik: </label>
                                <select onChange={e => this.setCurrentUser(e.target.value)}>
                                    <option disabled selected value>Wybierz użytkownika</option>
                                    {this.state.users.map(user => <option key={user.id} value={user.email}>{user.email}</option>)}
                                </select>
                            </div>
                            <div>
                                <label>Data: </label>
                                <input type="date"
                                    min="2018-01-01" max={today} defaultValue={today} onChange={e => this.setDate(e.target.value)} />
                            </div>
                            <div>
                                <label>Waga w kg: </label>
                                <input type="number" min="1" max="200" step="0.1" onChange={e => this.setWeight(e.target.value)} />
                            </div>
                            <div>
                                <label>Posiłki: </label>
                                <ReactAutocomplete
                                    items={this.state.meals}
                                    shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                    getItemValue={item => item.name}
                                    renderItem={(item, highlighted, isItemSelectable) =>
                                        <div
                                            className="dropdown"
                                            key={item.id}
                                            style={{
                                                backgroundColor: highlighted ? '#99e6e6' : 'transparent',
                                                disabled: !isItemSelectable,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    }
                                    value={this.state.currentMeal}
                                    isItemSelectable={item => { return typeof item.isSelectable === 'undefined' ? true : item.isSelectable }}
                                    onChange={e => {
                                        this.setState({ currentMeal: e.target.value })
                                    }}
                                    onSelect={value => {
                                        this.setState({ 'currentMeal': value });
                                        this.addMealToList(value);
                                    }}
                                />
                                <div className="hiddenList" hidden={!this.state.isMealChosen}>
                                    <ul>
                                        {this.state.inputValue.meals.map(meal =>
                                            <li key={meal.id}>{meal.name}
                                                <span onClick={() => this.deleteMealFromList(meal)}>X</span>
                                            </li>)}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <label>Treningi: </label>
                                <ReactAutocomplete
                                    items={this.state.trainings}
                                    shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                    getItemValue={item => item.name}
                                    renderItem={(item, highlighted, isItemSelectable) =>
                                        <div
                                            className="dropdown"
                                            key={item.id}
                                            style={{
                                                backgroundColor: highlighted ? '#99e6e6' : 'transparent',
                                                disabled: !isItemSelectable,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    }
                                    value={this.state.currentTraining}
                                    isItemSelectable={item => { return typeof item.isSelectable === 'undefined' ? true : item.isSelectable }}
                                    onChange={e => {
                                        this.setState({ currentTraining: e.target.value })
                                    }}
                                    onSelect={value => {
                                        this.setState({ 'currentTraining': value });
                                        this.addTrainingToList(value);
                                    }}
                                />
                                <div className="hiddenList" hidden={!this.state.isTrainingChosen}>
                                    <ul>
                                        {this.state.inputValue.trainings.map(train =>
                                            <li key={train.id}>{train.name}
                                                <span onClick={() => this.deleteTrainingFromList(train)}>X</span>
                                            </li>)}
                                    </ul>
                                </div>
                            </div>
                            <button type="button" className="addNew" onClick={this.addNewActivity}>Zapisz</button>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}