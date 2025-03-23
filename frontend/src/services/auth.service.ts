import { get, post } from ".";
import { IUser } from "../types";


export async function login(email: string, password: string): Promise<{token:string}> {
    return post("auth/login", { email, password });
}

export async function register(username: string, email: string, password: string): Promise<{token:string}> {
    return post("auth/register", { username, email, password });
}

export async function me(): Promise<IUser> {
    return get("auth/profile");
}