import React, { use, useState } from 'react'
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { toast } from 'sonner';
import api from '@/lib/axios';
const TaskCard = ({task,index,handleTaskChange}) => {
    const [isEditting,setIsEditting] = useState(false);

    const [updateTaskTitle,setUpdateTaskTitle] = useState(task.title || "")

    const deleteTask = async (taskId) =>{
        try {
          await api.delete(`/tasks/${taskId}`);
          toast.success('Nhiệm vụ đã được xóa.')
          handleTaskChange();
        } catch (error) {
          toast.error('Lỗi khi xóa nhiệm vụ');
          console.log("Lỗi xảy ra khi xóa task",error)
        }
    }

    const updateTask = async () =>{
        try {
            setIsEditting(false);
            await api.put(`/tasks/${task._id}`,{
            title : updateTaskTitle
          });
          toast.success(`Nhiệm vụ đã được cập nhật thành ${updateTaskTitle}`);
          handleTaskChange();
        } catch (error) {
            console.error("Lỗi khi xảy ra update task",error);
            toast.error("Lỗi xảy ra khi xóa nhiệm vụ mới");   
        }
    }

    const toggleTaskCompleteButton = async () => {
        try {
            if(task.status === "active"){
                await api.put(`/tasks/${task._id}`,{
                    status:"complete",
                    completedAt: new Date().toISOString(),
                })
            toast.success(`${task.title} đã hoàn thành `)
            }else{
                await api.put(`/tasks/${task._id}`,{
                    status : "active",
                    completedAt: null
                })
            toast.success(`${task.title} đã đổi sang chưa hoàn thành`)
            }
            handleTaskChange();
        } catch (error) {
            console.error("Lỗi khi xảy ra update task",error);
            toast.error("Lỗi xảy ra khi xóa nhiệm vụ mới");   
        }
    }


    


      const handleKeyPress = (event) =>{
    if(event.key === 'Enter'){
      updateTask();
    }
    // console.log(event);
  }
    return (
     <Card className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === 'complete' && 'opacity-75'
     )}
     style={{animationDelay : `${index * 50}ms`}}
     >
        <div className='flex items-center gap-4'>
            {/* nút tròn */}
            <Button variant='ghost'
            size='icon'
            className={cn("flex-shrink-0 size-8 rounded-full transition-all duration-200",
                task.status === "complete"
             ? "text-success    hover:text-success/80"
             : "text-muted-foreground hover:text-primary"
            )}
            onClick ={toggleTaskCompleteButton}
            > {task.status === 'complete' ? (<CheckCircle2 className='size-5'/>): (<Circle className='size-5'/>)}
            </Button>
            {/* Hiển thị chỉnh sửa */}

            <div className='flex-1 min-w-0'>
                {isEditting ?
                (<Input placeholder='Cần phải làm gì ?' className="flex-1 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                 type="text"
                 value={updateTaskTitle}
                 onChange = {(e)=>setUpdateTaskTitle(e.target.value)}
                 onKeyPress ={handleKeyPress}
                 onBlur = {()=>{
                setIsEditting(false);
                setUpdateTaskTitle(task.title) || '';
                 }}
                 />): (<p className={cn("text-base trasition-all duration-200",
                 task.status === 'complete' ? "line-through text-muted-foreground":"text-foreground")}>
                  {task.title}
                 </p>)}

                          {/* Ngày tạo và hoàn thành */}

            <div className='flex items-center gap-2 mt-1'>
                <Calendar className='size-3 text-muted-foreground'/>
                <span className='text-xs text-muted-foreground'>
                    {new Date(task.createdAt).toLocaleString()}
                </span>
                {task.completedAt && (
                    <>
                        <span className='text-xs text-muted-foreground'>-</span>
                        <Calendar className='size-3 text-muted-foreground'/>
                        <span className='text-xs text-muted-foreground'>
                            {new Date(task.completedAt).toLocaleString()}
                        </span>
                        </>
                )}
            </div>

            </div>
   
            {/* nút chỉnh và xóa */}
            <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
                {/* Nút edit */}

                <Button 
                 variant = "ghost"
                 size='icon'
                 className="flex-shrink-0 transition-color size-8 text-muted-foreground hover:text-info"
                 onClick = {() =>{
                    setIsEditting(true);
                    setUpdateTaskTitle(task.title || "")
                 }}
                 >

                    <SquarePen className="size-4"/>
                 </Button>

                 {/* nút xóa */}

                     <Button 
           
            variant="ghost"
  size="icon"
  className={cn(
    "flex-shrink-0 transition-color size-8",
    task.status === "complete"
      ? "text-muted-foreground opacity-50 cursor-not-allowed"
      : "text-muted-foreground hover:text-destructive"
  )}
  onClick={() => {
    if (task.status !== "complete") {
      deleteTask(task._id);
    } else {
      toast.warning("Không thể xóa nhiệm vụ đã hoàn thành");
    }
  }}

                >
                    <Trash2/>
                 </Button>
            </div>
        </div>

     </Card>
     
  )
}

export default TaskCard
