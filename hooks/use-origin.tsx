import { useState, useEffect } from "react"

export const useOrigin = () => {
  const [isClient, setIsClient] = useState(false)

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : ""

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? origin : ""
}
