import { render } from '@testing-library/react';
import dayjs from 'dayjs';
import DeadlineCountdown from './DeadlineCountdown';

describe('<DeadlineCountdown />', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2023-10-08T12:00:00Z').getTime());
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('renders no deadline set message', () => {
        const { getByText } = render(<DeadlineCountdown deadline={null} />);
        expect(getByText("No deadline set")).toBeInTheDocument();
    });

    test('renders deadline passed message', () => {
        const pastDeadline = dayjs().subtract(1, 'day').toISOString();
        const { getByText } = render(<DeadlineCountdown deadline={pastDeadline} />);
        expect(getByText(/Deadline passed:/)).toBeInTheDocument();
    });

    test('renders deadline within a day message', () => {
        const nearDeadline = dayjs().add(10, 'hours').toISOString();
        const { getByText } = render(<DeadlineCountdown deadline={nearDeadline} />);
        expect(getByText(/until deadline/)).toBeInTheDocument();
    });

    test('renders deadline more than a day away message', () => {
        const futureDeadline = dayjs().add(3, 'days').toISOString();
        const { getByText } = render(<DeadlineCountdown deadline={futureDeadline} />);
        expect(getByText(/until deadline/)).toBeInTheDocument();
    });
});
