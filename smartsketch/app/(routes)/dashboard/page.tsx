"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react'
import React, { useEffect } from 'react'
function Dashboard() {
  return (
    <div className='p-8'>
      <h1>Welcome to Smart Sketch</h1>
    </div>

  )
}

export default Dashboard