import React, { useEffect } from 'react'

const Alert = ({ msg, status, alertShow, list }) => {
  useEffect(() => {
    const Timeout = setTimeout(() => {
      alertShow()
    }, 3000)
    return () => clearTimeout(Timeout)
  }, [list])

  return <p className={`alert alert-${status}`}>{msg}</p>
}

export default Alert
