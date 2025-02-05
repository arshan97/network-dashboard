export interface ServiceProvider {
  name: string;
  services: {
    name: string;
    code: string;
    status: "healthy" | "warning" | "error";
  }[];
}

export interface DnsRecord {
  name: string;
  code: string;
  status: "healthy" | "warning" | "error";
}

export interface DdosProtection {
  name: string;
  provider: string;
  enabled: boolean;
  status: "healthy" | "warning" | "error";
}

export interface CdnService {
  name: string;
  provider: "Akamai" | "Cloudflare";
  status: "healthy" | "warning" | "error";
}

export interface ActiveCdn {
  name: string;
  provider: "Akamai" | "Cloudflare";
  status: "healthy" | "warning" | "error";
}
