import jwt from "jsonwebtoken";

export const accessTokenSecret = "replace_access_token_secret"
export const refreshTokenSecret = "replace_refresh_token_secret"
export const JWT_ACCESS_TOKEN_EXPIRY_TIME = "86400s";
export const JWT_REFRESH_TOKEN_EXPIRY_TIME = "604800s";

export function createTokens(id: number, email: string) {
    return {
        "access": jwt.sign(
            {
                id: id,
                email: email,
                isAccess: true,
            },
            accessTokenSecret,
            {
                expiresIn: JWT_ACCESS_TOKEN_EXPIRY_TIME,
            }
        ),
        "refresh": jwt.sign(
            {
                id: id,
                email: email,
                isRefresh: true
            },
            refreshTokenSecret,
            {
                expiresIn: JWT_REFRESH_TOKEN_EXPIRY_TIME,
            }
        ),
    };
}

export function changeCaseFromSnakeToCamelRecurse(o: Object) {
    let newObject: Object;
    let originalKey, newKey: string;
    let value: any;
    switch (o instanceof Array) {
        case true:
            //@ts-ignore
            return o.map(function (value) {
                if (typeof value === "object") {
                    value = changeCaseFromSnakeToCamelRecurse(value);
                }
                return value;
            });
        case false:
            newObject = {};
            for (originalKey in o) {
                if (o.hasOwnProperty(originalKey)) {
                    newKey = changeCaseFromSnakeToCamel(originalKey);
                    // @ts-ignore
                    value = o[originalKey];
                    if (
                        value instanceof Array ||
                        (value !== null && value.constructor === Object)
                    ) {
                        value = changeCaseFromSnakeToCamelRecurse(value);
                    }
                    // @ts-ignore
                    newObject[newKey] = value;
                }
            }
            break;
    }
    return newObject;
}

export function changeCaseFromSnakeToCamel(val: string) {
    const valArr = val.split("_");
    return valArr
        .map((p, index) => {
            if (index == 0) return p;
            else {
                const pSlit = p.split("");
                return pSlit[0].toUpperCase() + pSlit.splice(1).join("");
            }
        })
        .join("");
}