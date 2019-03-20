import { autobind } from '@uifabric/utilities';
import * as moment from "moment";
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as React from "react";
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { MultipleUrlOpener } from 'src/components/AffiliateMultipleUrlOpener/MultipleUrlOpener';
import { IAffiliateLink } from 'src/model/AffiliateLink';
import { IOptionType } from 'src/model/OptionType';
import { StringConstant } from '../../constants/StringConstant';
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
    offerVariableName: string;
    bookingVariableName: string;
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
        const {title, offerVariableName, bookingVariableName} = this.props;
        return (
            <>
                <h3>{title}</h3>
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
                <MultipleUrlOpener title={"Supported Sites"} variableNames={[bookingVariableName]} />
                <MultipleUrlOpener title={offerVariableName} variableNames={[offerVariableName]} />
                <MultipleUrlOpener title={StringConstant.travelOffer} variableNames={[StringConstant.travelOffer]} />
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