import * as Data from './data'

const dataResults = [
    {
        title: 'title 1',
        contentSnippet: 'snippet 1',
        sentimentResult: { score: 0.5, magnitude: 0.8 },
        date: '2019-10-20',
        link: 'https://www.google.com',
    },
    {
        title: 'title 2',
        contentSnippet: 'snippet 2',
        sentimentResult: { score: 0.3, magnitude: 0.7 },
        date: '2020-04-01',
        link: 'http://www.apple.com',
    },
    {
        title: 'title 3',
        contentSnippet: 'snippet 3',
        sentimentResult: { score: 0.5, magnitude: 0.1 },
        date: '2020-04-01',
        link: 'http://www.apple.com/iPhone',
    },
]
describe('For handling HTTP GET request', () => {
    beforeEach(() => {
        global.fetch = jest.fn()
    })
    it('handling fetch error', async () => {
        global.fetch.mockImplementationOnce(() => {
            return Promise.resolve({
                status: 500,
            })
        })
        expect.assertions(1)
        try {
            await Data.fetchData()
        } catch (e) {
            expect(e).toEqual(new Error('Unexpected status code: 500'))
        }
    })
    it('handling empty fetch result', async () => {
        global.fetch.mockImplementationOnce(() => {
            return Promise.resolve({
                json: async () => {
                    return { results: [] }
                },
                status: 200,
            })
        })
        expect.assertions(1)
        const result = await Data.fetchData()
        expect(result).toEqual([])
    })
    it('handling single fetch result', async () => {
        global.fetch.mockImplementationOnce(() => {
            return Promise.resolve({
                json: async () => {
                    return { results: [dataResults[0]] }
                },
                status: 200,
            })
        })
        expect.assertions(3)
        const results = await Data.fetchData()
        expect(results.length).toEqual(1)
        expect(results[0].sentiment.score).toEqual(0.5)
        expect(results[0].sentiment.magnitude).toEqual(0.8)
    })
    it('handling multiple fetch results', async () => {
        global.fetch.mockImplementationOnce(() => {
            return Promise.resolve({
                json: async () => {
                    return { results: dataResults }
                },
                status: 200,
            })
        })
        expect.assertions(5)
        const results = await Data.fetchData()
        expect(results.length).toEqual(2)
        const scores = [results[0].sentiment.score, results[1].sentiment.score]
        const magnitudes = [results[0].sentiment.magnitude, results[1].sentiment.magnitude]
        expect(scores[0]).toEqual(0.5)
        expect(scores[1]).toBeCloseTo(0.4, 2)
        expect(magnitudes[0]).toEqual(0.8)
        expect(magnitudes[1]).toBeCloseTo(0.4, 2)
    })
})
