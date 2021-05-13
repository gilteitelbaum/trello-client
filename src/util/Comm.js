import { API } from "aws-amplify";

export async function loadColumns() {
    try {
        // Since there will only be 1 and only 1 record, I hardcoded the ID to 1.
        return await API.get("cheq", "columns/1");
    } catch (e) {
        console.log("error loading columns.." + JSON.stringify(e));
        //  onError(e);
    }
}

export async function saveColumns(columns) {
    try {
        return await API.put("cheq", "columns/1", {
            body: columns
        });
    } catch (e) {
        console.log("error saving columns.." + JSON.stringify(e));
    }
}
