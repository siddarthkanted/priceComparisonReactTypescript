import { autobind } from '@uifabric/utilities';
import { Link } from 'office-ui-fabric-react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from "react";
import { AffiliateLinkUtils, IAffiliateLink } from 'src/model/AffiliateLink';
import { IWebLink } from 'src/model/Model';
import './AffiliateMultipleUrlOpener.css';
import { Utils } from 'src/common/Utils';

interface IMultipleUrlOpenerProps {
    title?: string;
    variableNames: string[];
    partners: IAffiliateLink[];
}

interface IMultipleUrlOpenerState {
    showWarning: boolean;
}

export class MultipleUrlOpener extends React.Component<IMultipleUrlOpenerProps, IMultipleUrlOpenerState> {
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
                    onClick={() => this.onOpenAllClick}
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
        if (variableNames.length > 1) {
            return variableNames.map(variableName =>
                ({ name: variableName, link: AffiliateLinkUtils.getAffiliatedLink(partners[0], partners[0][variableName]) }));
        } else {
            return partners.map(partner =>
                ({ name: partner.name, link: AffiliateLinkUtils.getAffiliatedLink(partner, partner[variableNames[0]]) }));
        }
    }

    private getLink(name: string, link: string, partner: IAffiliateLink): IWebLink | undefined {
        if (Utils.isStringNullOrEmpty(link)) {
            return;
        }
        return { name, link: AffiliateLinkUtils.getAffiliatedLink(partner, link) }
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