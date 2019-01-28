import { autobind } from '@uifabric/utilities';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { List } from 'office-ui-fabric-react/lib/List';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from "react";
import { affilateLinks } from "src/components/Common/Constants";
import { Utils } from "src/Utils";

interface IMultipleUrlOpenerProps {
    /**
     * Make sure getLinks method has autobind annotation
     */
    getLinks: (validate: boolean) => string[];
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
        return (
            <>
                {this.renderSupportedSites()}
                <PrimaryButton
                    text="Open all"
                    onClick={this.onOpenAllClick}
                />
                {this.state.showWarning && this.renderWarning()}
            </>
        );
    }

    private renderSupportedSites(): JSX.Element {
        const items = this.props.getLinks(false).map(link => ({ name: Utils.getHostNameFromUrl(link) }));
        return (
            <>
                <div>Supported Sites</div>
                <List items={items} />
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
            let finalUrl =  link;
            const hostName = Utils.getHostNameFromUrl(finalUrl);
            if (affilateLinks[hostName]) {
                finalUrl = Utils.format(affilateLinks[hostName], finalUrl);
            }
            const windowResponse = window.open(finalUrl);
            if (!windowResponse) {
                windowResponseFailureCount++;
            }
        });
        this.setState({ showWarning: windowResponseFailureCount > 0 ? true : false });
    }
}