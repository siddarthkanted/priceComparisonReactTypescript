import { autobind } from '@uifabric/utilities';
import * as moment from "moment";
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as React from "react";
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { MultipleUrlOpener } from "src/components/Common/MultipleUrlOpener";
import { Utils } from "src/components/Common/Utils";
import './Generic.css';

interface IOptionType { value: string; label: string; }

enum FieldsEnum {
    FromPlace,
    ToPlace,
    Date
}

export interface IGenericProps {
    links: string[];
    offerLinks: string[];
    options: Array<ValueType<IOptionType>>;
    title: string;
    variedLinks?: _.Dictionary<_.Dictionary<string>>
}

interface IGenericState {
    fromPlace: ValueType<IOptionType>;
    toPlace: ValueType<IOptionType>;
    date: moment.Moment
    errorDictionary: _.Dictionary<FieldsEnum>;
}

export class Generic extends React.Component<IGenericProps, IGenericState> {
    constructor(props: IGenericProps) {
        super(props);
        this.state = {
            date: moment(),
            errorDictionary: {},
            fromPlace: null,
            toPlace: null
        }
    }


    public render(): JSX.Element {
        return (
            <>
                <h3>{this.props.title}</h3>
                <Label required={true}>
                    {"From Place"}
                </Label>
                <Select
                    value={this.state.fromPlace}
                    onChange={this.setFromPlace}
                    options={this.props.options}
                />
                {this.renderWarning(FieldsEnum.FromPlace)}
                <Label required={true}>
                    {"To Place"}
                </Label>
                <Select
                    value={this.state.toPlace}
                    onChange={this.setToPlace}
                    options={this.props.options}
                />
                {this.renderWarning(FieldsEnum.ToPlace)}
                <DatePicker
                    label="Travel date"
                    isRequired={true}
                    allowTextInput={true}
                    onSelectDate={this.onTravelDateSelected}
                    value={this.state.date && this.state.date.toDate()}
                />
                {this.renderWarning(FieldsEnum.Date)}
                <MultipleUrlOpener
                    getLinks={this.getLinks}
                />
                {this.props.offerLinks && <MultipleUrlOpener
                    getLinks={() => this.props.offerLinks}
                    title= {"Offers - " + this.props.title}
                />}
            </>
        );
    }

    private renderWarning(field: FieldsEnum): JSX.Element | undefined {
        const message = this.state.errorDictionary[field];
        if (message) {
            return (
                <div className="warning">
                    {message}
                </div>
            );
        }
        return;
    }

    private validate(): void {
        const errorDictionary = {};
        if (!this.state.fromPlace) {
            errorDictionary[FieldsEnum.FromPlace] = "From Place cannot be empty";
        }
        if (!this.state.toPlace) {
            errorDictionary[FieldsEnum.ToPlace] = "To Place cannot be empty";
        }
        if (!this.state.date) {
            errorDictionary[FieldsEnum.Date] = "Date cannot be empty";
        }
        else if (!this.state.date.isValid()) {
            errorDictionary[FieldsEnum.Date] = "Date is invalid";
        }
        this.setState({ errorDictionary });
    }

    @autobind
    private getLinks(validate: boolean): string[] {
        if (!validate) {
            return this.props.links;
        }
        this.validate();
        if (Object.keys(this.state.errorDictionary).length > 0) {
            return [];
        }
        return this.props.links.map(link => this.handleVariedLink(link));
    }

    private handleVariedLink(link: string): string {
        const { fromPlace, toPlace, date } = this.state;
        let fromPlaceValue = (fromPlace as IOptionType).value;
        let toPlaceValue = (toPlace as IOptionType).value;
        if (this.props.variedLinks && this.props.variedLinks[link]) {
            fromPlaceValue = this.props.variedLinks[link][fromPlaceValue] ? this.props.variedLinks[link][fromPlaceValue] : fromPlaceValue;
            toPlaceValue = this.props.variedLinks[link][toPlaceValue] ? this.props.variedLinks[link][toPlaceValue] : toPlaceValue;
        }
        return Utils.format(link, fromPlaceValue, toPlaceValue, this.getTwoDigit(date.date()), this.getTwoDigit(date.month() + 1), date.year());
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