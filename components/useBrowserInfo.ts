"use client"

import { useEffect, useState } from 'react'

export interface BrowserData {
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

export function useBrowserInfo() {
  const [data, setData] = useState<BrowserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

    const fetchBrowserInfo = async () => {
      try {
        const userAgent = navigator.userAgent
        const browser = getBrowserName(userAgent)
        const os = getOSName(userAgent)
        const screen = `${window.screen.width}×${window.screen.height}`
        const language = navigator.language

        const ipResponse = await fetch('https://api.ipify.org?format=json')
        const ipData = await ipResponse.json()
        const ip = ipData.ip

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
      } catch {
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

  return { data, loading }
}

