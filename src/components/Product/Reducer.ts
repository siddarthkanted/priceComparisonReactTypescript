import produce from "immer";
import { AllGroceryActions, SetGrocery } from "src/components/Product/Actions";
import { IGroceryReducer } from 'src/model/Model';

type HandledActions = typeof AllGroceryActions;

export class GroceryReducer {
    public handleAction(
        state: IGroceryReducer = this.getInitialState(),
        action: HandledActions
    ): IGroceryReducer {
        return produce(state, draft => {
            switch (action.type) {
                case SetGrocery.type:
                    draft.groceryList = action.payload.groceryList;
                    return;
            }
        });
    }

    public getInitialState(): IGroceryReducer {
        return {
            groceryList: []
        };
    }
}