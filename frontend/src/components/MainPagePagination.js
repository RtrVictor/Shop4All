import React from 'react'
import { Button } from 'react-bootstrap'

const MainPagePagination = ({
  handleNextPage,
  handlePrevPage,
  currentPage,
  totalPages,
}) => {
  return (
    <div>
      <div className='pagination-controls'>
        <Button
          style={{ borderRadius: '50%' }}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <i className='fa-solid fa-circle-chevron-left'></i>
        </Button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <Button
          style={{ borderRadius: '50%' }}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <i className='fa-solid fa-circle-chevron-right'></i>
        </Button>
      </div>
    </div>
  )
}

export default MainPagePagination
