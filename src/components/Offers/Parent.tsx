import { autobind } from '@uifabric/utilities';
import * as React from "react";
import { RouteComponentProps } from 'react-router';
import Select from 'react-select/lib/Select';
import { ValueType } from 'react-select/lib/types';
import { Utils } from 'src/common/Utils';
import { StringConstant } from 'src/constants/StringConstant';
import { IOptionType, OptionTypeUtils } from 'src/model/Model';

interface IUrlParams {
    urlParam?: string;
}

interface IParentProps extends RouteComponentProps<IUrlParams> {}

interface IParentState {
    selectedOption: ValueType<IOptionType>;
}

export abstract class Parent<TProps extends IParentProps, TState extends IParentState> extends React.Component<
    TProps,
    TState
    > {
    private allOption = OptionTypeUtils.createOptionType(StringConstant.all, Utils.format("All {0}", this.getTitle));

    public componentDidMount(): void {
        document.title = Utils.format("{0} - {1}", this.getTitle(),
            OptionTypeUtils.getLabel(this.state.selectedOption));
    }

    public componentWillMount(): void {
        this.setSelectedOption();
    }

    public render(): JSX.Element {
        const {selectedOption} = this.state;
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

    private dropdownOnChange(selectedOption: ValueType<IOptionType>): void {
        Utils.setUrlPath(this.getTitle(), OptionTypeUtils.getValue(selectedOption));
    }

    @autobind
    private setSelectedOption(): void {
        const { urlParam } = this.props.match.params;
        if (!urlParam) {
            this.setState({ selectedOption: this.allOption });
            return;
        } else {
            const selectedOption = this.getList().find(item =>
                Utils.convertToSlug(OptionTypeUtils.getValue(item)) === urlParam);
            this.setState({ selectedOption: selectedOption ? selectedOption : this.allOption });
        }
    }
}