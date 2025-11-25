import { CloudProvider, SecurityComponent, SecurityDomain, ArchitectureFlow, ThreatVector, ImplementationPhase } from './types';

// --- Components ---

export const SECURITY_COMPONENTS: SecurityComponent[] = [
  // --- CORE SERVICES ---
  {
    id: 'siem-core',
    name: 'Enterprise SIEM/SOAR',
    provider: CloudProvider.CORE,
    domain: SecurityDomain.THREAT_DETECTION,
    description: 'Centralized Security Information & Event Management with automated response playbooks.',
    icon: 'Activity',
    compliance: ['NIST-800-53', 'ISO-27001', 'PCI-DSS', 'GDPR'],
    mitigates: ['Advanced Persistent Threats', 'Insider Threats', 'Zero-day Exploits'],
    dataCaptured: [
      { source: 'All Clouds', type: 'Audit Logs', mechanism: 'API Ingestion' },
      { source: 'Endpoints', type: 'EDR Telemetry', mechanism: 'Forwarder' }
    ]
  },
  {
    id: 'cspm-core',
    name: 'Unified CSPM',
    provider: CloudProvider.CORE,
    domain: SecurityDomain.COMPLIANCE,
    description: 'Continuous cloud security posture management scanning for misconfigurations.',
    icon: 'FileCheck',
    compliance: ['ISO-27001', 'HIPAA'],
    mitigates: ['Misconfigurations', 'Open Buckets', 'Weak IAM Policies'],
    dataCaptured: [
      { source: 'Cloud APIs', type: 'Config States', mechanism: 'Snapshot' }
    ]
  },
  {
    id: 'idp-core',
    name: 'Global Identity Provider',
    provider: CloudProvider.CORE,
    domain: SecurityDomain.IDENTITY,
    description: 'Centralized IdP (e.g., Okta/Entra ID) managing SSO and MFA across all clouds.',
    icon: 'Fingerprint',
    compliance: ['NIST-800-63', 'GDPR'],
    mitigates: ['Credential Theft', 'Unauthorized Access'],
    dataCaptured: [
      { source: 'Auth Requests', type: 'Sign-on Logs', mechanism: 'OIDC/SAML' }
    ]
  },
  {
    id: 'cicd-core',
    name: 'DevSecOps Pipeline',
    provider: CloudProvider.CORE,
    domain: SecurityDomain.COMPLIANCE,
    description: 'Automated CI/CD (GitHub Actions/Jenkins) with SAST/DAST integration.',
    icon: 'GitBranch',
    compliance: ['ISO-27001'],
    mitigates: ['Insecure Code', 'Hardcoded Secrets'],
    dataCaptured: [
      { source: 'Code Commit', type: 'Build Logs', mechanism: 'Webhook' }
    ]
  },

  // --- AWS ---
  {
    id: 'aws-waf',
    name: 'AWS WAF & Shield',
    provider: CloudProvider.AWS,
    domain: SecurityDomain.NETWORK,
    description: 'Web Application Firewall and DDoS protection at the edge.',
    icon: 'Shield',
    compliance: ['PCI-DSS'],
    mitigates: ['SQL Injection', 'XSS', 'DDoS Volumetric Attacks'],
    dataCaptured: [
      { source: 'Internet Traffic', type: 'HTTP Headers', mechanism: 'Inline Inspection' }
    ]
  },
  {
    id: 'aws-guardduty',
    name: 'Amazon GuardDuty',
    provider: CloudProvider.AWS,
    domain: SecurityDomain.THREAT_DETECTION,
    description: 'Intelligent threat detection using ML on CloudTrail and VPC Flow Logs.',
    icon: 'Eye',
    compliance: ['NIST-800-53'],
    mitigates: ['Crypto Jacking', 'Port Scanning', 'Account Compromise'],
    dataCaptured: [
      { source: 'VPC', type: 'Flow Logs', mechanism: 'Internal Tape' },
      { source: 'DNS', type: 'Query Logs', mechanism: 'Internal Tape' }
    ]
  },
  {
    id: 'aws-workload',
    name: 'EC2 Production App',
    provider: CloudProvider.AWS,
    domain: SecurityDomain.ENDPOINT,
    description: 'Critical business application running on EC2 instances.',
    icon: 'Server',
    compliance: ['GDPR'],
    mitigates: [],
    dataCaptured: []
  },
  {
    id: 'aws-kms',
    name: 'AWS KMS',
    provider: CloudProvider.AWS,
    domain: SecurityDomain.DATA_PROTECTION,
    description: 'Key Management Service for managing cryptographic keys.',
    icon: 'Key',
    compliance: ['FIPS 140-2'],
    mitigates: ['Data Leakage', 'Unauthorized Decryption'],
    dataCaptured: [
      { source: 'API', type: 'Key Usage Logs', mechanism: 'CloudTrail' }
    ]
  },

  // --- AZURE ---
  {
    id: 'azure-fw',
    name: 'Azure Firewall Premium',
    provider: CloudProvider.AZURE,
    domain: SecurityDomain.NETWORK,
    description: 'Managed, cloud-based network security service that protects your Azure Virtual Network resources.',
    icon: 'Globe',
    compliance: ['ISO-27001', 'PCI-DSS'],
    mitigates: ['Data Exfiltration', 'Malware Command & Control'],
    dataCaptured: [
      { source: 'VNet', type: 'Packet Inspection', mechanism: 'Inline' }
    ]
  },
  {
    id: 'azure-defender',
    name: 'Defender for Cloud',
    provider: CloudProvider.AZURE,
    domain: SecurityDomain.THREAT_DETECTION,
    description: 'Cloud workload protection platform (CWPP) with integrated vulnerability scanning.',
    icon: 'Shield',
    compliance: ['NIST-800-53', 'HIPAA'],
    mitigates: ['Malware on VM', 'Brute Force SSH/RDP'],
    dataCaptured: [
      { source: 'VM Extensions', type: 'System Events', mechanism: 'Agent' }
    ]
  },
  {
    id: 'azure-db',
    name: 'Azure SQL Database',
    provider: CloudProvider.AZURE,
    domain: SecurityDomain.DATA_PROTECTION,
    description: 'Managed relational database service with advanced data security.',
    icon: 'Database',
    compliance: ['GDPR', 'HIPAA'],
    mitigates: ['SQL Injection', 'Unauthorized Access'],
    dataCaptured: [
      { source: 'Database Engine', type: 'Query Audit', mechanism: 'Native Logging' }
    ]
  },
  {
    id: 'azure-kv',
    name: 'Azure Key Vault',
    provider: CloudProvider.AZURE,
    domain: SecurityDomain.DATA_PROTECTION,
    description: 'Safeguard cryptographic keys and other secrets used by cloud apps and services.',
    icon: 'Vault',
    compliance: ['FIPS 140-2', 'PCI-DSS'],
    mitigates: ['Secret Exposure', 'Key Theft'],
    dataCaptured: [
      { source: 'Access Policies', type: 'Access Logs', mechanism: 'Azure Monitor' }
    ]
  },

  // --- GCP ---
  {
    id: 'gcp-armor',
    name: 'Cloud Armor',
    provider: CloudProvider.GCP,
    domain: SecurityDomain.NETWORK,
    description: 'Enterprise DDoS defense and WAF policies at global scale.',
    icon: 'Shield',
    compliance: ['PCI-DSS'],
    mitigates: ['L7 DDoS', 'OWASP Top 10'],
    dataCaptured: [
      { source: 'Load Balancer', type: 'Request Metadata', mechanism: 'Inline' }
    ]
  },
  {
    id: 'gcp-scc',
    name: 'Security Command Center',
    provider: CloudProvider.GCP,
    domain: SecurityDomain.THREAT_DETECTION,
    description: 'Centralized vulnerability and threat reporting service.',
    icon: 'Activity',
    compliance: ['NIST-800-53'],
    mitigates: ['Public IP Exposure', 'Privilege Escalation'],
    dataCaptured: [
      { source: 'Assets', type: 'Discovery Data', mechanism: 'API Scanning' }
    ]
  },
  {
    id: 'gcp-kms',
    name: 'Cloud KMS',
    provider: CloudProvider.GCP,
    domain: SecurityDomain.DATA_PROTECTION,
    description: 'Cloud-hosted key management service that lets you manage cryptographic keys.',
    icon: 'Key',
    compliance: ['FIPS 140-2'],
    mitigates: ['Data Breach', 'Compromised Keys'],
    dataCaptured: [
      { source: 'API', type: 'Admin Activity', mechanism: 'Audit Logs' }
    ]
  },
  {
    id: 'gcp-repo',
    name: 'Artifact Registry',
    provider: CloudProvider.GCP,
    domain: SecurityDomain.COMPLIANCE,
    description: 'Secure private registry for Docker images and Maven artifacts.',
    icon: 'Container',
    compliance: ['SLSA Level 3'],
    mitigates: ['Supply Chain Attacks', 'Malicious Images'],
    dataCaptured: []
  },

  // --- EXTERNAL ---
  {
    id: 'internet',
    name: 'Public Internet / Users',
    provider: CloudProvider.EXTERNAL,
    domain: SecurityDomain.NETWORK,
    description: 'Source of legitimate traffic and potential threats.',
    icon: 'Globe',
    compliance: [],
    mitigates: [],
    dataCaptured: []
  },
  {
    id: 'attacker',
    name: 'Threat Actor',
    provider: CloudProvider.EXTERNAL,
    domain: SecurityDomain.THREAT_DETECTION,
    description: 'Simulated external attacker.',
    icon: 'Zap',
    compliance: [],
    mitigates: [],
    dataCaptured: []
  }
];

