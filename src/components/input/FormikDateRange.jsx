import React, { Component, createRef } from 'react'
import { Field } from 'formik'
import DateHandler from './DateHandler'

class FormikDateRange extends Component {
  constructor (props) {
    super(props)

    const { startProps, endProps } = props
    this.state = {
      startDate: {
        id: startProps.id,
        ref: createRef()
      },
      endDate: {
        id: endProps.id,
        ref: createRef()
      }
    }
  }

  componentWillUnmount () {
    this.cancelFocus()
  }

  //* event handlers *********************************************************
  handleStartSelect = () => {
    const {
      endDate: { ref: endDateRef }
    } = this.state
    // move focus to end date component
    if (endDateRef && endDateRef.current) endDateRef.current.input.focus()
  }

  handleEndSelect = () => {
    const { nextFocusRef, focusNext } = this.props
    const isFocusNext = focusNext && nextFocusRef

    //* react-datepicker sets preventFocus state to true for 50 ms on select
    //* to fix calendar not closing when using macbook pro
    //* this delay waits for that timeout to finish in order to refocus

    if (!isFocusNext) {
      this.focusSelfTimeout()
      return
    }
    if (isFocusNext) nextFocusRef.focus()
  }

  focusSelfTimeout = () => {
    const {
      endDate: { ref: endDateRef }
    } = this.state
    setTimeout(function () {
      if (endDateRef && endDateRef.current) {
        endDateRef.current.input.focus()
      }
    }, 5)
  }

  cancelFocus = () => {
    clearTimeout(this.focusSelfTimeout)
  }

  //* external methods*******************************************************
  focus () {
    const { startDate } = this.state
    if (startDate.ref.current) startDate.ref.current.input.focus()
  }

  render () {
    const {
      startProps,
      endProps,
      filterStartDate,
      filterEndDate,
      onFocus,
      forceClose,
      showInsetPlaceholder,
      showLabel,
      tw,
      values,
      ...passProps
    } = this.props

    const isTwAry = Array.isArray(tw)
    const twStartDate = isTwAry ? tw[0] : tw
    const twEndDate = isTwAry ? tw[1] : tw

    // get values for each controlled component
    const { startDate, endDate } = this.state

    const startDateVal = values ? values[startProps.id] : ''
    const endDateVal = values ? values[endProps.id] : ''

    function getMinDate () {
      const dt = new Date()
      if (startDateVal) {
        dt.setUTCDate(startDateVal.getUTCDate() + 1)
        return dt
      }
    }

    return (
      <>
        <Field name={startProps.id}>
          {({ form, field }) => {
            const { setFieldValue } = form
            const { value } = field
            const handleStartChange = (val) => {
              const dt = val
                ? new Date(val.getFullYear(), val.getMonth(), val.getDate())
                : val
              setFieldValue(startProps.id, dt)
              if (dt > endDateVal) {
                setFieldValue(endProps.id, '')
              }
            }
            return (
              <DateHandler
                {...passProps}
                tw={twStartDate}
                filterDate={filterStartDate}
                key="startDate"
                id={startProps.id}
                name={startProps.id}
                label="Arrive"
                showLabel={showLabel}
                showInsetPlaceholder={showInsetPlaceholder}
                placeholder={startProps.placeholder}
                icon={startProps.icon.url}
                iconOffset={startProps.icon.iconOffset}
                textOffset={startProps.textOffset}
                width={startProps.width}
                selected={value}
                startDate={value}
                endDate={endDateVal}
                selectsStart
                minDate={new Date()}
                onChange={handleStartChange}
                onSelect={this.handleStartSelect}
                onFocus={onFocus}
                inputRef={startDate.ref}
                allowSameDay
                forceClose={forceClose}
              />
            )
          }}
        </Field>
        {/* Picker for end of range */}
        <Field name={endProps.id}>
          {({ form, field }) => {
            const { setFieldValue } = form
            const { value } = field
            const handleEndChange = (val) => {
              const dt = val
                ? new Date(val.getFullYear(), val.getMonth(), val.getDate())
                : val
              setFieldValue(endProps.id, dt)
            }
            // Picker for start of range
            return (
              <DateHandler
                {...passProps}
                tw={twEndDate}
                allowSameDay={false}
                filterDate={filterEndDate}
                key="endDate"
                id={endProps.id}
                name={endProps.id}
                label="Depart"
                showLabel={showLabel}
                showInsetPlaceholder={showInsetPlaceholder}
                placeholder={endProps.placeholder}
                icon={endProps.icon.url}
                iconOffset={endProps.icon.iconOffset}
                textOffset={endProps.textOffset}
                width={endProps.width}
                selected={value}
                startDate={startDateVal}
                endDate={value}
                minDate={getMinDate()}
                highlightDates={[startDateVal || undefined]}
                selectsEnd
                openToDate={startDateVal}
                onSelect={this.handleEndSelect}
                onChange={handleEndChange}
                onBlur={this.cancelFocus}
                onFocus={onFocus}
                inputRef={endDate.ref}
                forceClose={forceClose}
              />
            )
          }}
        </Field>
      </>
    )
  }
}

export default FormikDateRange
