import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./status-badge";
import type { DnsRecord } from "@/types/dns";

interface DnsRecordsProps {
  records: DnsRecord[];
}

export function DnsRecords({ records }: DnsRecordsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Specific DNS Records</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        {records.map((record) => (
          <div
            key={record.code}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{record.name}</p>
              <p className="text-xs text-muted-foreground">{record.code}</p>
            </div>
            <StatusBadge status={record.status} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
