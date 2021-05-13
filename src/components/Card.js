import React, { useState } from "react";
import "./Card.css";
import TitleBar from "./controls/TitleBar";
import ControlBar from "./controls/ControlBar";
import { useAppContext } from "../util/contextLib";

export default function Card(props) {
    const { deleteCard, renameCard, addImage } = useAppContext();
    const [inEditMode, setInEditMode] = useState(false);
    const [newName, setNewName] = useState(props.card.name);
    const [imageFile, setImageFile] = useState(props.card.imageFile);


    function onDragStart(ev, colId, cardId) {
        ev.dataTransfer.setData("colId", colId);
        ev.dataTransfer.setData("cardId", cardId);
    }

    function handleDelete() {
        deleteCard(props.parentName, props.card.name);
    }

    function handleStartEdit() {
        setInEditMode(true);
    }

    function handleSave() {
        setInEditMode(false);
        renameCard(props.parentName, props.card.name, newName);
    }

    function handleCancel() {
        setInEditMode(false);
        setNewName(props.card.name);
    }

    function handleTextChange(event) {
        setNewName(event.target.value);
    }

    function handleFileChange(event) {
        var reader = new FileReader();

        reader.onloadend = () => {
            setImageFile(reader.result);
            addImage(props.parentName, props.card.name, reader.result);

        };
        reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <div draggable onDragStart={(e) => onDragStart(e, props.parentName, props.card.name)} className="card">
            <TitleBar inEditMode={inEditMode} handleTextChange={handleTextChange} name={newName}></TitleBar>

            {imageFile && <img className="card-image" src={imageFile}></img>}

            <div className="centerButton">
                <label htmlFor="file" className="btn-custom control-label">Add Picture</label>
            </div>
            <input onChange={handleFileChange} type="file" id="file" className=""></input>


            {!inEditMode && <ControlBar handleEdit={handleStartEdit} handleDelete={handleDelete}></ControlBar>}
            {inEditMode && <ControlBar handleCancel={handleCancel} handleSave={handleSave}></ControlBar>}
        </div>
    );
}