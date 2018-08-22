import React from 'react';
import Modal from 'react-modal';
import Meal from './Meal';
import ApiDataService from '../services/ApiDataService';

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

const URL = 'http://localhost:8080';

Modal.setAppElement('#react')
export default class Meals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            modalIsOpen: false,
            inputValue: '',
            canAddMeal: false
        };
        //this.getMeals();
        this.addNewMeal = this.addNewMeal.bind(this);
        this.changeModal = this.changeModal.bind(this);
    }

    componentWillMount() {
        ApiDataService.getMeals()
            .then(response => this.setState({meals: response}));
    }

    changeModal() {
        this.setState({'modalIsOpen': !this.state.modalIsOpen})
    }

    addNewMeal() {
        fetch(URL + '/meals' + '/add/' + this.state.inputValue, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: this.state.inputValue
            }),

        })
            .then(response => response.json())
            .then((data) => {
                let newState = Object.assign([], this.state.meals);
                newState.push(data);
                this.setState({ 'meals': newState });
                this.setState({'modalIsOpen': !this.state.modalIsOpen})
            })
    }

    enableAdd(event) {
        this.setState({'canAddMeal': true})
        this.setState({'inputValue': event.target.value});
    }

    render() {
        return (
            <div className="list">
                <h2>Lista posiłków</h2>
                <button className="addNew" onClick={this.changeModal}>Dodaj nowy</button>
                <ul>
                    {this.state.meals.map(meal => {
                        return <Meal id={meal.id} name={meal.name} key={meal.id}/>
                    })}
                </ul>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.changeModal}
                    style={customStyles}
                    contentLabel="Dodanie nowego posiłku">
                    <h3 className="modalHeading">Dodaj nowy posiłek</h3>
                    <div>
                        <p className="modalText">Podaj nazwę</p>
                        <input type="text" className="modalInput" onChange={this.enableAdd.bind(this)}/>
                        <section className="modalButtons">
                            <button onClick={this.changeModal}>Zamknij</button>
                            <button disabled={!this.state.canAddMeal} onClick={this.addNewMeal}>Zapisz</button>
                        </section>
                    </div>
                </Modal>
            </div>
        )
    }
}