import { render, screen, act } from '@testing-library/react';
import { ThemeContext, ThemeProvider } from '../../contexts/ThemeContext';
import React from 'react';

describe('ThemeContext', () => {
    beforeEach(() => {
        // Mock localStorage
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn()
            },
            writable: true
        });
    });

    test('provides dark theme when localStorage has dark theme', () => {
        window.localStorage.getItem.mockReturnValueOnce('dark');

        let themeContextValue;

        render(
            <ThemeProvider>
                <ThemeContext.Consumer>
                    {value => {
                        themeContextValue = value;
                        return null;
                    }}
                </ThemeContext.Consumer>
            </ThemeProvider>
        );

        expect(themeContextValue.isDarkTheme).toBe(true);
    });

    test('provides light theme when localStorage has light theme', () => {
        window.localStorage.getItem.mockReturnValueOnce('light');

        let themeContextValue;

        render(
            <ThemeProvider>
                <ThemeContext.Consumer>
                    {value => {
                        themeContextValue = value;
                        return null;
                    }}
                </ThemeContext.Consumer>
            </ThemeProvider>
        );

        expect(themeContextValue.isDarkTheme).toBe(false);
    });

    test('toggles theme and updates localStorage', () => {
        window.localStorage.getItem.mockReturnValueOnce('light');

        let themeContextValue;

        render(
            <ThemeProvider>
                <ThemeContext.Consumer>
                    {value => {
                        themeContextValue = value;
                        return (
                            <button onClick={value.toggleTheme}>Toggle Theme</button>
                        );
                    }}
                </ThemeContext.Consumer>
            </ThemeProvider>
        );

        expect(themeContextValue.isDarkTheme).toBe(false);

        // Toggle the theme
        const toggleButton = screen.getByText('Toggle Theme');
        act(() => {
            toggleButton.click();
        });

        expect(themeContextValue.isDarkTheme).toBe(true);
        expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
});