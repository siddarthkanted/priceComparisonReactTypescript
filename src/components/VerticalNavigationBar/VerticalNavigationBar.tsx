import { Dictionary } from "lodash";
import { INavLink, Nav } from 'office-ui-fabric-react/lib/Nav';
import * as React from "react";
import { Utils } from "src/common/Utils";
import './VerticalNavigationBar.css';

interface IVerticalNavigationBarProps {
    // tslint:disable:react-unused-props-and-state
    dataList: any;
}

export const VerticalNavigationBar: React.SFC<IVerticalNavigationBarProps> = (props: IVerticalNavigationBarProps) => {
    const { dataList } = props;
    const categoriesDictionary: Dictionary<string[]> = {};
    dataList.map(data => addCategory(categoriesDictionary, data));
    const keyArray = Object.keys(categoriesDictionary);
    const links = keyArray.map(key => createLinks(categoriesDictionary, key));
    return (
        <Nav groups={[
            {
                links
            }
        ]} expandedStateText={'expanded'} collapsedStateText={'collapsed'} selectedKey={keyArray[0]} expandButtonAriaLabel={'Expand or collapse'} />
    );
};

/**
 * Create Parent Link
 */
function createLinks(categoriesDictionary: Dictionary<string[]>, parentCateogry: string): INavLink {
    const links = categoriesDictionary[parentCateogry].map(childCategory => createLink(parentCateogry, childCategory));
    return {
        isExpanded: true,
        links,
        name: parentCateogry,
        url: Utils.getUrl("Grocery", parentCateogry)
    };
}

/**
 * Create Child Link
 */
function createLink(parentCateogry: string, childCategory: string): INavLink {
    return {
        key: childCategory,
        name: childCategory,
        url: Utils.getUrl("Grocery", parentCateogry, childCategory)
    }
}

function addCategory(categoriesDictionary: Dictionary<string[]>, data: any): void {
    if (!categoriesDictionary[data.Category[0]]) {
        categoriesDictionary[data.Category[0]] = [];
    }
    categoriesDictionary[data.Category[0]].push(data.Category[1]);
}