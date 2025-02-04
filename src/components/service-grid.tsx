import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./status-badge";
import type { ServiceProvider } from "@/types/dns";

interface ServiceGridProps {
  providers: ServiceProvider[];
}

export function ServiceGrid({ providers }: ServiceGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Providers in SG</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-4">
        {providers.map((provider) => (
          <div key={provider.name} className="space-y-4">
            <h3 className="font-semibold">{provider.name}</h3>
            {provider.services.map((service) => (
              <div
                key={service.code}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {service.code}
                  </p>
                </div>
                <StatusBadge status={service.status} />
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
