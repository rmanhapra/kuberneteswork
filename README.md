# Kubernetes Work

A **Kubernetes learning and demonstration repository** containing practical examples of common Kubernetes concepts and deployment patterns. Each folder focuses on a specific Kubernetes feature area.

---

## Repository Structure

### [ColorApp](./ColorApp/)
A sample Node.js / Express.js web application used as the primary demo workload throughout the repository.

- `src/index.js` – HTTP server that returns an HTML page displaying the pod's hostname and a blue color indicator; exposes a `/api` endpoint (supports JSON and plain-text responses).
- `Dockerfile` – Containerises the app with the `node:22-alpine` base image.
- `package.json` – Declares the single runtime dependency (`express ^4.19.2`).

### [ColorAppServices](./ColorAppServices/)
Kubernetes manifests that deploy and expose the ColorApp.

| File | Description |
|------|-------------|
| `colorappdeployment.yaml` | Deployment with 5 replicas |
| `colorappservice.yaml` | ClusterIP Service |
| `colorappnodePort.yaml` | NodePort Service for external access |
| `colorappsolopod.yaml` | Standalone Pod manifest |
| `trafficgendpod.yaml` | Pod running the traffic-generator sidecar |
| `Namespaces/` | Namespace definitions |
| `ResourceLimits/` | CPU / memory resource-limit examples |

### [ObjectManagement](./ObjectManagement/)
Minimal YAML examples for core Kubernetes objects — great for getting started.

- `basicpod.yaml`, `basicdeployment.yaml`, `basicreplicaset.yaml`, `basicservice.yaml`, `basiccombined.yaml`

### [Security](./Security/)
Kubernetes security configurations covering authentication, authorisation, and network controls.

- **PKI / Certificates** – `alice.crt/.key`, `bob.crt/.key`, `csr.yaml` (CertificateSigningRequest)
- **RBAC** – Role, ClusterRole, RoleBinding, and ServiceAccount manifests
- **NetworkPolicies/** – Network policy examples
- **podsecuritystandards/** – Pod security standard configurations

### [ServiceWithMongo](./ServiceWithMongo/)
Demonstrates integrating a MongoDB database into a Kubernetes workload.

- `mongo-ss.yaml` – StatefulSet for MongoDB
- `mongo-svc.yaml` – Service exposing MongoDB within the cluster
- `mongo-root-credentials.yaml` / `mongo-init.config.yaml` – Secrets and ConfigMap
- `mongo-colordb-credentials.yaml` – Per-database credentials

### [Statefulsets](./Statefulsets/)
StatefulSet patterns for workloads that require stable identities and persistent storage.

- `statefulset.yaml` – BusyBox StatefulSet with a PVC template
- `localpv.yaml` – Local PersistentVolume definition

### [Storage](./Storage/)
Persistent and ephemeral storage configurations.

- `localstorage-pv-pvc.yaml` – Local PersistentVolume + PersistentVolumeClaim
- `dynamicstorage.yaml` – Dynamic provisioning via StorageClass
- `ephermal-storage.yaml` – Ephemeral (emptyDir) storage example

### [Traffic Generator](./Trafficgenraror/)
A lightweight traffic-generation tool for load testing deployments.

- `Dockerfile` – Alpine image with `curl` installed
- `traffic-gen.sh` – Shell script that continuously sends HTTP requests to a configurable target URL at a set interval

---

## Key Concepts Covered

| Category | Topics |
|----------|--------|
| **Workloads** | Pods, Deployments, ReplicaSets, StatefulSets |
| **Networking** | ClusterIP, NodePort services, Network Policies |
| **Storage** | PersistentVolumes, PersistentVolumeClaims, Dynamic provisioning, Ephemeral storage |
| **Security** | RBAC (Roles, ClusterRoles, Bindings), ServiceAccounts, TLS certificates, Pod Security Standards |
| **Configuration** | ConfigMaps, Secrets |
| **Resource Management** | Namespaces, CPU/Memory limits |
| **Databases** | MongoDB on Kubernetes via StatefulSet |
| **Testing** | Traffic generation with curl |

---

## Getting Started

### Prerequisites
- A running Kubernetes cluster (e.g. [kind](https://kind.sigs.k8s.io/), [minikube](https://minikube.sigs.k8s.io/), or a cloud-managed cluster)
- `kubectl` configured to point at the cluster
- Docker (to build container images)

### Build the ColorApp image
```bash
cd ColorApp
docker build -t colorapp:latest .
```

### Deploy the ColorApp
```bash
kubectl apply -f ColorAppServices/colorappdeployment.yaml
kubectl apply -f ColorAppServices/colorappservice.yaml
```

### Run basic object examples
```bash
kubectl apply -f ObjectManagement/basicdeployment.yaml
```
