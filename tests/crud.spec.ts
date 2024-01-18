import { expect, test } from "bun:test";
import {mainPool} from "../src/db.ts";
import {createDoc, deleteDoc, readDoc, updateDoc} from "../src/crud.ts";



test("docCrud", async () => {
    const testData = 'this is  a test doc';
    const testDataUpdate = 'this is a test doc that has been updated';
    await mainPool.transaction(
        async (transactionConnection) => {
            const docCreated = await createDoc(
                {
                    data: testData,
                }, transactionConnection
            );

            expect(docCreated).toBeDefined();
            expect(docCreated?.data).toBe(testData);

            const docRead = await readDoc(
                docCreated?.id,
                transactionConnection
            );

            expect(docRead).toBeDefined();
            expect(docRead?.data).toBe(testData);

            const docUpdated = await updateDoc({
                    id: docRead?.id,
                    data: testDataUpdate
                },
                transactionConnection
            );

            expect(docUpdated).toBeDefined();
            expect(docUpdated?.data).toBe(testDataUpdate);

            const docDeleted = await deleteDoc(
                docUpdated?.id,
                transactionConnection
            );
            expect(docDeleted).toBeDefined();
            expect(docDeleted?.id).toBe(docUpdated?.id);
        }
    );


});