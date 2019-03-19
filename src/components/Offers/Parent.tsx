import { autobind } from '@uifabric/utilities';
import * as React from "react";
import { RouteComponentProps } from 'react-router';
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { Utils } from 'src/common/Utils';
import { StringConstant } from 'src/constants/StringConstant';
import { IOptionType, OptionTypeUtils } from 'src/model/OptionType';

interface IUrlParams {
    urlParam?: string;
}

interface IParentProps extends RouteComponentProps<IUrlParams> { }

interface IParentState {
    selectedOption: ValueType<IOptionType>;
}

export abstract class Parent extends React.Component<IParentProps, IParentState> {
    private allOption = OptionTypeUtils.createOptionType(StringConstant.all, Utils.format("All {0}", this.getTitle));

    constructor(props: IParentProps) {
        super(props);
        this.state = { selectedOption: this.getSelectedOption() };
        this.setDocumentTitle();
    }

    public render(): JSX.Element {
        const { selectedOption } = this.state;
        return (
            <>
                <h3>{this.getTitle()}</h3>
                <Select
                    value={selectedOption}
                    onChange={this.dropdownOnChange}
                    options={[this.allOption, ...this.getList()]}
                />
                {OptionTypeUtils.getValue(selectedOption) === StringConstant.all ? this.renderAll() : this.renderOption(selectedOption)}
            </>
        );
    }

    protected abstract renderOption(option: ValueType<IOptionType>): JSX.Element;
    protected abstract getTitle(): string;
    protected abstract getList(): Array<ValueType<IOptionType>>;

    private renderAll(): JSX.Element[] {
        return this.getList().map(item => this.renderOption(item));
    }

    @autobind
    private dropdownOnChange(selectedOption: ValueType<IOptionType>): void {
        Utils.setUrlPath(this.getTitle(), OptionTypeUtils.getValue(selectedOption));
        this.setState({ selectedOption }, this.setDocumentTitle);
    }

    @autobind
    private getSelectedOption(): ValueType<IOptionType> {
        const { urlParam } = this.props.match.params;
        if (!urlParam) {
            return this.allOption;
        } else {
            const selectedOption = this.getList().find(item =>
                Utils.convertToSlug(OptionTypeUtils.getValue(item)) === urlParam);
            return selectedOption ? selectedOption : this.allOption;
        }
    }

    @autobind
    private setDocumentTitle(): void {
        document.title = Utils.format("{0} - {1}", this.getTitle(),
            OptionTypeUtils.getLabel(this.state.selectedOption));
    }
}