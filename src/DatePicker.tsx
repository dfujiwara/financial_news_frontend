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
        label: {
            color: 'white',
        },
        input: {
            color: 'white',
        },
    }),
)

interface EventInterface {
    target: { value: string }
}

interface DatePickerProps {
    selectedDate: Date
    updateDate(date: Date): void
}

export function DatePicker({ selectedDate, updateDate }: DatePickerProps): JSX.Element {
    const [errorFlag, setErrorFlag] = useState(false)

    const handler = (event: EventInterface): void => {
        const dateString = event.target.value
        const potentialDate = new Date(dateString)
        if (isNaN(potentialDate.getTime())) {
            setErrorFlag(true)
            return
        }
        setErrorFlag(false)
        updateDate(potentialDate)
    }

    const classes = useStyles()
    return (
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
                className: classes.label,
            }}
            InputProps={{ className: classes.input }}
        />
    )
}
