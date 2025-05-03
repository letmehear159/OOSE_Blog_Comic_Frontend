import React from 'react'
import { Button, Checkbox, Input } from 'antd'
import { Link } from 'react-router-dom'

const LoginPage = () => {

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section: Login Form */}
        <div className="w-1/2 p-10">
          <div className="flex items-center mb-8">
            <div className="text-blue-600 text-2xl font-bold">Sellora</div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-500 mb-6">Enter your email or username and password to access your account.</p>
          <div className="space-y-4 mt-5">
            <div>
              <label className="block text-sm font-medium text-left text-gray-700">Email</label>
              <Input
                type="email"
                value="sellostore@company.com"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-left text-gray-700">Password</label>
              <Input.Password
                value="5ellostore."
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <Checkbox type="checkbox" className="mr-2"/>
                <span className="text-sm ml-2 text-gray-600">Remember Me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forget Your Password?</a>
            </div>
            <Button className="w-full bg-blue-600  text-amber-50 py-2 rounded-md hover:bg-blue-700 transition">
              Log In
            </Button>
          </div>
          <div className="mt-4 text-center ">
            <p className="text-sm text-gray-600">Or Log In With</p>
            <div className="flex justify-center gap-3 mb-4  mt-2">
              <Button
                className="flex  items-center px-4 w-full justify-center py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 "/>
                Google
              </Button>
            </div>
            <p className="mt-5 text-sm text-gray-600 ">
              Don’t Have an Account? <Link className="text-blue-600 hover:underline" to={'./23'}>Register Now.</Link>
            </p>
          </div>
          <div className="mt-8 text-xs text-gray-500 flex justify-between">
            <p>Copyright © 2025 Sellora Enterprises LTD.</p>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
        {/* Right Section: Promotional Content */}
        <div className="w-1/2 bg-blue-600 p-10 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Effortlessly manage your team and operations.</h2>
          <p className="mb-6">Log in to access the CRM dashboard and manage your team.</p>
          <div className="relative">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm text-gray-600">Total Sales</p>
                  <p className="text-xl font-bold">$189,374</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm text-gray-600">Chat Performance</p>
                  <p className="text-xl font-bold">00:01:30</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-md col-span-2">
                  <p className="text-sm text-gray-600">Sales Overview</p>
                  <div className="h-16 bg-gray-300 rounded mt-2"></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-sm text-gray-600">Total Profit</p>
                <p className="text-xl font-bold">$25,684</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 bg-white p-4 rounded-lg shadow-lg">
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-sm text-gray-600">Sales Categories</p>
                <div className="h-16 bg-purple-300 rounded mt-2"></div>
                <p className="text-sm text-gray-600 mt-2">6,248 Units</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage