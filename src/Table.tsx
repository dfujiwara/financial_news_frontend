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

const evaluateSentiment = (sentimentScore: number) => {
    if (sentimentScore > 0) {
        return '👍'
    }
    if (sentimentScore < 0) {
        return '👎'
    }
    return '🤔'
}

export function ResultTable(result: Result | null) {
    const classes = useStyles()

    if (!result) {
        return null
    }
    const createTableCell = (cellLabel: string) => {
        return (
            <TableCell className={classes.text} align="left">
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
                            return createTableCell(label)
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.data.map(row => {
                        const currentDate = new Date(row.date)
                        return (
                            <TableRow key={row.link}>
                                <TableCell component="th" scope="row" className={classes.text}>
                                    <Link href={row.link}>{row.title}</Link>
                                </TableCell>
                                {createTableCell(currentDate.toLocaleString())}
                                {createTableCell(row.contentSnippet)}
                                <Tooltip title={row.sentimentResult.score.toFixed(3)} placement="left">
                                    {createTableCell(evaluateSentiment(row.sentimentResult.score))}
                                </Tooltip>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
