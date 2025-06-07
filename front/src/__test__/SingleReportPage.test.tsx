import { useParams } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { SingleReportPage } from 'pages/single-report-page';

import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}));

jest.mock('modules/single-report', () => ({
  SingleReport: jest.fn(() => <div data-test-id="SingleReport" />)
}));

describe('SingleReportPage routing', () => {
  it('renders SingleReport component when id is provided', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(<SingleReportPage />);
    screen.debug();
    expect(screen.getByTestId('SingleReport')).toBeInTheDocument();
  });
  it('renders error image when id is not provided', () => {
    (useParams as jest.Mock).mockReturnValue({ id: undefined });

    render(<SingleReportPage />);
    screen.debug();

    const errorImg = screen.getByAltText('empty');

    expect(errorImg).toBeInTheDocument();
  });
});
