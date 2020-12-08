import axios from "axios";


export function getBooks(query, orderby) {
    return axios.get("/api/getbook", { params: { q: query,  o: orderby } });
}
