import { autobind } from '@uifabric/utilities';
import produce from "immer";
import { AllGroceryActions, SetGrocery } from "src/components/Product/Actions";
import { IGroceryReducer, Status } from 'src/model/Model';

type HandledActions = typeof AllGroceryActions;

export class GroceryReducer {
    @autobind
    public handleAction(state: IGroceryReducer = this.getInitialState(), action: HandledActions): IGroceryReducer {
        return produce(state, draft => {
            switch (action.type) {
                case SetGrocery.type:
                    const {groceryList} = action.payload;
                    draft.groceryList = groceryList;
                    draft.status = groceryList.length === 0 ? Status.Failure: Status.Success;
                    return;
            }
        });
    }

    public getInitialState(): IGroceryReducer {
        return {
            groceryList: [],
            status: Status.NotStarted
        };
    }
}