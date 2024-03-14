import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root",
    initialState: {
        isbn: "ISBN number",
        author: "Author Name",
        title: "Title of the Book",
        genre: "Genre",
    },
    reducers: {
        chooseIsbn: (state, action) => { state.isbn = action.payload},
        chooseAuthor: (state, action) => { state.author= action.payload},
        chooseTitle: (state, action) => { state.title = action.payload},
        chooseGenre: (state, action) => { state.genre = action.payload},
    }
})

export const reducer = rootSlice.reducer;
export const { chooseIsbn, chooseAuthor, chooseTitle, chooseGenre} = rootSlice.actions