import React, { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import api from '@/lib/axios'
const AddTask = ({handleNewTaskAdded}) => {
  const [newTaskTitle,setNewTaskTitle] = useState("");
  const addTask = async () =>{
    if(newTaskTitle.trim() //hàm trim dùng loại bỏ khoảng trắng đầu và cuối chuỗi phòng trường hợp người dùng chỉ gõ khoảng trắng 
){
     try {
        await api.post("http://localhost:5001/api/tasks",{title:newTaskTitle});
        toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm vào`);

        handleNewTaskAdded();
     } catch (error) {
      console.error("Lỗi xảy ra khi thêm nhiệm vụ",error);
      toast.error('Lỗi xảy ra khi thêm nhiệm vụ');
     }
     setNewTaskTitle("")
    }else{
      toast.error('Bạn cần nhập nội dung nhiệm vụ');
    }

  }
  const handleKeyPress = (event) =>{
    if(event.key === 'Enter'){
      addTask();
    }
    // console.log(event);
  }
  return (
   <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
    <div className='flex flex-col gap-3 sm:flex-row'>
      
      <Input
      type="text"
      placeholder="Cần phải làm gì"
      className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:boder-primary/50 focus:ring-primary-20"
      value={newTaskTitle}
      onChange = { (even) => setNewTaskTitle(even.target.value) }
      onKeyPress={handleKeyPress}
      />
      <Button variant="gradient" size="xl" className="px-6" onClick={addTask} 
      disabled={!newTaskTitle.trim()}>
        <Plus className="size-5"/>
        Thêm
      </Button>
    </div>
   </Card>
  )
}

export default AddTask
