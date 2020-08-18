import React, { useCallback, useEffect, useRef } from 'react'
import Textarea from 'react-expanding-textarea'

const MyTextarea = () => {
  const textareaRef = useRef(null)

  const handleChange = useCallback(e => {

  }, [])

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  return (
    <>
      <Textarea
        className="textarea"
        id="my-textarea"
        maxLength="3000"
        name="pet[notes]"
        onChange={handleChange}
        placeholder="Только начни печатать..."
        ref={textareaRef}
      />
    </>
  )
}

export default MyTextarea