// --- Flows ---

export const ARCHITECTURE_FLOWS: ArchitectureFlow[] = [
  // Normal Traffic
  { id: 'flow-1', from: 'internet', to: 'aws-waf', type: 'TRAFFIC', label: 'HTTPS', description: 'User traffic enters AWS via WAF', activeInModes: ['default', 'dataflow'] },
  { id: 'flow-2', from: 'aws-waf', to: 'aws-workload', type: 'TRAFFIC', label: 'Filtered', description: 'Clean traffic reaches App', activeInModes: ['default', 'dataflow'] },
  
  // Logging Flow
  { id: 'flow-3', from: 'aws-guardduty', to: 'siem-core', type: 'LOGGING', label: 'Findings', description: 'GuardDuty sends findings to Central SIEM', activeInModes: ['default', 'dataflow', 'logging'] },
  { id: 'flow-4', from: 'azure-defender', to: 'siem-core', type: 'LOGGING', label: 'Alerts', description: 'Defender signals sent to SIEM', activeInModes: ['default', 'dataflow', 'logging'] },
  { id: 'flow-5', from: 'gcp-scc', to: 'siem-core', type: 'LOGGING', label: 'Reports', description: 'SCC vulnerabilities aggregated', activeInModes: ['default', 'dataflow', 'logging'] },
  
  // Cross Cloud Data
  { id: 'flow-6', from: 'aws-workload', to: 'azure-db', type: 'TRAFFIC', label: 'App Data', description: 'App accesses Azure SQL via VPN', activeInModes: ['default', 'dataflow'] },

  // Identity & Ops Flows
  { id: 'flow-idp-1', from: 'idp-core', to: 'aws-workload', type: 'TRAFFIC', label: 'SSO/SAML', description: 'Identity Provider authenticates session', activeInModes: ['default', 'dataflow'] },
  { id: 'flow-idp-2', from: 'idp-core', to: 'azure-db', type: 'TRAFFIC', label: 'Entra ID', description: 'Database access via Managed Identity', activeInModes: ['default', 'dataflow'] },
  
  { id: 'flow-cicd-1', from: 'cicd-core', to: 'aws-workload', type: 'TRAFFIC', label: 'Deploy', description: 'Pipeline deploys new build artifact', activeInModes: ['default', 'dataflow'] },
  { id: 'flow-cicd-2', from: 'cicd-core', to: 'gcp-repo', type: 'TRAFFIC', label: 'Push Image', description: 'Store container image in secure registry', activeInModes: ['default', 'dataflow'] },

  // Encryption Flows
  { id: 'flow-kms-1', from: 'aws-workload', to: 'aws-kms', type: 'TRAFFIC', label: 'Decrypt', description: 'App requests key to decrypt data', activeInModes: ['default', 'dataflow'] },
  { id: 'flow-kms-2', from: 'azure-db', to: 'azure-kv', type: 'TRAFFIC', label: 'Fetch Secret', description: 'DB retrieves connection string/keys', activeInModes: ['default', 'dataflow'] },
  { id: 'flow-kms-3', from: 'gcp-repo', to: 'gcp-kms', type: 'LOGGING', label: 'Sign', description: 'Verify image signature', activeInModes: ['default', 'dataflow'] },

  // Attack Flows (Hidden by default)
  { id: 'attack-1', from: 'attacker', to: 'aws-waf', type: 'ATTACK', label: 'DDoS Attack', description: 'Volumetric UDP Flood', activeInModes: ['threat-ddos'] },
  { id: 'attack-2', from: 'attacker', to: 'azure-db', type: 'ATTACK', label: 'SQL Injection', description: 'Attempted SQLi on Database', activeInModes: ['threat-sqli'] },
];

