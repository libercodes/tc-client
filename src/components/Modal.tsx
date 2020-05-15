import React from 'react'
import {
    Modal,
    Button
} from 'react-bootstrap'

const ModalComponent = (props: any) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onAgree}>{props.nameAgreeButton}</Button>
                <Button onClick={props.onCancel}>Cancelar</Button>
            </Modal.Footer>

        </Modal>
    )
}


export default ModalComponent