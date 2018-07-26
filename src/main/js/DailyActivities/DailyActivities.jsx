import React from 'react';
import Modal from 'react-modal';
import ReactAutocomplete from 'react-autocomplete';
import DailyActivity from './DailyActivity';
import moment from 'moment';

const today = moment().format('YYYY-MM-DD');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '300px'
    }
};

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
                date: ''
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
            .then(data => this.setState({ dailyActivities: data._embedded.dailyActivities }))
            .catch(error => console.log(error));
    }

    addNewActivity() {
        fetch(location.href + '/add/'
            + this.state.inputValue.user
            + this.state.inputValue.trainings
            + this.state.inputValue.meals
            + this.state.inputValue.weight
            + this.state.inputValue.date, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstParam: this.state.inputValue.user,
                    fecondirstParam: this.state.inputVatrainingsuser,
                    thirdParam: this.state.inputValue.meals.map(meal => meal.id),
                    fourthParam: this.state.inputValue.weight,
                    fifthParam: this.state.inputValue.date
                }),

            })
            .then(response => response.json())
            .then((data) => {
                this.getMeals();
                this.setState({ 'modalIsOpen': !this.state.modalIsOpen })
            })
    }

    setCurrentUser(value) {        
        let newState = Object.assign({}, this.state.inputValue);
        let id = this.state.users.find(obj => obj.email === value).id;       
        newState.user = { 'email': value, 'id': id };        
        this.setState({ 'inputValue': newState });
        console.log(this.state.inputValue.user);
    }

    enableAdd(event) {
        this.setState({ 'canAddActivity': true })
        this.setState({ 'inputValue': event.target.value });
    }

    addMealToList(value) {
        this.setState({ 'isMealChosen': true });
        let newState = Object.assign({}, this.state.inputValue);
        let id = this.state.meals.find(obj => obj.name === value).id;
        newState.meals.push({ 'name': value, 'id': id });
        this.setState({ 'inputValue': newState });

    }

    deleteMealFromList(value) {
        let newState = Object.assign({}, this.state.inputValue);
        newState.meals = newState.meals.filter(obj => obj.name !== value.name);
        this.setState({ 'inputValue': newState });
        this.setState({ 'isMealChosen': !(newState.meals.length === 0) });
    }

    addTrainingToList(value) {
        this.setState({ 'isTrainingChosen': true });
        let newState = Object.assign({}, this.state.inputValue);
        let id = this.state.trainings.find(obj => obj.name === value).id;
        newState.trainings.push({ 'name': value, 'id': id });
        this.setState({ 'inputValue': newState });

    }

    deleteTrainingFromList(value) {
        let newState = Object.assign({}, this.state.inputValue);
        newState.trainings = newState.trainings.filter(obj => obj.name !== value.name);
        this.setState({ 'inputValue': newState });
        this.setState({ 'isTrainingChosen': !(newState.trainings.length === 0) });
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
        return (
            <div className="list">
                <h2>Aktywność dzienna</h2>
                <div>
                    <h4>Wybierz użytkownika</h4>
                    <select onChange={e => this.setCurrentUser(e.target.value)}>
                        <option disabled selected value>Wybierz użytkownika</option>
                        {this.state.users.map(user => <option key={user.id} value={user.email}>{user.email}</option>)}
                    </select>
                    <h4>Dodaj nową aktywność</h4>
                    <form>
                        <div>
                            <label>Data: </label>
                            <input type="date"
                                min="2018-01-01" max={today} defaultValue={today} />
                        </div>
                        <div>
                            <label>Waga w kg: </label>
                            <input type="number" min="1" max="200" step="0.1" />
                        </div>
                        <div>
                            <label>Posiłki: </label>
                            <ReactAutocomplete
                                items={this.state.meals}
                                shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                getItemValue={item => item.name}
                                renderItem={(item, highlighted) =>
                                    <div
                                        className="dropdown"
                                        key={item.id}
                                        style={{ backgroundColor: highlighted ? '#99e6e6' : 'transparent' }}
                                    >
                                        {item.name}
                                    </div>
                                }
                                value={this.state.currentMeal}
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
                                renderItem={(item, highlighted) =>
                                    <div
                                        className="dropdown"
                                        key={item.id}
                                        style={{ backgroundColor: highlighted ? '#99e6e6' : 'transparent' }}
                                    >
                                        {item.name}
                                    </div>
                                }
                                value={this.state.currentTraining}
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
                        <button type="submit" className="addNew" onClick={this.addNewActivity}>Zapisz</button>
                    </form>
                </div>

                <ul>
                    {this.state.dailyActivities.map(activity => {
                        return <DailyActivity id={activity.id} date={activity.date} weight={activity.weight}
                            trainings={activity.trainings} meals={activity.meals} key={activity._links.self.href} />
                    })}
                </ul>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.changeModal}
                    style={customStyles}
                    contentLabel="Dodanie nowej aktywności">
                    <h3 className="modalHeading">Dodaj nowy posiłek</h3>
                    <div>
                        <p className="modalText">Podaj nazwę</p>
                        <input type="text" className="modalInput" onChange={this.enableAdd.bind(this)} />
                        <section className="modalButtons">
                            <button onClick={this.changeModal}>Zamknij</button>
                            <button disabled={!this.state.canAddActivity} onClick={this.addNewActivity}>Zapisz</button>
                        </section>
                    </div>
                </Modal>
            </div >
        )
    }
}