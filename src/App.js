import React, { useState, useEffect } from "react";
import './App.css';
import Routes from "./Routes";
import { AppContext } from "./util/contextLib";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { loadColumns, saveColumns } from "./util/Comm";
import { ColumnUtils } from "./util/ColumnsUtil";
import { CardUtils } from "./util/CardUtils";

function App() {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    async function onLoad() {
      try {
        let loadedCols = await loadColumns();
        setColumns(loadedCols);
      } catch (e) {
        alert("caught error loading columns " + e);
      }
    }

    onLoad();

    const interval = setInterval(async () => {
      console.log("about to query server ");
      let loadedCols = await loadColumns();
      setColumns(loadedCols);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function saveData(copyOfColumns) {
    setColumns(copyOfColumns);
    await saveColumns(copyOfColumns);
  }

  function addColumn() {
    let columnUtils = new ColumnUtils(columns);
    columnUtils.addColumn();
    saveData(columnUtils.getCopyOfColumns());
  }

  function deleteColumn(colName) {
    let columnUtils = new ColumnUtils(columns);
    columnUtils.deleteColumns(colName);
    saveData(columnUtils.getCopyOfColumns());
  }

  function renameColumn(oldName, newName) {
    let columnUtils = new ColumnUtils(columns);
    columnUtils.renameColumn(oldName, newName);
    saveData(columnUtils.getCopyOfColumns());
  }

  function deleteCard(colName, cardName) {
    let cardUtils = new CardUtils(columns);
    cardUtils.deleteCard(colName, cardName);
    saveData(cardUtils.getCopyOfColumns());
  }

  function addCard() {
    let cardUtils = new CardUtils(columns);
    cardUtils.addCard();
    saveData(cardUtils.getCopyOfColumns());
  }

  function renameCard(colName, oldName, newName) {
    let cardUtils = new CardUtils(columns);
    cardUtils.renameCard(colName, oldName, newName);
    saveData(cardUtils.getCopyOfColumns());
  }

  function moveCard(sourceCol, destCol, cardName) {
    let cardUtils = new CardUtils(columns);
    cardUtils.moveCard(sourceCol, destCol, cardName);
    saveData(cardUtils.getCopyOfColumns());
  }

  function addImage(colName, cardName, imgData) {
    let cardUtils = new CardUtils(columns);
    cardUtils.setImage(colName, cardName, imgData);
    saveData(cardUtils.getCopyOfColumns());
  }

  return (
    <div className="App">
      <Navbar expand="lg" sticky="top">
        <Navbar.Brand href="#home">Trello</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Button onClick={addColumn} variant="info">Add Column</Button>
            <Button onClick={addCard} variant="info">Add Card</Button>
            <Button variant="info">Change Column Order</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ columns, setColumns, deleteCard, deleteColumn, renameColumn, renameCard, moveCard, addImage }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;