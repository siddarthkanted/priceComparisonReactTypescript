import { autobind } from '@uifabric/utilities';
import * as moment from "moment";
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as React from "react";
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { MultipleUrlOpener } from "src/components/Common/MultipleUrlOpener";
import { Utils } from "src/Utils";

interface IOptionType { value: string; label: string; }

interface IGenericProps {
    Links: string[];
    Options: Array<ValueType<IOptionType>>;
}

interface IGenericState {
    fromPlace: ValueType<IOptionType>;
    toPlace: ValueType<IOptionType>;
    date?: moment.Moment
}

export class Generic extends React.Component<IGenericProps, IGenericState> {
    constructor(props: IGenericProps) {
        super(props);
        this.state = {
            date: undefined,
            fromPlace: null,
            toPlace: null
        }
    }


    public render(): JSX.Element {
        return (
            <>
                <Label required={true}>
                    {"From Place"}
                </Label>
                <Select
                    value={this.state.fromPlace}
                    onChange={this.setFromPlace}
                    options={this.props.Options}
                />
                <Label required={true}>
                    {"To Place"}
                </Label>
                <Select
                    value={this.state.toPlace}
                    onChange={this.setToPlace}
                    options={this.props.Options}
                />
                <DatePicker
                    label="Travel date"
                    isRequired={true}
                    allowTextInput={true}
                    onSelectDate={this.onTravelDateSelected}
                    value={this.state.date && this.state.date.toDate()}
                />
                <MultipleUrlOpener
                    getLinks={this.getLinks}
                />
            </>
        );
    }

    @autobind
    private getLinks(): string[] {
        const { fromPlace, toPlace, date } = this.state;
        if (!fromPlace || !toPlace || !date) {
            return [];
        }
        return this.props.Links.map(link => Utils.format(link, (fromPlace as IOptionType).value, (toPlace as IOptionType).value, this.getTwoDigit(date.date()), this.getTwoDigit(date.month() + 1), date.year()));
    }

    private getTwoDigit(value: number): string {
        return ("0" + value).slice(-2)
    }

    @autobind
    private onTravelDateSelected(date: Date): void {
        const momentDate = moment(date);
        this.setState({ date: momentDate });
    };

    @autobind
    private setFromPlace(fromPlace: ValueType<{ value: string; label: string; }>): void {
        this.setState({ fromPlace });
    };

    @autobind
    private setToPlace(toPlace: ValueType<{ value: string; label: string; }>): void {
        this.setState({ toPlace });
    };
}