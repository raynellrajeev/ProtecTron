import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Quiz() {
  const [toggle, setToggle] = useState({
    Quiz1: true,
    Quiz2: true,
    Quiz3: true,
    Quiz4: true
  })
    const scores = {
        "Quiz1": 8,
        "Quiz2":9,
        "Quiz3":5,
        "Quiz4":0,
    }

  const handleToggle = (type) => () => {
    setToggle((prev) => ({
      ...prev,
      [type]: !prev[type]
    }))
  }
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col min-h-screen py-8">
        <div className="bg-[rgba(48,48,48,0.3)] w-[70%] md:w-[50%] lg:w-[40%] mx-auto mt-24 border-2 border-[rgba(255,255,255,0.2)] backdrop-blur-[80px] text-white rounded-[10px] p-4 md:p-8 lg:p-[30px_40px] justify-center items-center">
          <div className="flex flex-row justify-center items-center pb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold justify-center items-center">
              Quiz
            </h1>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex justify-between items-center">
              <p>Quiz-1</p>
              <div className="flex gap-8">
                <p>
                  High score: <span className="text-green-600">{scores.Quiz1}</span>
                </p>
                <button
                  onClick={handleToggle('Quiz1')}
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    toggle.Quiz1 ? 'bg-[#2196F3] text-white' : 'bg-white/10 text-white/50'
                  }`}
                >
                  {toggle.Quiz1 ? 'Go' : 'In Progress...'}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p>Quiz-2</p>
              <div className="flex gap-8">
                <p>
                  High score: <span className="text-green-600">{scores.Quiz2}</span>
                </p>
                <button
                  onClick={handleToggle('Quiz2')}
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    toggle.Quiz2 ? 'bg-[#2196F3] text-white' : 'bg-white/10 text-white/50'
                  }`}
                >
                  {toggle.Quiz2 ? 'Go' : 'In Progress...'}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p>Quiz-3</p>
              <div className="flex gap-8">
                <p>
                  High score: <span className="text-green-600">{scores.Quiz3}</span>
                </p>
                <button
                  onClick={handleToggle('Quiz3')}
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    toggle.Quiz3 ? 'bg-[#2196F3] text-white' : 'bg-white/10 text-white/50'
                  }`}
                >
                  {toggle.Quiz3 ? 'Go' : 'In Progress...'}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p>Quiz-4</p>
              <div className="flex gap-8">
                <p>
                  High score: <span className="text-green-600">{scores.Quiz4}</span>
                </p>
                <button
                  onClick={handleToggle('Quiz4')}
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    toggle.Quiz4 ? 'bg-[#2196F3] text-white' : 'bg-white/10 text-white/50'
                  }`}
                >
                  {toggle.Quiz4 ? 'Go' : 'In Progress...'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
