import React from "react";
import Paginator from "./Paginator";
import { create } from "react-test-renderer";

describe('<Paginator/>', () => {
    test('pagesCount = 11 but displayed only 10', () => {
        const component  = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>);
        const root = component.root;
        const spans = root.findAllByType('span');
        expect(spans.length).toBe(10);
    });
    test('if pagesCount more than 10 button NEXT should be displayed', () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1}/>);
        const root = component.root;
        const button = root.findByType('button');
        expect(button).not.toBeNull();
    });
});