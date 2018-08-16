import React from 'react';
import ReactAutocomplete from 'react-autocomplete';
import moment from 'moment';

const today = moment().format('YYYY-MM-DD');
const URL = 'http://localhost:8080';

export default class EditableDailyActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            isDeleted: false,
            users: [],
            meals: [],
            trainings: [],
            currentMeal: '',
            currentTraining: '',
            currentUser: '',
            inputValue: {
                user: '',
                trainings: [],
                meals: [],
                weight: '',
                date: today
            },
            canSubmit: false
        }
        this.changeModal = this.changeModal.bind(this);
        this.deleteActivity = this.deleteActivity.bind(this);
    }

    changeModal() {
        this.setState({ 'modalIsOpen': !this.state.modalIsOpen })
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

    addMealToList(value) {
        this.setState({ 'isMealChosen': true });
        let newState = Object.assign({}, this.state.inputValue);
        let id = this.state.meals.find(obj => obj.name === value).id;
        newState.meals.push({ 'name': value, 'id': id, });
        this.setState({ 'inputValue': newState });
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
        fetch(URL + "/users/all")
            .then(result => result.json())
            .then(data => this.setState({ users: data }))
            .catch(error => console.log(error));

        fetch(URL + "/meals/all")
            .then(result => result.json())
            .then(data => this.setState({ meals: data }))
            .catch(error => console.log(error));

        fetch(URL + "/trainings/all")
            .then(result => result.json())
            .then(data => this.setState({ trainings: data }))
            .catch(error => console.log(error));

    }

    deleteActivity() {
        fetch(URL + '/dailyActivities/delete/' + this.props.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        this.setState({ 'modalIsOpen': !this.state.modalIsOpen });
        this.setState({ 'isDeleted': true });
    }

    render() {
        return (
            <form>
                <div>
                    <label>Użytkownik * </label>
                    <select onChange={e => this.setCurrentUser(e.target.value)} required={true}>
                        <option disabled selected></option>
                        {this.state.users.map(user => <option key={user.id} value={user.email}>{user.email}</option>)}
                    </select>
                </div>
                <div>
                    <label>Data * </label>
                    <input type="date"
                        min="2018-01-01" max={today} defaultValue={today} onChange={e => this.setDate(e.target.value)} required={true} />
                </div>
                <div>
                    <label>Waga w kg * </label>
                    <input type="number" min="1" max="200" step="0.1" onChange={e => this.setWeight(e.target.value)} required={true}/>
                </div>
                <div>
                    <label>Posiłki * </label>
                    <ReactAutocomplete
                        items={this.state.meals}
                        shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        getItemValue={item => item.name}
                        renderItem={(item, highlighted, isItemSelectable) =>
                            <div
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
                        inputProps={{
                            required: true
                        }}

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
                    <label>Treningi * </label>
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
                        inputProps={{
                            required: true
                        }}
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
                <button type="button" className="addNew" onClick={() => this.props.addNewActivity(this.state.inputValue)}>Zapisz</button>
            </form>
        )
    }
}