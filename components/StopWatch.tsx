"use client";

import React, { useState, useEffect, useRef, MouseEvent } from "react";
import AllTasksClient from "./AllTasksClient";

interface TimerProps {
  data: [{ [key: string]: any }];
}

export default function StopWatch({ data }: TimerProps) {
  const [value, setValue] = useState(50);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [dataState, setDataState] = useState(data);
  // let data = receivedData;

  const handleStartStop = async () => {
    setIsActive((prevIsActive) => !prevIsActive);
    if (seconds !== 0 && selectedTask) {
      const updateData = { timeWorked: seconds, timerStartDate: new Date() };
      const res = await fetch("/api/task", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: selectedTask?._id,
          data: updateData,
        }),
      });

      const updatedRes = await fetch("/api/task");
      const updatedData = await updatedRes.json();
      setDataState(updatedData);

      console.log(res, updatedData, dataState);
    }
  };

  // const handleStartStop = async () => {
  //   setIsActive((prevIsActive) => !prevIsActive);
  //   if (seconds !== 0 && selectedTask) {
  //     const updateData = { timeWorked: seconds };
  //     const res = await fetch("/api/task", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ _id: selectedTask?._id, data: updateData }),
  //     });

  //     const updatedRes = await fetch("/api/task");
  //     const updatedData = await updatedRes.json();
  //     console.log(res, updatedData, dataState);
  //     return updatedData;
  //   }
  // };

  // useEffect(() => {
  // },[isActive])

  console.log(seconds, dataState);
  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  // const endTime = "14:50";
  // useEffect(() => {
  //   if (endTime) {
  //     const [hours, minutes] = endTime.split(":").map(Number);
  //     const currentDate = new Date(Date.now());
  //     currentDate.setHours(hours);
  //     currentDate.setMinutes(minutes);
  //     console.log(currentDate.getTime() - Date.now());
  //     setSeconds((currentDate.getTime() - Date.now()) / 1000);
  //   }
  // }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  interface Subtask {
    id: number;
    task: string;
  }
  const taskNameRef = useRef<HTMLInputElement>(null);
  const subTasksRef = useRef<HTMLInputElement>(null);
  // const taskType = useRef<HTMLSelectElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);
  const repeatRef = useRef<HTMLSelectElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const timeAllocatedRef = useRef<HTMLInputElement>(null);
  const [taskType, setTaskType] = useState(false);
  const [subTaskToggle, setSubTaskToggle] = useState(false);
  const [subTasks, setSubTasks] = useState<Subtask[]>([]);
  const [selectedTask, setSelectedTask] = useState<{ [key: string]: any }>();

  const newTaskHandler = (event: React.FormEvent<HTMLFormElement>) => {
    // const newTaskHandler = (FormData: FormData) => {
    // console.log(FormData);

    event.preventDefault();
    // console.log(subTasksRef.current?.value);
    fetch("/api/task/addNewTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskName: taskNameRef.current?.value,
        subTasks: subTasks,
        taskType,
        priority: priorityRef.current?.value,
        dueDate: dueDateRef.current?.value,
        repeat: repeatRef.current?.value,
        startTime: startTimeRef.current?.value,
        endTime: endTimeRef.current?.value,
        timeAllocated: timeAllocatedRef.current?.value,
      }),
    });
  };

  const taskTypeHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.target instanceof HTMLElement) {
      if (event.target.classList.contains("flexible-hours")) setTaskType(true);
      else setTaskType(false);
    }
  };

  const handleSubTask = () => {
    const newId = subTasks.length + 1;
    const newSubtaskObj: Subtask = {
      id: newId,
      task: subTasksRef.current?.value!,
    };
    setSubTasks((prev) => [...prev, newSubtaskObj]);
  };

  const handleTaskClick = (id: string) => {
    const selectedItem = dataState.find((task) => task._id === id);
    setSelectedTask(selectedItem);
    setSeconds(selectedItem?.timeWorked);
  };
  console.log(selectedTask);

  return (
    <>
      <div className="relative grid justify-center content-center h-64">
        <div
          className={`pie absolute shadow-[0_0px_18px_0px_#d5b7fc] ${
            isActive ? "animate-pulse" : ""
          }`}
          style={{
            backgroundImage: `conic-gradient(#d5b7fc ${value / 4}%, #a267ed ${
              value / 2
            }%, #b983fb ${
              value / 4 + value / 2
            }%, #d5b7fc ${value}%, #2d3035 0)`,
          }}
        ></div>
        <div
          className="pie2 absolute grid items-center justify-center bg-[#1d1f25] cursor-pointer"
          onClick={handleStartStop}
        >
          {formatTime(seconds)}
        </div>
      </div>

      {/* All Tasks */}
      <AllTasksClient data={dataState} handleClick={handleTaskClick} />

      {/* Form for adding new task */}
      <section>
        <form onSubmit={newTaskHandler} className="flex flex-col w-1/4 gap-2">
          <div className="flex">
            <input type="text" placeholder="Task Name" ref={taskNameRef} />
            <button
              type="button"
              onClick={() => setSubTaskToggle((prev) => !prev)}
            >
              +
            </button>
            {subTasks.map((item) => (
              <input type="text" defaultValue={item.task} key={item.id} />
            ))}
            {subTaskToggle ? (
              <>
                <input type="text" ref={subTasksRef} />
                <button type="button" onClick={handleSubTask}>
                  Add subtask
                </button>
              </>
            ) : (
              ""
            )}
          </div>
          <div onClick={taskTypeHandler}>
            <button type="button" className="flexible-hours">
              Flexible Hours
            </button>
            <button type="button" className="strict-hours">
              Strict Hours
            </button>
          </div>
          <select name="Priority" id="" ref={priorityRef}>
            <option value="p1">1</option>
            <option value="p1">1</option>
            <option value="p1">1</option>
            <option value="p1">1</option>
          </select>
          <input type="date" ref={dueDateRef} />
          <select name="Repeat" id="" ref={repeatRef}>
            <option value="p1">1</option>
            <option value="p1">1</option>
            <option value="p1">1</option>
            <option value="p1">1</option>
          </select>
          {taskType === false ? (
            <>
              <input type="time" ref={startTimeRef} />
              <input type="time" ref={endTimeRef} />
            </>
          ) : (
            ""
          )}
          {taskType === true ? (
            <input type="time" min="00:00" max="12:00" ref={timeAllocatedRef} />
          ) : (
            ""
          )}
          <button type="submit">ADD</button>
        </form>
      </section>
    </>
  );
}
