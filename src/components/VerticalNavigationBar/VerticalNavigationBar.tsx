import { Dictionary } from "lodash";
import orderBy from "lodash-es/orderBy";
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
    const categoriesDictionary: Dictionary<Set<string>> = {};
    dataList.map(data => addCategory(categoriesDictionary, data));
    const keyArray = orderBy(Object.keys(categoriesDictionary));
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
function createLinks(categoriesDictionary: Dictionary<Set<string>>, parentCateogry: string): INavLink {
    const childCategories = orderBy(Array.from(categoriesDictionary[parentCateogry]));
    const links: INavLink[] = [];
    childCategories.forEach(childCategory => {
        links.push(createLink(parentCateogry, childCategory));
    }); 
    return {
        isExpanded: true,
        links,
        name: parentCateogry,
        onClick: () => Utils.setUrlPath("Grocery", parentCateogry),
        url: ""
    };
}

/**
 * Create Child Link
 */
function createLink(parentCateogry: string, childCategory: string): INavLink {
    return {
        key: childCategory,
        name: childCategory,
        onClick: () => Utils.setUrlPath("Grocery", parentCateogry, childCategory),
        url: ""
    }
}

function addCategory(categoriesDictionary: Dictionary<Set<string>>, data: any): void {
    if (!categoriesDictionary[data.Category[0]]) {
        categoriesDictionary[data.Category[0]] = new Set<string>();
    }
    categoriesDictionary[data.Category[0]].add(data.Category[1]);
}