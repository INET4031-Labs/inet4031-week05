## Week 5: Observability and Monitoring

**Sprint 3 Kickoff | Synchronous**

### Overview

In this lab, you deploy the kube-prometheus-stack using Helm into your k3d cluster, configure Prometheus to scrape container metrics from cAdvisor and kubelet, and build Grafana dashboards that surface the USE method (Utilization, Saturation, Errors) for your application stack. After completing this lab, you will have a working observability stack producing real metrics from your application, with Prometheus confirmed to scrape the specific metric (`container_cpu_cfs_throttled_seconds_total`) that Week 9 depends on for CPU throttling diagnosis.

> **Cross-week dependency (mandatory):** This lab has a specific metric verification step that must pass before Week 9 can work. Do not skip Validation Check 3.

### Learning Objectives

- Deploy kube-prometheus-stack using Helm into a Kubernetes namespace
- Verify Prometheus is scraping cAdvisor and kubelet metrics (not just node_exporter)
- Build Grafana dashboards using the USE method for CPU, memory, and network
- Configure a Grafana alert on error rate
- Interpret metric output to distinguish utilization from saturation

### Prerequisites

- Week 4 complete: k3d cluster running, application deployed, OpenTofu managing Kubernetes resources
- `helm` available in the container (installed in this lab)

### Sprint Review: Sprint 2

**Step 1.** Open the sprint board. Move all Sprint 2 items to Done. For incomplete items, add a one-line note on what remains.

**Step 2.** Sprint retrospective (whole group, record in Google Doc under "Sprint 2 Close"):
- What worked well this sprint?
- What slowed the team down?
- What one practice change would you make in Sprint 3?

**Step 3.** Environment checkpoint.

```bash
k3d cluster list
kubectl get nodes
kubectl get pods
git log --oneline -5
```

Paste output into Google Doc under "Sprint 3 Kickoff -- Environment State."

**Step 4.** Assign Sprint 3 roles and open Sprint 3 issues on the board.

---

### Part 1: Install Helm and Deploy kube-prometheus-stack

> **Background:** kube-prometheus-stack is a Helm chart that bundles Prometheus, Grafana, Alertmanager, and a set of pre-built dashboards into a single deployable package. Helm is a package manager for Kubernetes that templates and packages Kubernetes manifests so they can be installed with a single command.

**Step 1.** Install Helm inside the team container.

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

Verify:

```bash
helm version
```

Expected: output beginning with `version.BuildInfo{Version:"v3.x.x"`.

**Step 2.** Add the Prometheus community Helm chart repository.

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

Expected: `Update Complete. Happy Helming!`

**Step 3.** Create a namespace for the monitoring stack.

```bash
kubectl create namespace monitoring
```

**Step 4.** Create `week-5/prometheus-values.yaml`. This configuration enables cAdvisor and kubelet scraping explicitly. This is what makes Week 9's CPU throttling diagnosis work.

```yaml
prometheus:
  prometheusSpec:
    serviceMonitorSelectorNilUsesHelmValues: false

kubelet:
  enabled: true
  serviceMonitor:
    https: true

grafana:
  adminPassword: "changethis"
  service:
    type: NodePort
    nodePort: 30080

alertmanager:
  enabled: true
```

**Step 5.** Deploy the kube-prometheus-stack.

```bash
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  -f week-5/prometheus-values.yaml
```

This takes two to three minutes.

**Step 6.** Watch the pods come up.

```bash
kubectl get pods -n monitoring --watch
```

Wait until all pods show `Running` or `Completed`. Press `Ctrl+C` when stable.

---

### Part 2: Verify cAdvisor/kubelet Metrics Are Available

> **This step is mandatory.** Week 9's CPU throttling diagnosis queries `rate(container_cpu_cfs_throttled_seconds_total[5m])`. If Prometheus is not scraping kubelet metrics, this query returns no data and Week 9 fails. Complete this verification before moving on.

**Step 7.** Port-forward Prometheus to your local port.

```bash
kubectl port-forward -n monitoring svc/kube-prometheus-stack-prometheus 9090:9090 &
```

**Step 8.** Query Prometheus for the throttling metric.

```bash
curl -s 'http://localhost:9090/api/v1/query?query=container_cpu_cfs_throttled_seconds_total' \
  | python3 -c "import json,sys; d=json.load(sys.stdin); r=d['data']['result']; print(f'PASS -- {len(r)} series found') if r else print('FAIL -- no data returned')"
```

Expected: `PASS -- N series found` where N is greater than zero.

If you see `FAIL`: Prometheus is not scraping kubelet. The most common cause is that the kubelet ServiceMonitor was not created. Verify:

```bash
kubectl get servicemonitor -n monitoring
```

You should see a row for `kube-prometheus-stack-kubelet`. If it is missing, run:

```bash
helm upgrade kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  -f week-5/prometheus-values.yaml
```

Wait two minutes and re-run Step 8.

**Screenshot required:** Add a screenshot showing the Prometheus query returning data for `container_cpu_cfs_throttled_seconds_total` to your Google Doc. Label it "Week 5 -- Week 9 Dependency Verified."

**Step 9.** Stop the port-forward.

```bash
kill %1
```

---

### Part 3: Grafana Dashboards and the USE Method

> **Background:** The USE method (Utilization, Saturation, Errors) is a structured approach to performance diagnosis. For every resource: check utilization (how busy is it?), saturation (is work queuing?), and errors (are there failures?). This prevents teams from chasing symptoms before diagnosing root cause.

**Step 10.** Port-forward Grafana.

