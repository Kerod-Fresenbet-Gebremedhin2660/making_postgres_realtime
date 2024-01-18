import type {TDiff, TDocUpdate} from "./types.ts";
import {readDoc, updateDoc} from "./crud.ts";

export function mergeDoc(docUpdate: TDocUpdate): boolean {
    const diff = diffDoc(docUpdate);
    if (!diff) return false;

    const mergeResult = "";

    const updateDocPayload: TDocUpdate = {
        id: docId,
        data: mergeResult
    }
    return updateDoc(updateDocPayload);
}

export function diffDoc(docUpdate: TDocUpdate): TDiff | undefined {
    const currentDoc = readDoc(docUpdate.id).doc;
    if (!currentDoc) return undefined;
    const newDoc = docUpdate.data;
    // Do Diff
    return {}

}

