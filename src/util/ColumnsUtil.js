import { generateUniqueID } from "./GenericUtil";


export class ColumnUtils {
    constructor(columns) {
        this.columns = { ...columns };
        this.undeletableColNames = ["To-Do", "In Progress", "Done"];
    }

    getCopyOfColumns() {
        return this.columns;
    }

    getToDoColumn() {
        // Should make each of the col names const and populate undeletableColNames with that
        return this.getColumn(this.undeletableColNames[0]);
    }

    getColumn(colName) {
        let columnToChange = this.columns.content.filter(entryToChange => entryToChange.name === colName);
        columnToChange = columnToChange[0];
        return columnToChange;
    }

    isUndeletable(colName) {
        if (this.undeletableColNames.find(col => col === colName)) {
            return true;
        }
        return false;
    }

    deleteColumns(colName) {
        if (this.isUndeletable(colName))
            return;
        let resultOfFilter = this.columns.content.filter(entryToRemove => entryToRemove.name !== colName);
        this.columns.content = resultOfFilter;
    }

    renameColumn(oldName, newName) {
        if (this.isUndeletable(oldName))
            return;
        let columnToChange = this.getColumn(oldName);
        columnToChange.name = newName;
    }

    generateID() {
        return "Column" + generateUniqueID();
    }

    addColumn() {
        // This number should be close to unique - obviously this means we can have only 1M columns in theory - but a user cant visually work with more than a few dozen columns before
        // the application becomes too difficult to work with anyway.
        let almostUniqueID = this.generateID();
        while (this.getColumn(almostUniqueID)) {
            // if by some chance the ID has been used - generate another ID
            almostUniqueID = this.generateID();
        }
        this.columns.content.push({ name: almostUniqueID });
    }
}
