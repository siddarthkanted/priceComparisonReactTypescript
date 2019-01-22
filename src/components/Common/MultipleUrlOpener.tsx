import { autobind } from '@uifabric/utilities';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as React from "react";
import './MultipleUrlOpener.css';

interface IMultipleUrlOpenerProps {
    /**
     * Make sure getLinks method has autobind annotation
     */
    getLinks: () => string[];
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
                {this.state.showWarning && this.renderWarning()}
                <PrimaryButton
                    text="Open all"
                    onClick={this.onOpenAllClick}
                />
            </>
        );
    }

    private renderWarning(): JSX.Element {
        return (
            <Label className="warning">
                {"By default popup is blocked, Please allow pop-up to this site unless it will not work."}
            </Label>
        );
    }

    @autobind
    private onOpenAllClick(): void {
        const links = this.props.getLinks();
        let windowResponseFailureCount = 0;
        links.forEach(link => {
            const windowResponse = window.open(link);
            if (!windowResponse) {
                windowResponseFailureCount++;
            }
        });
        this.setState({ showWarning: windowResponseFailureCount > 0 ? true : false });
    }
}