import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import imagespiner from "../assets/img/1484.gif"

function TheSuspense() {
  return (
    <div className="w-full h-screen grid justify-items-center items-center text-lg font-medium text-teal-900 dark:text-gray-400 dark:bg-gray-900 bg-gradient-to-b from-teal-500 via-gray-200 to-gray-200">
      <FontAwesomeIcon className='animate-spin' icon={faSpinner} size='3x' />
      {/* <img src={imagespiner} /> */}
    </div>
  )
}

export default TheSuspense