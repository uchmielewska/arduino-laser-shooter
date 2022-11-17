import { useState, useEffect } from "react";
import api from "../api";

export default function useResult() {
  const [result, setResult] = useState();

  const fetchResult = async () => {
    const response = await api.result();

    if (response.status) {
      setResult(response.data);
    } else {
      console.error("Error while fetching result");
    }
  };

  useEffect(() => fetchResult(), []);

  return result;
}
