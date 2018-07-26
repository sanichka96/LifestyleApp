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

Modal.setAppElement('#react')
export default class DailyActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {            
            'modalIsOpen': false,
            'isDeleted': false
        }
        this.changeModal = this.changeModal.bind(this);
        this.deleteActivity = this.deleteActivity.bind(this);
    }

    changeModal() {
        this.setState({ 'modalIsOpen': !this.state.modalIsOpen })
    }

    deleteActivity() {
        fetch(location.href + '/delete/' + this.props.id, {
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
            <li hidden={this.state.isDeleted} className="listItem">
                {this.props.name}
                <button onClick={this.changeModal}>Usuń</button>
                <hr />
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