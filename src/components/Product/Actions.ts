import { IGrocery, Status } from 'src/model/Model';
import { action, payload, union } from "ts-action";

export const SetGrocery = action(
    "SetGrocery",
    payload<{
        groceryList: IGrocery[];
    }>()
);

export const SetStatus = action(
    "SetStatus",
    payload<{
        status: Status;
    }>()
);

export const AllGroceryActions = union({
    SetGrocery,
    SetStatus
});