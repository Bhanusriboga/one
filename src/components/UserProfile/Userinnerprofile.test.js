import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Userprofile from './Userprofile';

describe('Userprofile Component', () => {
    test('Initial state and render', () => {
        const { getByAltText } = render(<Userprofile />);
        expect(getByAltText('Card image cap').src).toContain('Image1.jpeg');
    });

    test('Resize window to mobile view', () => {
        global.innerWidth = 500;
        const { container } = render(<Userprofile />);
        global.dispatchEvent(new Event('resize'));
        expect(container.querySelector('.main')).toHaveClass('mobile');
    });

    test('Resize window to desktop view', () => {
        global.innerWidth = 1000;
        const { container } = render(<Userprofile />);
        global.dispatchEvent(new Event('resize'));
        expect(container.querySelector('.main')).not.toHaveClass('mobile');
    });

    test('Toggle heart icon', () => {
        const { container } = render(<Userprofile />);
        const heartIcon = container.querySelector('.icons.fa-heart');
        fireEvent.click(heartIcon);
        expect(heartIcon).toHaveClass('clicked');
    });

    test('Toggle minus icon', () => {
        const { container } = render(<Userprofile />);
        const minusIcon = container.querySelector('.icons.fa-minus-square');
        fireEvent.click(minusIcon);
        expect(minusIcon).toHaveClass('clicked');
    });

    test('Change displayed image', () => {
        const { getByAltText, getAllByAltText } = render(<Userprofile />);
        const newImage = getAllByAltText('Clickable card')[0];
        fireEvent.click(newImage);
        expect(getByAltText('Card image cap').src).toContain('Image2.jpeg');
    });

    test('Mobile view layout correctness', () => {
        global.innerWidth = 500;
        const { container, getByAltText, getAllByAltText } = render(<Userprofile />);
        global.dispatchEvent(new Event('resize'));
        expect(container.querySelector('.main')).toHaveClass('mobile');
        expect(getByAltText('Card image cap').src).toContain('Image1.jpeg');
        expect(getAllByAltText('Clickable card').length).toBe(4);
    });

    test('Desktop view layout correctness', () => {
        global.innerWidth = 1000;
        const { container, getByAltText, getAllByAltText } = render(<Userprofile />);
        global.dispatchEvent(new Event('resize'));
        expect(container.querySelector('.main')).not.toHaveClass('mobile');
        expect(getByAltText('Card image cap').src).toContain('Image1.jpeg');
        expect(getAllByAltText('Clickable card').length).toBe(4);
    });                                                                                              
});
                                                                                                                                                                                                                                                                                         