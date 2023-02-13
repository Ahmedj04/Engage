import React from 'react';
import { render } from '@testing-library/react';
import Button from '../components/Button';

describe('Button component', () => {
  it('renders with a label', () => {
    const { getByText } = render(<Button Primary={{ label: 'Click me' }} />);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('renders with an icon and a label', () => {
    const { getByText } = render(
      <Button Primary={{ icon: <i className="fa fa-check" />, label: 'Click me' }} />
    );
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('does not render if label is not provided', () => {
    const { queryByText } = render(<Button />);
    expect(queryByText(/Click me/)).toBeNull();
  });

  it('calls onClick handler when clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button Primary={{ label: 'Click me' }} onClick={onClick} />);
    getByText('Click me').click();
    expect(onClick).toHaveBeenCalled();
  });
});