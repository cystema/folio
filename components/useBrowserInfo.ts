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
  networkSpeed: string | null
  cpuCores: number | null
  deviceMemory: number | null
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

        // Network speed (downlink in Mbps)
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
        const networkSpeed = connection?.downlink ? `${connection.downlink} Mbps` : null

        // CPU cores
        const cpuCores = navigator.hardwareConcurrency || null

        // Device memory (Chrome only, in GB)
        const deviceMemory = (navigator as any).deviceMemory || null

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
          language: language.split('-')[0].toUpperCase(),
          networkSpeed: networkSpeed,
          cpuCores: cpuCores,
          deviceMemory: deviceMemory
        })
      } catch {
        const userAgent = navigator.userAgent
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
        const networkSpeed = connection?.downlink ? `${connection.downlink} Mbps` : null
        const cpuCores = navigator.hardwareConcurrency || null
        const deviceMemory = (navigator as any).deviceMemory || null

        setData({
          ip: 'Unknown',
          city: 'Unknown',
          region: 'Unknown',
          country: 'Unknown',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          browser: getBrowserName(userAgent),
          os: getOSName(userAgent),
          screen: `${window.screen.width}×${window.screen.height}`,
          language: navigator.language.split('-')[0].toUpperCase(),
          networkSpeed: networkSpeed,
          cpuCores: cpuCores,
          deviceMemory: deviceMemory
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBrowserInfo()
  }, [])

  return { data, loading }
}

