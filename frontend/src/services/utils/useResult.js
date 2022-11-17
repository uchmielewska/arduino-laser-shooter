import { useState, useEffect } from "react";
import api from "../api/index";

export default function useResult() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.result();

      if (response.status) {
        setResult(response.data);
      } else {
        console.error("Error occur while fetching result");
      }
    }

    fetchData();
  }, []);

  return [result];
}
