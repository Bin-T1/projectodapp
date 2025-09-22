import React from 'react'
import TaskEmtyStats from './TaskEmtyStats';
import TaskCard from './TaskCard';

const TaskList = ({filterTask,filter,handleTaskChange}) => {

  if(!filterTask || filterTask.length === 0){
    return <TaskEmtyStats filter = {filter}/>
  }
  return (
    <div className='space-y-3'>
      {filterTask.map((task,index)=>(
        <TaskCard
        key={task._id ?? index}
        task = {task}
        handleTaskChange={handleTaskChange}
        
        />
      ))}
    </div>
  )
}

export default TaskList
