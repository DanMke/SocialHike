import { configureStore } from "@reduxjs/toolkit";
import { Reducers } from '../reducers';

export const store = configureStore({
    reducer: Reducers,
});