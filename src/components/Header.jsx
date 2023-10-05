import React, { useState } from 'react';
import Modal from 'react-modal';
import TicketForm from './TicketForm';

export default function Header() {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    return (
        <>
            <div className="header d-flex w-full justify-content-between">
                <h2 className="h2 m-2" style={{ fontWeight: "350", verticalAlign: 'middle' }}>Tickets</h2>
                <div>
                    <button onClick={openModal} className="btn btn-outline-dark m-2">Raise a ticket</button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay color
                            },
                            content: {
                                width: '50%', // Width of the modal
                                left: '25%' // Position from the left
                            },
                        }}
                    >
                        <div className='d-flex justify-content-between'>
                            <span className='h2 m2' style={{ fontWeight: "350", verticalAlign: 'middle' }}>Raise a ticket</span>
                            <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <TicketForm />
                    </Modal>
                </div>
            </div>
        </>
    );
}