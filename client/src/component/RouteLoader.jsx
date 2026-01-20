import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";

export default function RouteLoader() {
  const location = useLocation();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // adjust duration if needed

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}