// --- Threats ---

export const THREAT_VECTORS: ThreatVector[] = [
  {
    id: 'threat-ddos',
    name: 'Volumetric DDoS',
    description: 'Massive UDP flood targeting the application edge.',
    severity: 'CRITICAL',
    affectedComponents: ['aws-waf', 'aws-workload'],
    flowId: 'attack-1'
  },
  {
    id: 'threat-sqli',
    name: 'SQL Injection Campaign',
    description: 'Sophisticated injection attempts targeting customer database.',
    severity: 'HIGH',
    affectedComponents: ['azure-db', 'aws-workload'],
    flowId: 'attack-2'
  }
];

// --- Implementation Plan ---

export const IMPLEMENTATION_PLAN: ImplementationPhase[] = [
  {
    id: 'phase-1',
    phase: 'Phase 1',
    title: 'Landing Zone Foundation',
    relatedComponents: ['aws-guardduty', 'gcp-scc', 'siem-core', 'idp-core'],
    steps: [
      { title: 'Identity Federation', description: 'Configure AWS IAM Identity Center and Azure Entra ID with single sign-on (SSO).' },
      { title: 'Network Hub & Spoke', description: 'Deploy Transit Gateways (AWS) and vWAN (Azure) for centralized traffic inspection.' },
      { title: 'Enable Base Monitoring', description: 'Turn on GuardDuty, Azure Defender, and SCC Standard across all accounts.' }
    ]
  },
  {
    id: 'phase-2',
    phase: 'Phase 2',
    title: 'Perimeter & Edge Security',
    relatedComponents: ['aws-waf', 'gcp-armor', 'azure-fw'],
    steps: [
      { title: 'WAF Deployment', description: 'Deploy WAF policies (AWS WAF, Cloud Armor) on public load balancers to block OWASP Top 10.' },
      { title: 'DDoS Protection', description: 'Enable AWS Shield Advanced and Azure DDoS Protection on critical public IPs.' },
      { title: 'Egress Filtering', description: 'Configure Azure Firewall Premium to inspect outbound traffic for C2 communication.' }
    ]
  },
  {
    id: 'phase-3',
    phase: 'Phase 3',
    title: 'DevSecOps & Supply Chain',
    relatedComponents: ['cicd-core', 'gcp-repo', 'gcp-kms'],
    steps: [
      { title: 'Secure Pipelines', description: 'Implement SAST/DAST scanning in GitHub Actions / Jenkins pipelines.' },
      { title: 'Artifact Signing', description: 'Enforce image signing with Cosign and verify signatures using Binary Authorization.' },
      { title: 'Secret Scanning', description: 'Prevent hardcoded secrets from reaching production repositories.' }
    ]
  },
  {
    id: 'phase-4',
    phase: 'Phase 4',
    title: 'Workload & Data Protection',
    relatedComponents: ['azure-defender', 'aws-workload', 'aws-kms', 'azure-kv'],
    steps: [
      { title: 'Encryption at Rest', description: 'Migrate all storage encryption to Customer Managed Keys (CMK) via KMS/Key Vault.' },
      { title: 'Vulnerability Mgmt', description: 'Configure automated scanning for OS vulnerabilities and container image flaws.' },
      { title: 'File Integrity Monitoring', description: 'Enable FIM for critical system files to detect unauthorized changes.' }
    ]
  },
  {
    id: 'phase-5',
    phase: 'Phase 5',
    title: 'Unified Detection (SIEM)',
    relatedComponents: ['siem-core', 'cspm-core'],
    steps: [
      { title: 'Log Aggregation', description: 'Stream CloudTrail, Activity Logs, and VPC Flow Logs to the central SIEM.' },
      { title: 'Correlation Rules', description: 'Implement cross-cloud detection rules (e.g., "Impossible Travel" between AWS and Azure).' },
      { title: 'Automated Response', description: 'Deploy SOAR playbooks to automatically isolate compromised instances.' }
    ]
  }
];