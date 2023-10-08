import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RenderTitle from './RenderTitle';

describe('RenderTitle Component', () => {
    it('renders the text prop correctly', () => {
        const sampleText = 'Sample Title';

        const { getByText } = render(<RenderTitle text={sampleText} />);

        expect(getByText(sampleText)).toBeInTheDocument();
    });
});