import { useEffect } from 'react';

type ScriptType = 'text/javascript' | 'module'

const useScript = (src: string, type: ScriptType) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = src
    script.type = type
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    };
  }, [src, type])
};

export default useScript
