import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { styled } from '@mui/material/styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'

export default function Learn() {
  const quizItems = [
    { id: 'Course 1', score: 0 },
    { id: 'Course 2', score: 0 },
    { id: 'Course 3', score: 0 },
    { id: 'Course 4', score: 0 }
  ]
  const maxScorePerCourse = 10
  const totalScore = quizItems.reduce((sum, item) => sum + item.score, 0)
  const maxPossibleScore = quizItems.length * maxScorePerCourse

  const percentageCompleted = (totalScore / maxPossibleScore) * 100

  function getFeedback(percentage) {
    let message = ''

    if (percentage >= 0 && percentage <= 10) {
      message = 'Getting Started! Keep going, every step counts!'
    } else if (percentage <= 25) {
      message = "Great Start! You're building momentum!"
    } else if (percentage <= 50) {
      message = 'Halfway There! Stay focused and keep learning!'
    } else if (percentage <= 75) {
      message = "Impressive Progress! You're mastering this!"
    } else if (percentage <= 99) {
      message = 'Almost There! Just a little more to go!'
    } else if (percentage === 100) {
      message = "Congratulations! You've completed this course!"
    } else {
      message = 'Invalid percentage value!'
    }

    return <p className="text-center text-lg font-semibold">{message}</p>
  }

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 8,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800]
      })
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
      ...theme.applyStyles('dark', {
        backgroundColor: '#308fe8'
      })
    }
  }))

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col min-h-screen py-8">
        <div className="bg-[rgba(48,48,48,0.3)] w-[70%] md:w-[50%] lg:w-[40%] mx-auto mt-24 border-2 border-[rgba(255,255,255,0.2)] backdrop-blur-[80px] text-white rounded-[10px] p-4 md:p-8 lg:p-[30px_40px] justify-center items-center">
          <div className="flex flex-col justify-start items-start pb-5">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold justify-start items-start">
              Your Courses
            </h1>
            <p className="text-md pt-4 items-start justify-start">
              Progress: {percentageCompleted}%
            </p>
            <div className="w-full pt-2">
              <BorderLinearProgress variant="determinate" value={percentageCompleted} />
            </div>
          </div>

          <div className="flex justify-center pb-4 items-center">{getFeedback(percentageCompleted)}</div>
          <hr className=" bborder-2 border-[rgba(255,255,255,0.2)] rounded-full" />
          <div className="flex p-4 flex-col justify-between gap-12">
            {quizItems.map(({ id, score }) => (
              <div key={id} className="flex justify-between items-center">
                <p>{id}</p>
                <div className="flex gap-8">
                  <p>
                    Completed: <span className="text-green-600">{score}/10</span>
                  </p>
                  <button
                    className={
                      'text-sm px-3 py-1 rounded-full transition-colors bg-[#2196F3] text-white'
                    }
                  >
                    <p>Go</p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
