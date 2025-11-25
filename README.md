# Sentinel AI: Enterprise Multi-Cloud Security Simulator

**Author**: Purushotham Muktha  
**Built with**: React, TailwindCSS, Gemini AI

![Sentinel AI Banner](https://img.shields.io/badge/Security-Architecture-indigo) ![Status](https://img.shields.io/badge/Status-Operational-emerald)

## 🛡️ Overview

**Sentinel AI** is an interactive, 3D-styled visualization tool designed for cybersecurity aspirants, architects, and engineers. It simulates a production-grade enterprise security architecture spanning **AWS**, **Azure**, and **GCP**, integrated with core security operations (SIEM, SOAR, Identity).

This application helps users visualize abstract security concepts—such as Traffic Flow, Threat Vectors, and Zero Trust implementation—in a tangible, animated environment.

## 🚀 Key Features

### 1. Multi-Cloud Topology Map
- **Interactive Visualization**: Explore a unified security posture across AWS (Workloads), Azure (Data), and GCP (Compliance).
- **Component Deep Dives**: Click on any node (e.g., AWS WAF, Azure Sentinel, Google Cloud Armor) to see detailed specifications, compliance frameworks (NIST, PCI-DSS, GDPR), and data ingestion methods.

### 2. Traffic Flow Simulator
- **Live Signal Tracing**: Visualize how data moves through the network.
- **Dashed Line Animation**: Watch encrypted traffic (HTTPS), logging signals, and identity authentication flows (SAML/OIDC) pulse through the system.
- **Traffic Differentiation**: distinct visual styles for User Traffic (Blue), Logging/Telemetry (Purple), and Attack Vectors (Red).

### 3. Threat Simulation
- **DDoS Attacks**: Simulate a volumetric UDP flood hitting the AWS WAF edge.
- **SQL Injection**: Visualize an injection campaign targeting the Azure SQL Database.
- **Defense Validation**: See exactly which components light up to mitigate specific threats.

### 4. Strategic Implementation Plan
- **Step-by-Step Rollout**: A "Phase" view that guides users through building this architecture from scratch—from "Landing Zone Foundation" to "Unified Detection".
- **Visual Highlighting**: Hovering over a project phase (e.g., "Phase 2: Perimeter Security") automatically spotlights the relevant components in the architecture map.

### 5. AI-Powered Insights (Gemini)
- **On-Demand Analysis**: Uses Google's Gemini 2.5 Flash model to generate executive-level summaries, business value statements, and deep technical configuration details for any selected component.

## 🎓 Learning Outcomes for Aspirants

By exploring this simulator, cybersecurity students and professionals will learn:
1.  **Pattern Recognition**: How security controls (WAF, IDPS, SIEM) act as layers of defense.
2.  **Data Gravity**: Understanding how logging telemetry flows from the edge to a central SIEM.
3.  **Zero Trust Principles**: Visualizing how Identity Providers (IdP) and Key Management Systems (KMS) interlock with workloads.
4.  **Compliance Mapping**: associating technical components with regulatory requirements like HIPAA and FIPS 140-2.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **AI Integration**: Google GenAI SDK (Gemini 2.5 Flash)
- **Animation**: CSS Keyframes, SVG Animations

---

*Created with ❤️ by Purushotham Muktha for the Cybersecurity Community.*
