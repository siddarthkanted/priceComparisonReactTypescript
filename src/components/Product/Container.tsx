import { autobind } from "office-ui-fabric-react";
import * as React from 'react';
import * as ReactRedux from "react-redux";
import { RouteComponentProps } from "react-router";
import { Utils } from "src/common/Utils";
import 'src/components/Product/Product.css';
import { ProductCard } from 'src/components/Product/ProductCard';
import { VerticalNavigationBar } from 'src/components/VerticalNavigationBar/VerticalNavigationBar';
import { IGrocery, IRootReducer, Status } from 'src/model/Model';
import { getGroceryAction } from './ActionCreator';

interface IUrlParams {
    parentCategory?: string;
    childCategory?: string;
}

interface IContainerPropsConnected {
    dataList: IGrocery[];
    status: Status;
}

interface IContainerPropsActions {
    getGrocery: () => void;
}

interface IContainerProps
    extends IContainerPropsActions,
    IContainerPropsConnected,
    RouteComponentProps<IUrlParams> { }

class Container extends React.Component<IContainerProps> {
    public componentWillMount(): void {
        const { status } = this.props;
        if (status === Status.NotStarted) {
            this.props.getGrocery();
        }
    }

    public render(): JSX.Element | undefined {
        const { status } = this.props;
        switch (status) {
            case Status.NotStarted: return this.renderNotStarted();
            case Status.Loading: return this.renderLoading();
            case Status.Success: return this.renderSuccess();
            case Status.Failure: return this.renderError();
        }
        return;
    }

    private renderSuccess(): JSX.Element {
        document.title = this.getDocumentTitle();
        const { dataList } = this.props;
        return (
            <>
                <VerticalNavigationBar dataList={dataList} />
                <div className={"multipleProductDataList"}>
                    {this.getFilteredDataList().map((data, index) => <ProductCard data={data} key={index} />)}
                </div>
            </>
        );
    }

    private renderError(): JSX.Element {
        return <div>error</div>;
    }

    private renderLoading(): JSX.Element {
        return <div>loading</div>;
    }

    private renderNotStarted(): JSX.Element {
        return <div>initalizing</div>;
    }

    @autobind
    private getFilteredDataList(): IGrocery[] {
        const { dataList } = this.props;
        const { parentCategory, childCategory } = this.props.match.params;
        if (!parentCategory && !childCategory) {
            return dataList;
        }
        else {
            const filteredDataList: IGrocery[] = [];
            if (parentCategory) {
                filteredDataList.push(...dataList.filter(
                    data => data.Category.map(x => Utils.convertToSlug(x)).indexOf(parentCategory) >= 0));
            }
            if (childCategory) {
                return filteredDataList.filter(
                    data => data.Category.map(x => Utils.convertToSlug(x)).indexOf(childCategory) >= 0);
            }
            return filteredDataList;
        }
    }

    @autobind
    private getDocumentTitle(): string {
        const { dataList } = this.props;
        const { parentCategory, childCategory } = this.props.match.params;
        let title = "Price Comaprison";
        if (dataList && parentCategory) {
            title = this.props.dataList[0].Category[0];
        }
        if (dataList && childCategory) {
            title = this.props.dataList[0].Category[0] + "-" + this.props.dataList[0].Category[1];
        }
        return title;
    }
}

function mapStateToProps(state: IRootReducer): IContainerPropsConnected {
    return {
        dataList: state.groceryReducer.groceryList,
        status: state.groceryReducer.status,
    };
}

function mapDispatchToProps(dispatch: any): IContainerPropsActions {
    return {
        getGrocery: () => {
            getGroceryAction(dispatch);
        }
    };
}

export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);