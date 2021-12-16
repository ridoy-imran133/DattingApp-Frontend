import { Photo } from "./photo";

export interface User{
        id: string;
        username: string;
        gender: string;
        dateOfBirth: Date;
        knownAs: string;
        createdDate: Date;
        lastActive: Date
        introduction?: string;
        lookingFor?: string;
        interests?: string;
        city: string;
        country: string;   
        photoUrl: string;
        photos?: Photo[];
}