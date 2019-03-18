import { autobind } from '@uifabric/utilities';
import * as React from "react";
import { RouteComponentProps } from "react-router";
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { Utils } from "src/common/Utils";
import { PartnerList } from 'src/constants/Constants';
import { CategoryUtils } from 'src/model/Category';
import { IOptionType, OptionTypeUtils } from 'src/model/Model';

interface IUrlParams {
    selectedPartner?: string;
}

interface IPartnerProps  extends RouteComponentProps<IUrlParams> {

}

interface IPartnerState {
    selectedPartner: ValueType<IOptionType>;
}

export class Partner extends React.Component<IPartnerProps, IPartnerState> {
    private allOption = {value: "All partners", label: "All partners"};

    public componentWillMount(): void {
        this.setSelectedPartner();
    }

    public componentDidMount(): void {
        document.title = "Partner - " + OptionTypeUtils.getLabel(this.state.selectedPartner);
    }

    public render(): JSX.Element {
        return (
            <>
                <h3>{"Partners"}</h3>
                <Select
                    value={this.state.selectedPartner}
                    onChange={this.dropdownOnChange}
                    options={[this.allOption, 
                        ...PartnerList.map(partner => OptionTypeUtils.createOptionType(partner.name))]}
                />
            </>
        );
    }

    private dropdownOnChange(displayCategory: ValueType<IOptionType>): void {
        window.location.href = CategoryUtils.getUrl(displayCategory);
    }

    @autobind
    private setSelectedPartner(): void {
        const { selectedPartner } = this.props.match.params;
        if (!selectedPartner) {
            this.setState({selectedPartner: this.allOption});
            return;
        } else {
            const selectedPartnerObj = PartnerList.find(partner => Utils.convertToSlug(partner.name) === selectedPartner);
            this.setState({selectedPartner: selectedPartnerObj ? OptionTypeUtils.createOptionType(selectedPartnerObj.name) : this.allOption});
        } 
    }
}