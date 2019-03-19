export enum Status {
    NotStarted = "NotStarted",
    Loading = "Loading",
    Success = "Success",
    Failure = "Failure",
}

export interface IRootReducer {
    groceryReducer: IGroceryReducer;
}

export interface IGroceryReducer {
    groceryList: IGrocery[];
    status: Status;
}

export interface IGrocery {
    Category: string[];
    Images: string[];
    Link: string[];
    Name: string[];
}

export interface IRoute {
    className?: string;
    component: React.ComponentClass;
    extraProps?: _.Dictionary<any>;
    name: string;
    path?: string;
}

export interface IWebLink {
    name: string;
    link: string;
}