export interface paths {
    "/cards": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["CardService_listCards"];
        put?: never;
        post: operations["CardService_createCard"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cards/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["CardService_getCard"];
        put: operations["CardService_updateCard"];
        post?: never;
        delete: operations["CardService_deleteCard"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserService_listUsers"];
        put?: never;
        post: operations["UserService_createUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserService_getUser"];
        put: operations["UserService_updateUser"];
        post?: never;
        delete: operations["UserService_deleteUser"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        BaseEntity: {
            id: string;
            /** Format: date-time */
            createdAt: Date;
            /** Format: date-time */
            updatedAt: Date;
            deletedAt?: Date | null;
        };
        Card: {
            title: string;
            /** Format: int32 */
            unit: number;
            card: components["schemas"]["CardType"];
            pick?: number | null;
            dangerous?: [
                number,
                number,
                number
            ];
            /** Format: int32 */
            score?: number;
            action?: string | null;
            /** @enum {number} */
            token?: 1 | 2;
            mode?: components["schemas"]["CardMode"];
        } & components["schemas"]["BaseEntity"];
        /** @enum {string} */
        CardMode: "NORMAL" | "HARD";
        /** @enum {string} */
        CardType: "KNOWLEDGE" | "SKILL" | "DANGEROUS" | "AGE";
        CreateCardRequest: {
            title: string;
            /** Format: int32 */
            unit?: number;
            card?: components["schemas"]["CardType"];
            pick?: number | null;
            dangerous?: [
                number,
                number,
                number
            ];
            /** Format: int32 */
            score?: number;
            action?: string | null;
            /** @enum {number} */
            token?: 1 | 2;
            mode?: components["schemas"]["CardMode"];
        };
        CreateUserRequest: {
            name: string;
            email: string;
            password: string;
            isActive?: boolean;
            isAdmin?: boolean;
            lastLogin?: Date | null;
        };
        EmptyData: Record<string, never>;
        ErrorResponse: {
            success: boolean;
            message: string;
            error: string;
        };
        UpdateCardRequest: {
            title?: string;
            /** Format: int32 */
            unit?: number;
            card?: components["schemas"]["CardType"];
            pick?: number | null;
            dangerous?: [
                number,
                number,
                number
            ];
            /** Format: int32 */
            score?: number;
            action?: string | null;
            /** @enum {number} */
            token?: 1 | 2;
            mode?: components["schemas"]["CardMode"];
        };
        UpdateUserRequest: {
            name?: string;
            email?: string;
            password?: string | null;
            isActive?: boolean;
            isAdmin?: boolean;
            lastLogin?: Date | null;
        };
        User: {
            name: string;
            email: string;
            password?: string | null;
            isActive: boolean;
            isAdmin: boolean;
            lastLogin?: Date | null;
        } & components["schemas"]["BaseEntity"];
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    CardService_listCards: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The request has succeeded. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        success: boolean;
                        message: string;
                        data?: components["schemas"]["Card"][];
                        error?: string;
                    };
                };
            };
            /** @description The server could not understand the request due to invalid syntax. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Access is unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The server cannot find the requested resource. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request conflicts with the current state of the server. */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    CardService_createCard: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateCardRequest"];
            };
        };
        responses: {
            /** @description The request has succeeded. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        success: boolean;
                        message: string;
                        data?: components["schemas"]["Card"];
                        error?: string;
                    };
                };
            };
            /** @description The server could not understand the request due to invalid syntax. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Access is unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The server cannot find the requested resource. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request conflicts with the current state of the server. */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    CardService_getCard: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The request has succeeded. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        success: boolean;
                        message: string;
                        data?: components["schemas"]["Card"];
                        error?: string;
                    };
                };
            };
            /** @description The server could not understand the request due to invalid syntax. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Access is unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The server cannot find the requested resource. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request conflicts with the current state of the server. */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    CardService_updateCard: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateCardRequest"];
            };
        };
        responses: {
            /** @description The request has succeeded. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        success: boolean;
                        message: string;
                        data?: components["schemas"]["Card"];
                        error?: string;
                    };
                };
            };
            /** @description The server could not understand the request due to invalid syntax. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Access is unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The server cannot find the requested resource. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request conflicts with the current state of the server. */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    CardService_deleteCard: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The request has succeeded. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        success: boolean;
                        message: string;
                        data?: components["schemas"]["EmptyData"];
                        error?: string;
                    };
                };
            };
            /** @description The server could not understand the request due to invalid syntax. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Access is unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The server cannot find the requested resource. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request conflicts with the current state of the server. */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    UserService_listUsers: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The request has succeeded. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        success: boolean;
                        message: string;
                        data?: components["schemas"]["User"][];
                        error?: string;
                    };
                };
            };
            /** @description The server could not understand the request due to invalid syntax. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Access is unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The server cannot find the requested resource. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request conflicts with the current state of the server. */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    UserService_createUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateUserRequest"];
            };
        };
        responses: {
            /** @description The request has succeeded. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        success: boolean;
                        message: string;
                        data?: components["schemas"]["User"];
                        error?: string;
                    };
                };
            };
            /** @description The server could not understand the request due to invalid syntax. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Access is unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The server cannot find the requested resource. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request conflicts with the current state of the server. */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    UserService_getUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The request has succeeded. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        success: boolean;
                        message: string;
                        data?: components["schemas"]["User"];
                        error?: string;
                    };
                };
            };
            /** @description The server could not understand the request due to invalid syntax. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Access is unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The server cannot find the requested resource. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request conflicts with the current state of the server. */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    UserService_updateUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUserRequest"];
            };
        };
        responses: {
            /** @description The request has succeeded. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        success: boolean;
                        message: string;
                        data?: components["schemas"]["User"];
                        error?: string;
                    };
                };
            };
            /** @description The server could not understand the request due to invalid syntax. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Access is unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The server cannot find the requested resource. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request conflicts with the current state of the server. */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    UserService_deleteUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The request has succeeded. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        success: boolean;
                        message: string;
                        data?: components["schemas"]["EmptyData"];
                        error?: string;
                    };
                };
            };
            /** @description The server could not understand the request due to invalid syntax. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Access is unauthorized. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The server cannot find the requested resource. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description The request conflicts with the current state of the server. */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
}
