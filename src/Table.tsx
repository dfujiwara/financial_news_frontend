import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Result } from './data'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

export function ResultTable(result: Result) {
    //const classes = useStyles()

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Summary</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.data.map(row => {
                        const currentDate = new Date(row.date)
                        return (
                        <TableRow key={row.link}>
                            <TableCell component="th" scope="row">
                                <a href={row.link}>{row.title}</a>
                            </TableCell>
                            <TableCell align="left">{currentDate.toLocaleString()}</TableCell>
                            <TableCell align="left">{row.contentSnippet}</TableCell>
                        </TableRow>
                        )
                    }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
