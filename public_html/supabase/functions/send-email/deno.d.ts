declare module "https://deno.land/std@0.168.0/http/server.ts" {
  export function serve(handler: (req: Request) => Promise<Response>): void;
}

declare module "https://deno.land/x/smtp/mod.ts" {
  export class SmtpClient {
    constructor();
    connectTLS(config: {
      hostname: string;
      port: number;
      username: string;
      password: string;
    }): Promise<void>;
    send(options: {
      from: string;
      to: string;
      subject: string;
      content: string;
      html: string;
    }): Promise<void>;
    close(): Promise<void>;
  }
}

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
}; 