
import React, { useEffect, useState } from 'react'
import TaskListPagination from '@/components/TaskListPagination'
import Header from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import Footer from '@/components/Footer'
import DateTimeFilters from '@/components/DateTimeFilters'
import AddTask from '@/components/AddTask'
import { toast } from "sonner";
import api from '@/lib/axios'
import { visibleTasklimit } from '@/lib/data'


const HomePage = () => {
  const [taskBuffer,setTaskBuffer] = useState([]);
  
  const [activeTaskCount,setActiveTaskCount] = useState(0);

  const [completeTaskCount,setCompleteTaskCount] = useState (0);

  const [filter,setFilter] = useState('all');

  const [dateQuery,setDateQuery] = useState('today');

  const [page,setPage] = useState(1);


  //use effect theo dõi state thay đổi 

  useEffect(()=>{
    fetchTasks();
  },[dateQuery])
  const fetchTasks = async () =>{
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      console.log(res.data.tasks)
      setActiveTaskCount(res.data.activeCount);
      
      setCompleteTaskCount(res.data.completeCount);

    } catch (error) {
      console.log("Lỗi xảy ra khi truy xuất tasks", error);
      toast.error("Lỗi khi truy xuất");
    }
  };

  useEffect(()=>{
    setPage(1);
  },[filter,dateQuery])

  const handleTaskChanged = () =>{
    fetchTasks();
  }

  const handleNext  = () => {
    if(page < totalPages ) {
      setPage ((prev)=> prev + 1);
    }
  }

  const handlePrev = () => {
    if(page > 1){
      setPage((prev)=> prev - 1);
    }
  }

  const handlePageChange = (newPage)=>{
    setPage(newPage);
  }


  //Biến
  const filteredTasks = taskBuffer.filter((task)=>{
    switch(filter){
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'complete';
        
      default:
        return true;
    }
  });

  const visibibleTasks = filteredTasks.slice(
    (page - 1) * visibleTasklimit,
    page * visibleTasklimit
  );

  if(visibibleTasks.length ===0){
    handlePrev();
  }

  const totalPages = Math.ceil(filteredTasks.length /  visibleTasklimit );


  return (


    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
    <div className='container pt-8 mx-auto relative z-10'>
      <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
        {/*  Đầu Trang */}
        <Header/>
        {/* Tạo nhiệm vụ  */}
        <AddTask handleNewTaskAdded={handleTaskChanged}/>
         {/* THống kê */}
         <StatsAndFilters 

         filter={filter}
         setFilter = {setFilter}

         activeTasksCount={activeTaskCount}
         completedTasksCount={completeTaskCount}/>

         {/* Danh sách nhiệm vụ */}

         <TaskList 
         filterTask={visibibleTasks} filter={filter}
         handleTaskChange={handleTaskChanged}
         />
         
         {/* Phân trang và lọc theo DATE */}

         <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
          <TaskListPagination 
          
          handleNext = {handleNext}
          handlePrev = {handlePrev}
          handlePageChange = {handlePageChange}
          page = {page}
          totalPages = {totalPages}
          />
          <DateTimeFilters 
           dateQuery = {dateQuery}
           setDateQuery={setDateQuery} />
         </div>

         {/* Chân trang */}

         <Footer     
          activeTasksCount={activeTaskCount}
          completedTasksCount={completeTaskCount}
        />

      </div> 
    </div>

      </div>



  )
}

export default HomePage
