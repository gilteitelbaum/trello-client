import React from "react";
import "./TitleBar.css";

export default function TitleBar(props) {
    return (
        <div className="title-bar">
            {!props.inEditMode && <span>{props.name}</span>}
            {props.inEditMode && <input type="text" value={props.name} onChange={props.handleTextChange}></input>}
        </div>
    );
}