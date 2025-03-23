import axiosInstance from "../api/axiosInstance";


export async function post<T, U>(url: string, data: T): Promise<U> {
    return axiosInstance.post(url, data)
    .then(response => response.data)
    .catch((error: any) => error.response.data as { message: string, error: any});
}

export async function get<T>(url: string): Promise<T> {
    return axiosInstance.get(url)
    .then(response => response.data)
    .catch((error: any) => error.response.data as { message: string, error: any});
}

export async function put<T, U>(url: string, data: T): Promise<U> {
    return axiosInstance.put(url, data)
    .then(response => response.data)
    .catch((error: any) => error.response.data as { message: string, error: any});
}

export async function del<T>(url: string): Promise<T> {
    return axiosInstance.delete(url)
    .then(response => response.data)
    .catch((error: any) => error.response.data as { message: string, error: any});
}