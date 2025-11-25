export enum CloudProvider {
  AWS = 'AWS',
  AZURE = 'AZURE',
  GCP = 'GCP',
  CORE = 'CORE',
  EXTERNAL = 'EXTERNAL'
}

export enum SecurityDomain {
  IDENTITY = 'Identity & Access',
  NETWORK = 'Network Security',
  COMPLIANCE = 'Compliance & Governance',
  THREAT_DETECTION = 'Threat Detection',
  DATA_PROTECTION = 'Data Protection',
  ENDPOINT = 'Endpoint Security'
}

export type ComplianceStandard = 'NIST-800-53' | 'PCI-DSS' | 'GDPR' | 'HIPAA' | 'ISO-27001' | 'NIST-800-63' | 'FIPS 140-2' | 'SLSA Level 3';

export interface DataCapturing {
  source: string;
  type: string; // e.g., "VPC Flow Logs", "API Calls", "Syslogs"
  mechanism: string; // e.g., "Agent-based", "API Polling", "Sidecar"
}

export interface SecurityComponent {
  id: string;
  name: string;
  provider: CloudProvider;
  domain: SecurityDomain;
  description: string;
  icon: string;
  compliance: ComplianceStandard[];
  mitigates: string[]; // List of threats this component helps mitigate
  dataCaptured?: DataCapturing[]; // What data this component ingests/produces
}

export interface AIAnalysis {
  summary: string;
  importance: string;
  businessValue: string;
  technicalDetails: string[];
}

export type FlowType = 'TRAFFIC' | 'LOGGING' | 'ATTACK';

export interface ArchitectureFlow {
  id: string;
  from: string; // Component ID
  to: string;   // Component ID
  type: FlowType;
  label: string;
  description: string;
  activeInModes: string[]; // e.g., ['default', 'threat-1']
}

export interface ThreatVector {
  id: string;
  name: string;
  description: string;
  severity: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  affectedComponents: string[];
  flowId: string; // References an ArchitectureFlow representing the attack path
}

export interface ImplementationStep {
  title: string;
  description: string;
}

export interface ImplementationPhase {
  id: string;
  phase: string;
  title: string;
  steps: ImplementationStep[];
  relatedComponents: string[]; // IDs of components involved
}