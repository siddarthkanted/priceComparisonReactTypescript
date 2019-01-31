import { autobind } from '@uifabric/utilities';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from "react";
import { IAffiliateLink } from 'src/components/Common/Model';
import { Utils } from "src/components/Common/Utils";
import './AffiliateMultipleUrlOpener.css';

interface IAffiliateMultipleUrlOpenerProps {
    title?: string;
    renderDescription?: () => JSX.Element;
    /**
     * Make sure getLinks method has autobind annotation
     */
    getLinks: (validate: boolean) => IAffiliateLink[];
}

interface IAffiliateMultipleUrlOpenerState {
    showWarning: boolean;
}

export class AffiliateMultipleUrlOpener extends React.Component<IAffiliateMultipleUrlOpenerProps, IAffiliateMultipleUrlOpenerState> {
    constructor(props: IAffiliateMultipleUrlOpenerProps) {
        super(props);
        this.state = {
            showWarning: false
        }
    }

    public render(): JSX.Element {
        return (
            <>
                {this.props.title && this.renderTitle()}
                {this.props.renderDescription && this.props.renderDescription()}
                {this.renderSupportedSites()}
                <PrimaryButton
                    text="Open all"
                    onClick={this.onOpenAllClick}
                />
                {this.state.showWarning && this.renderWarning()}
            </>
        );
    }

    private renderTitle(): JSX.Element {
        return (
            <h3>
                {this.props.title}
            </h3>
        );
    }

    private renderSupportedSites(): JSX.Element {
        return (
            <>
                <div>Supported Sites</div>
                <ol>
                    {this.props.getLinks(false).map((link, index) => this.renderAffiliateLink(link, index))}
                </ol>
            </>
        );
    }

    @autobind
    private renderAffiliateLink(affiliateLink: IAffiliateLink, index: number): JSX.Element {
        return (
            <li key={index}>
                <span>{affiliateLink.name ? affiliateLink.name : Utils.getHostNameFromUrl(affiliateLink.link)}</span>
                {affiliateLink.referralCode && this.renderLabelValue("Referral code", affiliateLink.referralCode)}
                {affiliateLink.email && this.renderLabelValue("Email", affiliateLink.email)}
                {affiliateLink.phone && this.renderLabelValue("Phone", affiliateLink.phone)}
            </li>
        );
    }

    private renderLabelValue(label: string, value: string): JSX.Element {
        return (
            <>
                <span className={"marginLeft"}><b>{label}:</b></span>
                <span className={"marginLeft"}>{value}</span>
            </>
        );
    }

    private renderWarning(): JSX.Element {
        return (
            <>
                <MessageBar messageBarType={MessageBarType.severeWarning}>
                    {"By default popup is blocked, Please allow pop-up to this site unless it will not work."}
                </MessageBar>
            </>
        );
    }

    @autobind
    private onOpenAllClick(): void {
        const links = this.props.getLinks(true);
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