interface URLPatternInit {
  protocol?: string;
  username?: string;
  password?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  baseURL?: string;
}

interface URLPatternResult {
  inputs: [URLPatternInput, string];
  protocol?: { input: string; groups: Record<string, string> };
  username?: { input: string; groups: Record<string, string> };
  password?: { input: string; groups: Record<string, string> };
  hostname?: { input: string; groups: Record<string, string> };
  port?: { input: string; groups: Record<string, string> };
  pathname?: { input: string; groups: Record<string, string> };
  search?: { input: string; groups: Record<string, string> };
  hash?: { input: string; groups: Record<string, string> };
}

type URLPatternInput = string | URLPatternInit;

declare class URLPattern {
  constructor(init?: URLPatternInput, baseURL?: string);
  test(input: URLPatternInput, baseURL?: string): boolean;
  exec(input: URLPatternInput, baseURL?: string): URLPatternResult | null;
  protocol: string;
  username: string;
  password: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
}
