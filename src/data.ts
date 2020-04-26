interface DataInterface {
    title: string
    link: string
    date: string
    contentSnippet: string
    sentimentResult: { score: number; magnitude: number }
}

interface DataResponse {
    results: DataInterface[]
}

interface AggregatedData {
    data: DataInterface[]
    sentiment: { score: number; magnitude: number }
}

export interface Result extends AggregatedData {
    date: Date
}

function parseData(data: DataInterface[]): Map<string, DataInterface[]> {
    const processedResult = data.reduce((prev, current) => {
        const dateString = new Date(current.date).toDateString()
        const list = prev.get(dateString) || []
        prev.set(dateString, [...list, current])
        return prev
    }, new Map<string, DataInterface[]>())
    return processedResult
}

function aggregateData(data: DataInterface[]): AggregatedData {
    const totalSentiment = data.reduce(
        (prev, current) => {
            prev.score += current.sentimentResult.score
            prev.magnitude += current.sentimentResult.magnitude
            return prev
        },
        { score: 0, magnitude: 0 },
    )
    return {
        data,
        sentiment: { score: totalSentiment.score / data.length, magnitude: totalSentiment.magnitude / data.length },
    }
}

function constructURL(fromDate: Date): URL {
    const url = 'https://us-central1-df-side-projects.cloudfunctions.net/news-rss-http'
    const datedURL = new URL(url)
    // Normalize to the date
    const dateToday = new Date(fromDate.toLocaleDateString())
    datedURL.searchParams.append('fromDateString', dateToday.toISOString())
    return datedURL
}

export async function fetchData(fromDate: Date = new Date()): Promise<Result[]> {
    try {
        const datedURL = constructURL(fromDate)
        const response = await fetch(datedURL.toString())
        if (response.status !== 200) {
            const error = new Error(`Unexpected status code: ${response.status}`)
            throw error
        }
        const { results } = (await response.json()) as DataResponse
        const parsedResult = parseData(results)
        const dataResult = []
        for (const [date, value] of parsedResult.entries()) {
            const aggregatedData = aggregateData(value)
            const parsedDate = new Date(date)
            dataResult.push({ ...aggregatedData, date: parsedDate })
        }
        dataResult.sort((first, second) => first.date.getTime() - second.date.getTime())
        return dataResult
    } catch (e) {
        console.error(`error happened: ${e}`)
        throw e
    }
}
