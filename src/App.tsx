"use client";

import { useState } from "react";
import { DnsRecords } from "@/components/dns-records";
import { DdosProtection } from "@/components/ddos-protection";
import { ServiceGrid } from "@/components/service-grid";
import { L7Cdn } from "@/components/l7-cdn";
import type { CdnService, ActiveCdn, ServiceProvider } from "@/types/dns";

const providers: ServiceProvider[] = [
  {
    name: "SingTel",
    services: [
      { name: "Internet Banking", code: "IBSB", status: "healthy" },
      { name: "Mobile Banking", code: "MBS", status: "healthy" },
      { name: "Wealth", code: "IWSM", status: "healthy" },
    ],
  },
  {
    name: "StarHub",
    services: [
      { name: "Internet Banking", code: "IBSB", status: "healthy" },
      { name: "Mobile Banking", code: "MBS", status: "warning" },
    ],
  },
  {
    name: "M1",
    services: [
      { name: "Internet Banking", code: "IBSB", status: "error" },
      { name: "Mobile Banking", code: "MBS", status: "healthy" },
    ],
  },
];

const dnsRecords = [
  { name: "Internet Banking", code: "IBSB", status: "healthy" },
  { name: "Mobile Banking", code: "MBS", status: "healthy" },
  { name: "Wealth", code: "IWSM", status: "warning" },
];

const initialDdosServices = [
  {
    name: "StarHub",
    provider: "StarHub DNS Sec",
    enabled: true,
    status: "healthy",
  },
  {
    name: "Akamai",
    provider: "Akamai DNS Sec",
    enabled: true,
    status: "healthy",
  },
  {
    name: "Nexus Guard",
    provider: "NexusGuard DNS",
    enabled: false,
    status: "warning",
  },
];

const initialCdnServices: CdnService[] = [
  { name: "Internet Banking", provider: "Akamai", status: "healthy" },
  { name: "Mobile Banking", provider: "Akamai", status: "healthy" },
  { name: "Wealth", provider: "Akamai", status: "warning" },
  { name: "IDEAL", provider: "Cloudflare", status: "healthy" },
  { name: "IDEAL Mobile", provider: "Cloudflare", status: "error" },
];

const initialActiveCdn: ActiveCdn[] = [
  { name: "Internet Banking", provider: "Akamai", status: "healthy" },
  { name: "Mobile Banking", provider: "Akamai", status: "healthy" },
  { name: "Wealth", provider: "Akamai", status: "warning" },
  { name: "IDEAL", provider: "Cloudflare", status: "healthy" },
  { name: "IDEAL Mobile", provider: "Cloudflare", status: "error" },
];

export default function DashboardPage() {
  const [ddosServices, setDdosServices] = useState(initialDdosServices);
  const [cdnServices, setCdnServices] = useState(initialCdnServices);
  const [activeCdn, setActiveCdn] = useState(initialActiveCdn);

  const handleToggleService = async (service: {
    name: string;
    enabled: boolean;
  }) => {
    const updatedServices = ddosServices.map((s) =>
      s.name === service.name ? { ...s, enabled: !s.enabled } : s
    );
    setDdosServices(updatedServices);
  };

  const handleFlipCdnService = async (
    service: CdnService,
    newProvider: "Akamai" | "Cloudflare"
  ) => {
    // Update CDN Services
    const updatedCdnServices = cdnServices.map((s) =>
      s.name === service.name ? { ...s, provider: newProvider } : s
    );
    setCdnServices(updatedCdnServices);

    // Update Active CDN
    const updatedActiveCdn = activeCdn.map((cdn) =>
      cdn.name === service.name ? { ...cdn, provider: newProvider } : cdn
    );
    setActiveCdn(updatedActiveCdn);

    // Here you would typically make an API call to update the backend
    console.log(`Flipped ${service.name} to ${newProvider}`);
  };

  return (
    <div className="container space-y-8 py-8 mx-auto">
      <ServiceGrid providers={providers} />
      <div className="grid gap-8 md:grid-cols-2">
        <DnsRecords records={dnsRecords} />
        <DdosProtection
          services={ddosServices}
          setServices={setDdosServices}
          onToggle={handleToggleService}
        />
      </div>
      <L7Cdn
        cdnServices={cdnServices}
        activeCdn={activeCdn}
        onFlipService={handleFlipCdnService}
      />
    </div>
  );
}
