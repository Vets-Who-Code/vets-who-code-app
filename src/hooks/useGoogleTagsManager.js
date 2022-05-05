import { useEffect } from 'react'
import { useRouter } from 'next/router'

function useGoogleTagManager(gtaPublicApiKey) {
  const router = useRouter()

  const handleRouteChange = url => {
    window.gtag('config', gtaPublicApiKey, {
      page_path: url,
    })
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

export default useGoogleTagManager
