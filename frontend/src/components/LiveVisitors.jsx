import { useState, useEffect, useRef } from 'react';

const LiveVisitors = () => {
  const [count, setCount] = useState(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);
  const retryRef = useRef(null);

  const connect = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
    const wsUrl = backendUrl.replace('https://', 'wss://').replace('http://', 'ws://');

    try {
      const ws = new WebSocket(`${wsUrl}/ws/visitors`);
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);

      ws.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          setCount(data.visitors);
        } catch {}
      };

      ws.onclose = () => {
        setConnected(false);
        // Retry after 5s
        retryRef.current = setTimeout(connect, 5000);
      };

      ws.onerror = () => ws.close();
    } catch {}
  };

  useEffect(() => {
    connect();
    // Heartbeat to keep connection alive
    const ping = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send('ping');
      }
    }, 30000);

    return () => {
      clearTimeout(retryRef.current);
      clearInterval(ping);
      wsRef.current?.close();
    };
  }, []);

  if (count === null) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(5, 5, 15, 0.92)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '999px',
        padding: '7px 14px 7px 10px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 0 20px rgba(0,212,255,0.15), 0 4px 20px rgba(0,0,0,0.4)',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {/* Pulsing green dot */}
      <div style={{ position: 'relative', width: '10px', height: '10px' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: connected ? '#00FF88' : '#FF6B6B',
            animation: connected ? 'lv-ping 1.5s ease-in-out infinite' : 'none',
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '1px',
            borderRadius: '50%',
            background: connected ? '#00FF88' : '#FF6B6B',
          }}
        />
      </div>

      {/* Count */}
      <span
        style={{
          fontSize: '13px',
          fontWeight: '700',
          color: '#00D4FF',
          fontFamily: 'Calibri, sans-serif',
          letterSpacing: '0.3px',
        }}
      >
        {count}
      </span>

      {/* Label */}
      <span
        style={{
          fontSize: '11px',
          color: 'rgba(200,200,220,0.75)',
          fontFamily: 'Calibri, sans-serif',
          letterSpacing: '0.2px',
        }}
      >
        live {count === 1 ? 'visitor' : 'visitors'}
      </span>

      <style>{`
        @keyframes lv-ping {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LiveVisitors;