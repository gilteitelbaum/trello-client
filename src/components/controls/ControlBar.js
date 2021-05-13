import React from "react";
import "./ControlBar.css";
import { faPlus, faTrashAlt, faEdit, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ControlBar(props) {
    return (
        <div className="control-bar">
            {props.handleAdd && <FontAwesomeIcon title={"Add"} onClick={props.handleAdd} icon={faPlus} />}
            {props.handleEdit && <FontAwesomeIcon title={"Edit"} onClick={props.handleEdit} icon={faEdit} />}
            {props.handleSave && <FontAwesomeIcon title={"Save"} onClick={props.handleSave} icon={faSave} />}
            {props.handleDelete && <FontAwesomeIcon title={"Delete"} onClick={props.handleDelete} icon={faTrashAlt} />}
            {props.handleCancel && <FontAwesomeIcon title={"Cancel"} onClick={props.handleCancel} icon={faTimes} />}
        </div>
    );
}

