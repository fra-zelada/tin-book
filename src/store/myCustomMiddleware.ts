import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

import { addNewFavNotification } from "@/slice";

const myCustomMiddleware: Middleware =
    (storeAPI: MiddlewareAPI<AppDispatch>) => (next) => (action) => {
        // Verificar si la acción despachada es la acción que te interesa
        if (action.type === "Books/addFavBook") {
            console.log("dispatchhhhhh");
            storeAPI.dispatch(addNewFavNotification(1));
        }

        // Continuar con el flujo normal de despacho de la acción
        return next(action);
    };

export default myCustomMiddleware;
