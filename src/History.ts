import { createBrowserHistory, History } from "history";

/* istanbul ignore next */
export class HistorySingleton {
    public static getInstance(): HistorySingleton {
        if (!HistorySingleton.instance) {
            HistorySingleton.instance = new HistorySingleton();
        }
        return HistorySingleton.instance;
    }

    public static getHistory(): History {
        return this.getInstance().history;
    }

    private static instance: HistorySingleton;
    private history: History = createBrowserHistory({  });
    
    constructor() {
        if (HistorySingleton.instance) {
            throw new Error("Error: Instantiation failed: Use HistorySingleton.getInstance() instead of new.");
        }

        HistorySingleton.instance = this;
    }


}
