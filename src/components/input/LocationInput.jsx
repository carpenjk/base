import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useField, useFormikContext } from 'formik'

import { useAutoComplete } from '@carpenjk/hooks'
import InputBase from './InputBase'
import { getLocationDisplay } from '../../utils/location'

const LocationInput = forwardRef(
  ({ name, autoCompleteOptions, ...props }, ref) => {
    const { setFieldValue } = useFormikContext()
    const [formikFields, meta, helpers] = useField(name)
    const [acValues, setAcValues] = useState([])
    const inputRef = useRef()

    async function fetchACValues (q) {
      try {
        const res = await fetch(
          `/api/location/autocomplete?q=${q}&countrycodes=us&tag=place:city,place:town,place:village`
        )
        const response = await res.json()

        const { data } = response
        // if error, likely no match
        if (data.error) {
          setAcValues([])
        }
        if (data && data.map) {
          const suggestions = data.map((sugg) => getLocationDisplay(sugg))
          const deduped = [...new Set(suggestions)]
          setAcValues(deduped)
        }
      } catch (e) {
        // do something
        console.log(e)
      }
    }

    function handleInput (e) {
      const q = e.target.value
      if (q === '') {
        setAcValues([])
        return
      }
      fetchACValues(q)
    }

    function onSelect (val) {
      setFieldValue(name, val)
      if (inputRef && inputRef.current) {
        inputRef.current.focus()
      }
    }

    useEffect(() => {
      if (inputRef && inputRef.current) {
        ref(inputRef.current)
      }
    }, [inputRef, ref])

    const { forceClose, autoCompleteWidth } = autoCompleteOptions
    const { fields: acFields, autoComplete } = useAutoComplete({
      values: acValues,
      onSelect,
      onInput: [handleInput, 750]
    })

    const { acControl } = autoComplete

    useEffect(() => {
      if (forceClose) {
        acControl.close()
      }
    }, [forceClose, acControl])

    return (
      <div>
        <InputBase
          name={name}
          {...formikFields}
          {...props}
          {...acFields}
          autoCompleteWidth={autoCompleteWidth}
          autoComplete={autoComplete}
          ref={inputRef}
        />
      </div>
    )
  }
)
LocationInput.displayName = 'LocationInput'

export default LocationInput
