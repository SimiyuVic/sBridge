import { createSlice } from "@reduxjs/toolkit";

const prodSlice = createSlice({
    name: "auth",
    initialState: {
        link: "http://localhost:4002"
    }
});

export default prodSlice.reducer;