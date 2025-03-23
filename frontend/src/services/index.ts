import axios from "axios";


export async function post<T, U>(url: string, data: T): Promise<U> {
    return axios.post(url, data)
    .then(response => response.data)
    .catch((error: any) => error.response.data as { message: string, error: any});
}

export async function get<T>(url: string): Promise<T> {
    return axios.get(url)
    .then(response => response.data)
    .catch((error: any) => error.response.data as { message: string, error: any});
}

export async function put<T, U>(url: string, data: T): Promise<U> {
    return axios.put(url, data)
    .then(response => response.data)
    .catch((error: any) => error.response.data as { message: string, error: any});
}

export async function del<T>(url: string): Promise<T> {
    return axios.delete(url)
    .then(response => response.data)
    .catch((error: any) => error.response.data as { message: string, error: any});
}