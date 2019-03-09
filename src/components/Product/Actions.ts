import { IGrocery } from 'src/model/Model';
import { action, payload, union } from "ts-action";

export const SetGrocery = action(
    "SetGrocery",
    payload<{
        groceryList: IGrocery[];
    }>()
);

export const AllGroceryActions = union({
    SetGrocery
});