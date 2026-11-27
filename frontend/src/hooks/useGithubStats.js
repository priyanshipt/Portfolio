import { useEffect, useState } from 'react';
import axios from 'axios';
import { getGithubStats } from '../services/api.js';

// Only fetches when `enabled` becomes true, so the API is not called until the section is near the screen.
export default function useGithubStats(enabled) {
  const [state, setState] = useState({ status: 'idle', data: null });

  useEffect(() => {
    if (!enabled) return undefined;
    const controller = new AbortController();
    setState({ status: 'loading', data: null });

    getGithubStats(controller.signal)
      .then((data) => setState({ status: 'success', data }))
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setState({ status: 'error', data: null });
      });

    return () => controller.abort();
  }, [enabled]);

  return state;
}
