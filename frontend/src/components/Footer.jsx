import React from 'react'

const Footer = ({activeTasksCount = 0,completedTaskCount = 0}) => {
  return (
    <>
    {completedTaskCount + activeTasksCount > 0 && (
      <div className="text-center">
        <p className='text-sm text-muted-foreground'>
          {
            completedTaskCount > 0 && (
              <>
              Tuyệt vời !  Bạn đã hoàn thành {completedTaskCount} việc

              {activeTasksCount >0 && `, còn ${activeTasksCount} nhiệm vụ nữa thôi. Cố lên nhaaa <3`}
              </>
            )
          }
          { completedTaskCount === 0  && activeTasksCount > 0 && (
            <>
            Hãy bắt tay vào làm {activeTasksCount}  nhiệm vụ  nào !
            </>
          )}
        </p>
      </div>
    )}

    </>


  )
}

export default Footer
