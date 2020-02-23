const url = "https://us-central1-df-side-projects.cloudfunctions.net/news-rss-http"

interface DataInterface {
  title: string,
  link: string,
  date: string,
  contentSnippet: string
  sentimentResult: {score: number, magnitude: number}
}

interface DataResponse {
  results: DataInterface[]
}

interface AggregatedData {
  data: DataInterface[]
  sentiment: {score: number, magnitude: number}
}

export interface Result extends AggregatedData {
  date: Date
}

export async function fetchData(): Promise<Result[]> {
    try {
      const response = await fetch(url)
      if (response.status !== 200) {
        const error = new Error(`Unexpected status code: ${response.status}`)
        throw error
      }
      const { results }= await response.json() as DataResponse
      const parsedResult = parseData(results)
      const dataResult = []
      for (let [date, value] of parsedResult.entries()) {
        const aggregatedData = aggregateData(value)
        const parsedDate = new Date(date)
        dataResult.push({...aggregatedData, date: parsedDate})
      }
      dataResult.sort((first, second) => first.date.getTime() - second.date.getTime())
      return dataResult
    } catch(e) {
      console.error(`error happened: ${e}`)
      throw e
    }
}

function parseData(data: DataInterface[]) {
    const processedResult = data.reduce((prev, current) => {
        const dateString = new Date(current.date).toDateString()
        const list = prev.get(dateString) || []
        prev.set(dateString, [...list, current])
        return prev
    }, new Map<string, DataInterface[]>())
    return processedResult
}

function aggregateData(data: DataInterface[]): AggregatedData {
    const totalSentiment = data.reduce((prev, current) => {
        prev.score += current.sentimentResult.score
        prev.magnitude += current.sentimentResult.magnitude
        return prev
    }, {score: 0, magnitude: 0})
    return {data, sentiment: {score: totalSentiment.score / data.length, magnitude: totalSentiment.magnitude / data.length }}
}
