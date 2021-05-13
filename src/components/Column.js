import React, { useState } from "react";
import "./Column.css";
import TitleBar from "./controls/TitleBar";
import ControlBar from "./controls/ControlBar";
import Card from "./Card";
import { useAppContext } from "../util/contextLib";

export default function Column(props) {
    const [inEditMode, setInEditMode] = useState(false);
    const [newName, setNewName] = useState(props.col.name);
    const { deleteColumn, renameColumn, moveCard } = useAppContext();

    function onDragOver(e) {
        e.preventDefault();
    }

    function onDrop(e, newCol) {
        let colId = e.dataTransfer.getData("colId");
        let cardId = e.dataTransfer.getData("cardId");
        moveCard(colId, newCol, cardId);
    }

    function handleDelete() {
        deleteColumn(props.col.name);
    }

    function handleStartEdit() {
        setInEditMode(true);
    }

    function handleSave() {
        setInEditMode(false);
        renameColumn(props.col.name, newName);
    }

    function handleCancel() {
        setInEditMode(false);
        setNewName(props.col.name);
    }

    function handleTextChange(event) {
        setNewName(event.target.value);
    }

    return (
        <div onDragOver={(e) => onDragOver(e)} onDrop={(e) => { onDrop(e, props.col.name) }} className="column">
            <TitleBar inEditMode={inEditMode} handleTextChange={handleTextChange} name={newName}></TitleBar>

            {props.col.cards && props.col.cards.map(card => { return <Card key={card.name} parentName={props.col.name} card={card}></Card> })}

            {!inEditMode && <ControlBar className="grid-item-bottom" handleEdit={handleStartEdit} handleDelete={handleDelete}></ControlBar>}
            {inEditMode && <ControlBar className="grid-item-bottom" handleCancel={handleCancel} handleSave={handleSave}></ControlBar>}
        </div>
    );
}
