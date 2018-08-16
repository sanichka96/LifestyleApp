import React from 'react';
import Modal from 'react-modal';

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
const dispatch = (obj) => {
    console.log(obj);
};
Modal.setAppElement('#react')
export default class Training extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'modalIsOpen': false,
            'isDeleted': false
        };
        this.changeModal = this.changeModal.bind(this);
        this.deleteTraining = this.deleteTraining.bind(this);
    }

    changeModal() {
        this.setState({'modalIsOpen': !this.state.modalIsOpen})
    }

    status(res) {
        if (res.status === 400) {
            alert("Nie można usunąć treningu");
        }
        return res;
    }


    deleteTraining() {
        fetch(URL + '/trainings/delete/' + this.props.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status >= 400 && response.status < 600) {
                    alert("Nie można usunąć treningu");
                } else {
                    this.setState({'isDeleted': true});
                }
            })
            .catch(error => console.log(error));

        this.setState({'modalIsOpen': !this.state.modalIsOpen});
    }

    render() {
        return (
            <li hidden={this.state.isDeleted} className="listItem">
                {this.props.name}
                <button onClick={this.changeModal}>Usuń</button>
                <hr/>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.changeModal}
                    style={customStyles}>

                    <h3 className="modalHeading">Na pewno chcesz usunąć ten trening z listy?</h3>
                    <div>
                        <section className="modalButtons">
                            <button onClick={this.changeModal}>Nie</button>
                            <button onClick={this.deleteTraining}>Tak</button>
                        </section>
                    </div>
                </Modal>
            </li>
        )
    }
}