import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export function useMessageNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [message, setMessage] = useState(() =>
    location.state?.message ? location.state : null,
  )

  useEffect(() => {
    if (location.state?.message) {
      navigate(".", { state: {} })
    }
  }, [location.state?.message, navigate])

  return { message, setMessage }
}
