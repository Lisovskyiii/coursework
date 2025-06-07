import { useCallback, useEffect, useRef, useState } from 'react';

type WebSocketMessageHandler = (data: any) => void;
type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface UseWebSocketOptions {
  url: string;
  onMessage?: WebSocketMessageHandler;
  reconnectInterval?: number;
  reconnectAttempts?: number;
  enabled?: boolean; // Добавляем новый параметр
}

export const useWebSocket = ({
  url,
  enabled,
  reconnectInterval = 5000,
  onMessage,
  reconnectAttempts = 3
}: UseWebSocketOptions) => {
  const [status, setStatus] = useState<WebSocketStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Array<{ progress: number }>>([]);
  const reconnectCountRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    setStatus('connecting');

    const ws = new WebSocket(url);

    ws.onopen = () => {
      setStatus('connected');
      reconnectCountRef.current = 0;
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        setMessages((prev) => [...prev, data]);
        if (onMessage) onMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      setStatus('disconnected');
    };

    ws.onerror = () => {
      setStatus('error');
      ws.close();
    };

    wsRef.current = ws;
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [url, reconnectInterval, reconnectAttempts]);
  /* eslint-disable react-hooks/exhaustive-deps */

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    }
  }, []);

  useEffect(() => {
    if (!enabled || !url) return () => {}; // Не подключаемся, если enabled=false или url пустой

    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect, url, enabled]); // Добавляем enabled в зависимости

  return {
    status,
    sendMessage,
    disconnect,
    connect,
    messages
  };
};
