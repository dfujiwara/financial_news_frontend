import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import Link from '@material-ui/core/Link'
import { Result } from './data'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    text: {
        color: 'white',
    },
    link: {
        color: 'white',
    },
})

const evaluateSentiment = (sentimentScore: number): string => {
    if (sentimentScore > 0) {
        return '👍'
    }
    if (sentimentScore < 0) {
        return '👎'
    }
    return '🤔'
}

interface ResultTableProps {
    result: Result | null
}

export function ResultTable({ result }: ResultTableProps): JSX.Element | null {
    const classes = useStyles()

    if (!result) {
        return null
    }
    const createTableCell = (cellLabel: string, key: string): JSX.Element => {
        return (
            <TableCell className={classes.text} align="left" key={key}>
                {cellLabel}
            </TableCell>
        )
    }
    return (
        <TableContainer>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {['Title', 'Date', 'Summary', 'Sentiment'].map(label => {
                            return createTableCell(label, label)
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.data.map(row => {
                        const currentDate = new Date(row.date)
                        return (
                            <TableRow key={row.link}>
                                <TableCell key={row.link + 'link'} component="th" scope="row" className={classes.text}>
                                    <Link href={row.link}>{row.title}</Link>
                                </TableCell>
                                {createTableCell(currentDate.toLocaleString(), `${row.link}-date`)}
                                {createTableCell(row.contentSnippet, `${row.link}-snippet`)}
                                <Tooltip title={row.sentimentResult.score.toFixed(3)} placement="left">
                                    {createTableCell(
                                        evaluateSentiment(row.sentimentResult.score),
                                        `${row.link}-sentiment`,
                                    )}
                                </Tooltip>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
