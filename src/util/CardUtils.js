import { generateUniqueID } from "./GenericUtil";
import { ColumnUtils } from "./ColumnsUtil";

export class CardUtils {
    constructor(columns) {
        this.columnUtils = new ColumnUtils(columns);
    }

    getCopyOfColumns() {
        return this.columnUtils.getCopyOfColumns();
    }

    deleteCard(colName, cardName) {
        let columnToChange = this.columnUtils.getColumn(colName);
        columnToChange.cards = columnToChange.cards.filter(cardToChange => cardToChange.name !== cardName);
    }

    generateID() {
        return "Card" + generateUniqueID();
    }

    getCard(column, cardName) {
        if (!column.cards)
            return null;
        return column.cards.find(card => card.name === cardName);
    }

    addCard() {
        let toDoColumn = this.columnUtils.getToDoColumn();

        if (!toDoColumn.cards) {
            toDoColumn.cards = [];
        }

        let almostUniqueID = this.generateID();
        while (this.getCard(toDoColumn, almostUniqueID)) {
            // if by some chance the ID has been used - generate another ID
            almostUniqueID = this.generateID();
        }
        toDoColumn.cards.push({ name: almostUniqueID });
    }

    setImage(colName, cardName, imgData){
        let columnToChange = this.columnUtils.getColumn(colName);
        let card = this.getCard(columnToChange, cardName);
        card.imageFile = imgData;
    }

    moveCard(sourceCol, destCol, cardName) {
        console.log("movecard " + sourceCol + " " + destCol + " " + cardName);
        let sourceColumn = this.columnUtils.getColumn(sourceCol);
        let card = this.getCard(sourceColumn, cardName);
        if (!card) {
            console.log("could not find card");
            return;
        }
        this.deleteCard(sourceCol, cardName);
        let destinationColumn = this.columnUtils.getColumn(destCol);
        if (!destinationColumn) {
            console.log("could not find dest col");
            return;
        }
        if (!destinationColumn.cards)
            destinationColumn.cards = [];
        destinationColumn.cards.push(card);
        console.log("destinationColumn=" + JSON.stringify(destinationColumn));
    }

    renameCard(colName, oldName, newName) {
        let columnToChange = this.columnUtils.getColumn(colName);
        let card = this.getCard(columnToChange, oldName);
        card.name = newName;
    }
}
