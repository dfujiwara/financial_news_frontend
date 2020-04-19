import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
)

interface EventInterface {
    target: { value: string }
}

interface DatePickerProps {
    updateDate(date: Date): void
}

export function DatePicker({ updateDate }: DatePickerProps) {
    const [errorFlag, setErrorFlag] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const handler = (event: EventInterface) => {
        const dateString = event.target.value
        const potentialDate = new Date(dateString)
        if (isNaN(potentialDate.getTime())) {
            setErrorFlag(true)
            return
        }
        setErrorFlag(false)
        setSelectedDate(potentialDate)
        updateDate(potentialDate)
    }

    const classes = useStyles()
    return (
        <form className={classes.container} noValidate>
            <TextField
                id="date"
                label="Start Date"
                type="date"
                defaultValue={selectedDate.toLocaleDateString()}
                className={classes.textField}
                onChange={handler}
                error={errorFlag}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    )
}
