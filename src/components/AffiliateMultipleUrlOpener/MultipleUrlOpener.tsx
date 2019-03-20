import { autobind } from '@uifabric/utilities';
import { Link } from 'office-ui-fabric-react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from "react";
import { Utils } from 'src/common/Utils';
import { PartnerList } from 'src/constants/Constants';
import { StringConstant } from 'src/constants/StringConstant';
import { AffiliateLinkUtils, IAffiliateLink } from 'src/model/AffiliateLink';
import { IWebLink } from 'src/model/Model';
import './AffiliateMultipleUrlOpener.css';

interface IMultipleUrlOpenerProps {
    title?: string;
    variableNames: string[];
    partners: IAffiliateLink[];
}

interface IMultipleUrlOpenerState {
    showWarning: boolean;
}

export class MultipleUrlOpener extends React.Component<IMultipleUrlOpenerProps, IMultipleUrlOpenerState> {
    public static defaultProps = {
        partners: PartnerList,
        variableNames: StringConstant.offerVariableNameList,
    };

    constructor(props: IMultipleUrlOpenerProps) {
        super(props);
        this.state = {
            showWarning: false
        }
    }

    public render(): JSX.Element {
        const { title } = this.props;
        const links: IWebLink[] = this.getLinks();
        return (
            <>
                {title && <h3> {title} </h3>}
                <ol>
                    {links.map((link, index) => this.renderLink(link, index))}
                </ol>
                <PrimaryButton
                    text="Open all"
                    onClick={() => this.onOpenAllClick(links)}
                />
                {this.state.showWarning && this.renderWarning()}
            </>
        );
    }

    private renderWarning(): JSX.Element {
        return (
            <MessageBar messageBarType={MessageBarType.severeWarning}>
                {"By default popup is blocked, Please allow pop-up to this site unless it will not work."}
            </MessageBar>
        );
    }

    private renderLink(webLink: IWebLink, index: number): JSX.Element {
        return (
            <li key={index}>
                <Link href={webLink.link} target="_blank">
                    {webLink.name}
                </Link>
            </li>
        );
    }

    private getLinks(): IWebLink[] {
        const { variableNames, partners } = this.props;
        const webLinks: IWebLink[] = [];
        if (variableNames.length > 1) {
            variableNames.forEach(variableName => 
                this.addLink(webLinks, variableName, partners[0][variableName], partners[0]));
        } else {
            partners.forEach(partner =>
                this.addLink(webLinks, partner.name, partner[variableNames[0]], partner));
        }
        return webLinks;
    }

    private addLink(webLinks: IWebLink[], name: string, link: string, partner: IAffiliateLink): void {
        if (Utils.isStringNullOrEmpty(link)) {
            return;
        }
        webLinks.push({ name, link: AffiliateLinkUtils.getAffiliatedLink(partner, link) });
    }

    @autobind
    private onOpenAllClick(links: IWebLink[]): void {
        let windowResponseFailureCount = 0;
        links.forEach(link => {
            const windowResponse = window.open(link.link);
            if (!windowResponse) {
                windowResponseFailureCount++;
            }
        });
        this.setState({ showWarning: windowResponseFailureCount > 0 ? true : false });
    }
}