```bash
kubectl port-forward -n monitoring svc/kube-prometheus-stack-grafana 3000:80 &
```

**Step 11.** Open Grafana in a browser at `http://localhost:3000`. Log in with username `admin` and the password from your values file.

**Step 12.** Navigate to Dashboards. Find and open the "Kubernetes / Compute Resources / Pod" dashboard. Explore the pre-built panels.

**Discussion (add to Google Doc):** Find a panel in the pre-built dashboard that represents each USE signal. Which panel shows CPU utilization? Which shows memory saturation? What does "errors" mean for a container metric?

**Step 13.** Build a custom USE dashboard for the Flask service. Navigate to Dashboards > New > Add visualization.

Add three panels:

**Panel 1 -- CPU Utilization:**
```
rate(container_cpu_usage_seconds_total{container="flask"}[5m])
```
Title: `Flask CPU Utilization`

**Panel 2 -- CPU Saturation (throttling):**
```
rate(container_cpu_cfs_throttled_seconds_total{container="flask"}[5m])
```
Title: `Flask CPU Throttle Rate`

**Panel 3 -- HTTP Error Rate:**
```
sum(rate(nginx_http_requests_total{status=~"5.."}[5m])) / sum(rate(nginx_http_requests_total[5m]))
```
Title: `HTTP 5xx Error Rate`

Save the dashboard as "Flask USE Dashboard."

**Step 14.** Configure a Grafana alert on the HTTP error rate panel. Set the alert to fire when the error rate exceeds 1% for one minute.

---

### Part 4: Generate Load and Observe

**Step 15.** Install k6 inside the team container.

```bash
curl https://github.com/grafana/k6/releases/download/v0.47.0/k6-v0.47.0-linux-amd64.tar.gz -Lo /tmp/k6.tar.gz
tar -xzf /tmp/k6.tar.gz -C /tmp
mv /tmp/k6-v0.47.0-linux-amd64/k6 /usr/local/bin/k6
rm /tmp/k6.tar.gz
```

**Step 16.** Create `week-5/smoke-test.js`.

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '1m',
};

export default function () {
  http.get('http://localhost:8080/incidents');
  sleep(1);
}
```

**Step 17.** Run the smoke test while watching Grafana.

```bash
k6 run week-5/smoke-test.js
```

Watch your Grafana Flask USE Dashboard while k6 runs. You should see activity in the CPU utilization panel.

**Step 18.** Stop the port-forward.

```bash
kill %1
```

---

### Storage Check

```bash
df -h
docker system df
kubectl top pods -n monitoring
```

Record all three outputs in your Google Doc under "Week 5 Storage Check."

---

### Validation Checks

#### Validation Check: All Monitoring Pods Running

```bash
kubectl get pods -n monitoring
```

Expected: all pods in `Running` or `Completed` state.

#### Validation Check: kubelet ServiceMonitor Exists

```bash
kubectl get servicemonitor -n monitoring | grep kubelet
```

Expected: at least one row containing `kubelet`.

#### Validation Check: container_cpu_cfs_throttled_seconds_total Returns Data (MANDATORY)

```bash
curl -s 'http://localhost:9090/api/v1/query?query=container_cpu_cfs_throttled_seconds_total' \
  | python3 -c "import json,sys; d=json.load(sys.stdin); print('PASS') if d['data']['result'] else print('FAIL')"
```

Expected output: `PASS`

If you see `FAIL`: Week 9's CPU throttling diagnosis will not work. Fix kubelet scraping before submitting.

#### Validation Check: Check Script Passes

```bash
./scripts/check-week5.sh
```

---

### Deliverables

- `week-5/prometheus-values.yaml` committed (with kubelet scraping enabled)
- `week-5/smoke-test.js` committed
- Grafana "Flask USE Dashboard" screenshot in Google Doc
- Screenshot of `container_cpu_cfs_throttled_seconds_total` returning data from Prometheus (labeled "Week 9 Dependency Verified")
- `./scripts/check-week5.sh` runs clean

**Screenshot requirements:**

- **Screenshot 1:** All monitoring pods in `Running` state
- **Screenshot 2:** Prometheus query returning data for `container_cpu_cfs_throttled_seconds_total` (MANDATORY)
- **Screenshot 3:** Flask USE Dashboard in Grafana with at least one panel showing data
- **Screenshot 4:** `./scripts/check-week5.sh` passing

---

### Reflection Questions (Answer in Google Doc)

1. The USE method asks you to examine Utilization, Saturation, and Errors for each resource. Walk through all three for your Flask container using what you saw in Grafana during the smoke test. Be specific about which metric represents each category.
2. This lab required Prometheus to scrape cAdvisor and kubelet, not just node_exporter. What does node_exporter provide that kubelet/cAdvisor does not, and vice versa?
3. Grafana shows historical metric data. What would a production team do when an alert fires at 3am on a metric they have never analyzed before? What would they look at first?
4. kube-prometheus-stack was deployed with Helm. What is the difference between `helm install` and `kubectl apply -f`? Why would a team choose Helm for this use case?
5. (Extend) Your Grafana alert fires after one minute above threshold. What are the risks of setting the alert threshold too low? Too high?

---

### Sprint Backlog: Preparing for Week 6

Week 6 is asynchronous. Before leaving, the Scrum Master ensures the following tickets are open:

- Write GitHub Actions CI pipeline for Docker build and push
- Write scheduled workflow (cron syntax)
- Configure branch protection with CI as required check
- Trigger a deliberate CI failure and observe merge block
- Update Google Doc with Week 6 reflections and storage check

---

---

