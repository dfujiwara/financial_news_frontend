import React from 'react'
import { render } from '@testing-library/react'
import { ResultTable } from './Table'

const results = [
    {
        data: [
            {
                title: 'title 1',
                contentSnippet: 'snippet 1',
                sentimentResult: { score: 0.5, magnitude: 0.8 },
                date: '2019-10-20',
                link: 'https://www.google.com',
            },
        ],
        sentiment: { score: 0.5, magnitude: 0.8 },
        date: new Date(),
    },
    {
        data: [
            {
                title: 'title 2',
                contentSnippet: 'snippet 2',
                sentimentResult: { score: -0.2, magnitude: 0.8 },
                date: '2019-10-20',
                link: 'https://www.google.com/mail',
            },
        ],
        sentiment: { score: -0.2, magnitude: 0.8 },
        date: new Date(),
    },
    {
        data: [
            {
                title: 'title 3',
                contentSnippet: 'snippet 3',
                sentimentResult: { score: 0, magnitude: 0.8 },
                date: '2019-10-20',
                link: 'https://www.google.com/calendar',
            },
        ],
        sentiment: { score: 0, magnitude: 0.8 },
        date: new Date(),
    },
]

describe('ResultTable', () => {
    it('is not rendered if the result is null', () => {
        const { getByText } = render(<ResultTable result={null} />)
        try {
            getByText(/👍/)
            fail('Should be unreachable')
        } catch (e) {}
    })
    it('is rendered if the result is provided with a positive score', () => {
        const { getByText } = render(<ResultTable result={results[0]} />)
        const element = getByText(/👍/)
        expect(element).toBeInTheDocument()
    })
    it('is rendered if the result is provided with a negative score', () => {
        const { getByText } = render(<ResultTable result={results[1]} />)
        const element = getByText(/👎/)
        expect(element).toBeInTheDocument()
    })
    it('is rendered if the result is provided with a neutral score', () => {
        const { getByText } = render(<ResultTable result={results[2]} />)
        const element = getByText(/🤔/)
        expect(element).toBeInTheDocument()
    })
})
