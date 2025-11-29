"use client"

import { useEffect, useState } from 'react'

interface BrowserData {
  ip: string
  city: string
  region: string
  country: string
  timezone: string
  browser: string
  os: string
  screen: string
  language: string
}

export default function BrowserInfo() {
  const [data, setData] = useState<BrowserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBrowserInfo = async () => {
      try {
        // Get browser info
        const userAgent = navigator.userAgent
        const browser = getBrowserName(userAgent)
        const os = getOSName(userAgent)
        const screen = `${window.screen.width}×${window.screen.height}`
        const language = navigator.language

        // Get IP and location
        const ipResponse = await fetch('https://api.ipify.org?format=json')
        const ipData = await ipResponse.json()
        const ip = ipData.ip

        // Get geolocation from IP
        const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`)
        const geoData = await geoResponse.json()

        setData({
          ip: ip,
          city: geoData.city || 'Unknown',
          region: geoData.region || 'Unknown',
          country: geoData.country_name || 'Unknown',
          timezone: geoData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          browser: browser,
          os: os,
          screen: screen,
          language: language.split('-')[0].toUpperCase()
        })
      } catch (error) {
        // Fallback to browser-only info
        const userAgent = navigator.userAgent
        setData({
          ip: 'Unknown',
          city: 'Unknown',
          region: 'Unknown',
          country: 'Unknown',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          browser: getBrowserName(userAgent),
          os: getOSName(userAgent),
          screen: `${window.screen.width}×${window.screen.height}`,
          language: navigator.language.split('-')[0].toUpperCase()
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBrowserInfo()
  }, [])

  const getBrowserName = (userAgent: string): string => {
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome'
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari'
    if (userAgent.includes('Edg')) return 'Edge'
    if (userAgent.includes('Opera')) return 'Opera'
    return 'Unknown'
  }

  const getOSName = (userAgent: string): string => {
    if (userAgent.includes('Mac')) return 'macOS'
    if (userAgent.includes('Win')) return 'Windows'
    if (userAgent.includes('Linux')) return 'Linux'
    if (userAgent.includes('Android')) return 'Android'
    if (userAgent.includes('iOS')) return 'iOS'
    return 'Unknown'
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="text-xs opacity-50">loading...</div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="flex-1 flex flex-col justify-center gap-2 text-xs">
      <div className="text-xs opacity-50 mb-1">browser info</div>
      
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="opacity-70">📍</span>
          <span className="text-right">
            {data.city}, {data.country}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="opacity-70">🌐</span>
          <span className="text-right font-mono text-[10px]">{data.ip}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="opacity-70">🕐</span>
          <span className="text-right">{data.timezone}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="opacity-70">💻</span>
          <span className="text-right">{data.browser} / {data.os}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="opacity-70">📱</span>
          <span className="text-right font-mono">{data.screen}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="opacity-70">🗣️</span>
          <span className="text-right">{data.language}</span>
        </div>
      </div>
    </div>
  )
}

