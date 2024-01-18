import {TDoc, TDocCreate, TDocUpdate} from "./types.ts";
import {mainPool, sql} from "./db.ts";
import { DatabaseTransactionConnectionType, DatabasePoolConnectionType } from "slonik";

type TTransPoolUnion = DatabaseTransactionConnectionType | DatabasePoolConnectionType | undefined;

export async function createDoc(
    docCreate: TDocCreate,
    trans?: TTransPoolUnion
): TDoc | undefined {
    const conn = trans ?? mainPool;
    try {
        const result = await conn.one(
            sql.unsafe
                `insert into doc (data)
                 values (${docCreate.data})
                 returning *`
        )
        return result as TDoc;
    } catch (e) {
        conn.rollback();
        return undefined;
    }
}

export async function readDoc(
        docId: number,
        trans?: TTransPoolUnion
    ): TDoc | undefined {
    const conn = trans ?? mainPool;
    try {
        const result = await conn.one(
            sql.unsafe
                `select *
                 from doc
                 where id = ${docId}`
        );
        return result as TDoc;
    } catch (e) {
        return undefined;
    }
}

export async function updateDoc(
    docUpdate: TDocUpdate,
    trans?: TTransPoolUnion
): TDoc | undefined {
    const conn = trans ?? mainPool;
    try {
        const result = await conn.one(
            sql.unsafe
                `update doc
                 set data = ${docUpdate.data}
                 where id = ${docUpdate.id}
                 returning *`
        )
        return result as TDoc;
    } catch (e) {
        return undefined;
    }
}

export async function deleteDoc(
    docId: number,
    trans?: TTransPoolUnion
): TDoc | undefined {
    const conn = trans ?? mainPool;
    try {
        const result = await conn.one(
            sql.unsafe`delete
                       from doc
                       where id = ${docId}
                       returning *`
        );
        return result as TDoc;
    } catch (e) {
        return undefined;
    }
}