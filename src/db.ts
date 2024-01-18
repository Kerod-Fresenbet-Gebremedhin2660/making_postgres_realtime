import slonik from "slonik";
import {changeCaseFromSnakeToCamelRecurse} from "./misc.ts";
import {dbUrl} from "./config.ts";

const changeCaseParser = (): slonik.Interceptor => {
    return {
        transformRow: (executionContext, actualQuery, row) => {
            return changeCaseFromSnakeToCamelRecurse(row) as slonik.QueryResultRow;
        },
    };
};

export const mainPool = await slonik.createPool(
    dbUrl, {
    maximumPoolSize: 50,
    interceptors: [changeCaseParser()],
    }
);

export const sql = slonik.sql;


