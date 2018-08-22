import React from 'react';
import Modal from 'react-modal';
import Training from './Training';
import ApiDataService from "../services/ApiDataService";

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
export default class Trainings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trainings: [],
            modalIsOpen: false,
            inputValue: '',
            canAddTraining: false
        };
        this.addNewTraining = this.addNewTraining.bind(this);
        this.changeModal = this.changeModal.bind(this);
    }

    componentWillMount() {
        ApiDataService.getTrainings()
            .then(response => this.setState({trainings: response}));
    }

    changeModal() {
        this.setState({ 'modalIsOpen': !this.state.modalIsOpen })
    }

    /*getTrainings() {
        fetch(URL + '/trainings/all')
            .then(result => result.json())
            .then(data => this.setState({ trainings: data }))
            .catch(error => console.log(error))
    }*/

    addNewTraining() {
        fetch(URL + '/trainings' + '/add/' + this.state.inputValue, {
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
                let newState = Object.assign([], this.state.trainings);
                newState.push(data);
                this.setState({ 'trainings': newState });
                this.setState({ 'modalIsOpen': !this.state.modalIsOpen })
            })
    }

    enableAdd(event) {
        this.setState({ 'canAddTraining': true })
        this.setState({ 'inputValue': event.target.value });
    }

    render() {
        return (
            <div className="list">
                <h2>Lista treningów</h2>
                <button className="addNew" onClick={this.changeModal}>Dodaj nowy</button>
                <ul>
                    {this.state.trainings.map(training => {
                        return <Training id={training.id} name={training.name} key={training.id} />
                    })}
                </ul>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.changeModal}
                    style={customStyles}
                    contentLabel="Dodanie nowego treningu">
                    <h3 className="modalHeading">Dodaj nowy trening</h3>
                    <div>
                        <p className="modalText">Podaj nazwę</p>
                        <input type="text" className="modalInput" onChange={this.enableAdd.bind(this)} />
                        <section className="modalButtons">
                            <button onClick={this.changeModal}>Zamknij</button>
                            <button disabled={!this.state.canAddTraining} onClick={this.addNewTraining}>Zapisz</button>
                        </section>
                    </div>
                </Modal>
            </div>
        )
    }
}