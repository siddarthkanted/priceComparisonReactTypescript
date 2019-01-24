import { autobind } from '@uifabric/utilities';
import * as moment from "moment";
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { List } from 'office-ui-fabric-react/lib/List';
import * as React from "react";
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { MultipleUrlOpener } from "src/components/Common/MultipleUrlOpener";
import { Utils } from "src/Utils";
import './Generic.css';

interface IOptionType { value: string; label: string; }

enum FieldsEnum {
    FromPlace,
    ToPlace,
    Date
}

interface IGenericProps {
    Links: string[];
    OfferLinks: string[];
    Options: Array<ValueType<IOptionType>>;
    Title: string;
}

interface IGenericState {
    fromPlace: ValueType<IOptionType>;
    toPlace: ValueType<IOptionType>;
    date?: moment.Moment
    errorDictionary: _.Dictionary<FieldsEnum>;
}

export class Generic extends React.Component<IGenericProps, IGenericState> {
    constructor(props: IGenericProps) {
        super(props);
        this.state = {
            date: undefined,
            errorDictionary: {},
            fromPlace: null,
            toPlace: null
        }
    }


    public render(): JSX.Element {
        return (
            <>
                <h3>{this.props.Title}</h3>
                {this.renderSupportedSites(this.props.Links)}
                <Label required={true}>
                    {"From Place"}
                </Label>
                <Select
                    value={this.state.fromPlace}
                    onChange={this.setFromPlace}
                    options={this.props.Options}
                />
                {this.renderWarning(FieldsEnum.FromPlace)}
                <Label required={true}>
                    {"To Place"}
                </Label>
                <Select
                    value={this.state.toPlace}
                    onChange={this.setToPlace}
                    options={this.props.Options}
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
                {this.renderOffers()}
            </>
        );
    }

    private renderOffers(): JSX.Element | undefined {
        if (this.props.OfferLinks) {
            return (
                <>
                    <Label required={true}>
                        {"Offers - " + this.props.Title}
                    </Label>
                    {this.renderSupportedSites(this.props.OfferLinks)}
                    <MultipleUrlOpener
                        getLinks={() => this.props.OfferLinks}
                    />
                </>
            )
        }
        return;
    }

    private renderSupportedSites(links: string[]): JSX.Element {
        const items = links.map(link => ({ name: Utils.getHostNameFromUrl(link) }));
        return (
            <>
                <div>Supported Sites</div>
                <List items={items} />
                {}
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
    private getLinks(): string[] {
        this.validate();
        if (Object.keys(this.state.errorDictionary).length > 0) {
            return [];
        }
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