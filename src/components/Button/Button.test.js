import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import Button from '../../components/Button/Button';

// Mock do tema para os testes
const mockTheme = {
    buttonBg: '#ff5350',
    buttonText: '#ffffff',
};

const renderWithTheme = (component) => {
    return render(
        <ThemeProvider theme={mockTheme}>
            {component}
        </ThemeProvider>
    );
};

describe('Button Component', () => {
    test('renders button with correct text', () => {
        renderWithTheme(<Button>Test Button</Button>);
        const buttonElement = screen.getByText('Test Button');
        expect(buttonElement).toBeInTheDocument();
    });

    test('calls onClick handler when clicked', () => {
        const mockOnClick = jest.fn();
        renderWithTheme(<Button onClick={mockOnClick}>Click Me</Button>);

        const buttonElement = screen.getByText('Click Me');
        fireEvent.click(buttonElement);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('is disabled when disabled prop is true', () => {
        renderWithTheme(<Button disabled>Disabled Button</Button>);

        const buttonElement = screen.getByText('Disabled Button');
        expect(buttonElement).toBeDisabled();
    });
});