import React from 'react'
import { Button } from '../../button'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

type Props = {  
    previous : ()=> void,
    next : ()=> void,
    currentPage : number,
    totalPages : number
}

const PageSelector = ({previous, next , currentPage, totalPages} : Props) => {
  return (
    <div className=' flex gap-2 items-center' >

        <Button  variant="outline" size="icon" aria-label="Go Back" disabled={currentPage === 0} onClick={previous}>
          <ArrowLeftIcon className=' h-4 w-4' />
        </Button>
        <span className=' text-white'>{currentPage + 1} of {totalPages}</span>
        <Button variant="outline" size="icon" aria-label="Go Forward" disabled={currentPage === totalPages - 1} onClick={next}>
          <ArrowRightIcon className=' h-4 w-4' />
        </Button>

    </div>
  )
}

export default PageSelector