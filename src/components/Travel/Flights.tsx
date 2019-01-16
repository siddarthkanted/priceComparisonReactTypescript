import { autobind } from '@uifabric/utilities';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import * as React from "react";


interface IFlightsState {
    fromPlace: string;
    toPlace: string;
    toDate?: Date;
}

export class Flights extends React.Component<any, IFlightsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            fromPlace: "",
            toDate: undefined,
            toPlace:""
        };
    }

    public render(): JSX.Element {
        return (
            
            <DatePicker
          label="Travel date"
          isRequired={true}
          allowTextInput={true}
          onSelectDate={this.onTravelDateSelected}
        />);
    }

    @autobind
    private onTravelDateSelected(toDate: Date): void {
        this.setState({ toDate });
    };
      
}