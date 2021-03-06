import React from 'react';
import Modal from 'react-modal';
import EditableDailyActivity from './EditableDailyActivity';

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
export default class ReadOnlyDailyActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            isDeleted: false,
            isShown: true
        }
        this.changeModal = this.changeModal.bind(this);
        this.deleteActivity = this.deleteActivity.bind(this);
        this.editActivity = this.editActivity.bind(this);
    }

    changeModal() {
        this.setState({ 'modalIsOpen': !this.state.modalIsOpen })
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

    editActivity(props) {
        this.setState({isShown: false});
        console.log(this.state.isShown);
        return <EditableDailyActivity id={props.id} user={props.user} date={props.date} weight={props.weight}
            trainings={props.trainings} meals={props.meals} key={props.id} hidden={this.state.isShown} />
    }

    render() {
        return (
            <li hidden={this.state.isDeleted || !this.state.isShown} className="activity listItem">
                <button onClick={e => (this.editActivity(this.props))}>Edytuj</button>
                <button onClick={this.changeModal}>Usuń</button>
                <hr />
                <div>
                    <label>Użytkownik: </label>
                    <input disabled value={this.props.user.email} />
                </div>
                <div>
                    <label>Data: </label>
                    <input disabled value={this.props.date} />
                </div>
                <div>
                    <label>Waga: </label>
                    <input type="number" disabled value={this.props.weight} />
                </div>
                <div>
                    <label>Posiłki: </label>
                    <div className="hiddenList" disabled>
                        <ul>
                            {this.props.meals.map(meal =>
                                <li key={meal.id}>{meal.name}</li>)}
                        </ul>
                    </div>
                </div>
                <div>
                    <label>Treningi: </label>
                    <div className="hiddenList">
                        <ul>
                            {this.props.trainings.map(train =>
                                <li key={train.id}>{train.name}</li>)}
                        </ul>
                    </div>
                </div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.changeModal}
                    style={customStyles}>

                    <h3 className="modalHeading">Na pewno chcesz usunąć tę aktywność z listy?</h3>
                    <div>
                        <section className="modalButtons">
                            <button onClick={this.changeModal}>Nie</button>
                            <button onClick={this.deleteActivity}>Tak</button>
                        </section>
                    </div>
                </Modal >
            </li >
        )
    }
}