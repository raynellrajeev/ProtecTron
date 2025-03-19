import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Quiz() {
  const quizItems = [
    { id: 'Quiz1', score: 8 },
    { id: 'Quiz2', score: 9 },
    { id: 'Quiz3', score: 5 },
    { id: 'Quiz4', score: 0 }
  ]

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
            {quizItems.map(({ id, score }) => (
              <div key={id} className="flex justify-between items-center">
                <p>{id}</p>
                <div className="flex gap-8">
                  <p>
                    High score: <span className="text-green-600">{score}</span>
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
