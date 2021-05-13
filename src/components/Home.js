import React from "react";
import Column from "./Column";
import "./Home.css";
import { useAppContext } from "../util/contextLib";

export default function Home() {
    const { columns, setColumns } = useAppContext();

    return (
        <div className="trello-container">
            {(!columns || !columns.content) && < h2 > Loading, please wait...</h2>}
            { columns && columns.content && columns.content.map(col => { return <Column key={col.name} col={col}></Column> }) }
        </div >
    );
}