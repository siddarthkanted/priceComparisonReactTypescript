import { autobind } from '@uifabric/utilities';
import produce from "immer";
import * as moment from "moment";
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as React from "react";
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { Utils } from "src/common/Utils";
import { AffiliateMultipleUrlOpener } from 'src/components/AffiliateMultipleUrlOpener/AffiliateMultipleUrlOpener';
import { IAffiliateLink, IOptionType, OptionTypeUtils } from 'src/model/Model';
import './Travel.css';

enum FieldsEnum {
    FromPlace = "FromPlace",
    ToPlace = "ToPlace",
    Date = "Date"
}

interface ITravelProps {
    links: IAffiliateLink[];
    offerLinks: IAffiliateLink[];
    options: Array<ValueType<IOptionType>>;
    title: string;
}

interface ITravelState {
    fromPlace: ValueType<IOptionType>;
    toPlace: ValueType<IOptionType>;
    date: moment.Moment
    errorDictionary: _.Dictionary<FieldsEnum>;
}

export class Travel extends React.Component<ITravelProps, ITravelState> {
    constructor(props: ITravelProps) {
        super(props);
        this.state = {
            date: moment(),
            errorDictionary: {},
            fromPlace: null,
            toPlace: null
        }
    }

    public componentDidMount(): void {
        document.title = this.props.title;
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
                <AffiliateMultipleUrlOpener
                    getLinks={this.getLinks}
                />
                {this.props.offerLinks && <AffiliateMultipleUrlOpener
                    getLinks={() => this.props.offerLinks}
                    title={"Offers - " + this.props.title}
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

    private validate(): _.Dictionary<FieldsEnum> {
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
        return errorDictionary;
    }

    @autobind
    private getLinks(validate: boolean): IAffiliateLink[] {
        if (!validate) {
            return this.props.links;
        }
        const errorDictionary = this.validate();
        if (Object.keys(errorDictionary).length > 0) {
            return [];
        }
        return this.props.links.map(link => this.handleVariedLink(link));
    }

    private handleVariedLink(affiliateLink: IAffiliateLink): IAffiliateLink {
        const { fromPlace, toPlace, date } = this.state;
        let fromPlaceValue = OptionTypeUtils.getValue(fromPlace);
        let toPlaceValue = OptionTypeUtils.getValue(toPlace);
        if (affiliateLink.variedOptions) {
            fromPlaceValue = affiliateLink.variedOptions[fromPlaceValue] ? affiliateLink.variedOptions[fromPlaceValue] : fromPlaceValue;
            toPlaceValue = affiliateLink.variedOptions[toPlaceValue] ? affiliateLink.variedOptions[toPlaceValue] : toPlaceValue;
        }
        const clonedAffiliateLink = produce(affiliateLink, (clonedLink) => { clonedLink.link = Utils.format(clonedLink.link, fromPlaceValue, toPlaceValue, this.getTwoDigit(date.date()), this.getTwoDigit(date.month() + 1), date.year()); });
        return clonedAffiliateLink;
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