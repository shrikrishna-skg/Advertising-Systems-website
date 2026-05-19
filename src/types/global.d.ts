declare module 'html-escaper' {
  export function escape(value: string): string;
  export function unescape(value: string): string;
}

interface Window {
  posthog?: {
    identify?: (id: string, properties?: Record<string, unknown>) => void;
    capture?: (event: string, properties?: Record<string, unknown>) => void;
    captureException?: (error: unknown) => void;
    get_session_id?: () => string;
    get_distinct_id?: () => string;
  };
}
