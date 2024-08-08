import React from 'react';
import { Button, Card, CardBody, CardText, CardTitle, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';
import { PiWarningCircleBold } from "react-icons/pi";
import {settings} from "../../../utils/constants"
const DeleteAlert = (props) => {
    const { onCancel, onDelete } = props
    return (
        <div className="d-flex justify-content-center align-items-center vh-100  overlay">
            <Card className="text-center p-4">
                <CardBody>
                    <PiWarningCircleBold size={50} className="text-danger mb-3" />
                    <CardTitle tag="h4">{settings.deleteTitle}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-3 text-muted">
                        {settings.deleteSubTitle}
                    </CardSubtitle>
                    <CardText className="d-flex justify-content-around">
                        <Button color="secondary" onClick={onCancel}>{settings.cancel}</Button>
                        <Button color="danger" onClick={onDelete}>{settings.deleteBtn}</Button>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )
};

DeleteAlert.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
export default DeleteAlert;
