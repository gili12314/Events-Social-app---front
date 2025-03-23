
export interface IUser  {
    _id: string
    username: string;
    email: string;
    password?: string; 
    profileImage?: string;
    token?: string;
}

export interface IEvent  {
    _id: string
    title: string;
    description: string;
    image?: string;
    date: string;
    location: string;
    createdBy: IUser
    participants: IUser[]
    likes: string[]
}

export interface INotification  {
    recipient: string | IUser
    sender: string | IUser
    event: string | IEvent
    type: "like" | "join";
    isRead: boolean;
    createdAt: Date;
}
