# Acceptance Criteria - Week 5

**Sprint 3 | Observability and Monitoring**

This document defines the acceptance criteria that must be met for Week 5 deliverables to be considered complete. QA uses this checklist to verify that all requirements have been satisfied.

## Deliverable 1: Prometheus Stack Deployment

### Criteria

- [ ] Helm is installed and `helm version` returns a version number
- [ ] Prometheus community Helm repository is added (`helm repo list` shows it)
- [ ] `monitoring` namespace exists (`kubectl get ns` shows it)
- [ ] `week-5/prometheus-values.yaml` file exists in the repository
- [ ] All monitoring pods are running: `kubectl get pods -n monitoring` shows no Failed or Pending pods
- [ ] Prometheus ServiceMonitor for kubelet exists: `kubectl get servicemonitor -n monitoring` includes a kubelet entry

### Evidence Required

TODO: QA should paste the following outputs as evidence:

```
kubectl get pods -n monitoring:
[TODO: Paste full output]

kubectl get servicemonitor -n monitoring:
[TODO: Paste full output]
```

## Deliverable 2: cAdvisor/Kubelet Metrics Verification (MANDATORY)

### Criteria

- [ ] Prometheus query for `container_cpu_cfs_throttled_seconds_total` returns data (PASS result)
- [ ] This query must return data for Week 9 CPU throttling diagnosis to work
- [ ] Screenshot of the Prometheus query result is added to the Google Doc

### Evidence Required

TODO: QA should verify the query passes and paste the result:

```
Query result:
[TODO: Paste PASS/FAIL output]

Metric count (if PASS):
[TODO: Number of series returned]
```

## Deliverable 3: k6 Load Testing Script

### Criteria

- [ ] `week-5/smoke-test.js` file exists in the repository
- [ ] Script follows k6 syntax and imports http and sleep from k6 modules
- [ ] Script defines options.vus (virtual users)
- [ ] Script defines options.duration (test duration)
- [ ] Script includes at least one HTTP GET request to the application

### Evidence Required

TODO: QA should review smoke-test.js and confirm:

```
Virtual users (vus): [TODO: Record value]
Duration: [TODO: Record value]
Target endpoint: [TODO: Record endpoint URL]
```

## Deliverable 4: Grafana Dashboards

### Criteria

- [ ] Grafana is accessible at `http://localhost:3000` (with port-forward)
- [ ] Login succeeds with admin credentials from prometheus-values.yaml
- [ ] "Flask USE Dashboard" exists in Dashboards list
- [ ] Dashboard contains three panels:
  - [ ] Panel 1: Flask CPU Utilization (metric: `rate(container_cpu_usage_seconds_total{container="flask"}[5m])`)
  - [ ] Panel 2: Flask CPU Throttle Rate (metric: `rate(container_cpu_cfs_throttled_seconds_total{container="flask"}[5m])`)
  - [ ] Panel 3: HTTP 5xx Error Rate (metric: sum of 5xx requests)
- [ ] At least one panel displays data (not empty)
- [ ] Screenshot of Flask USE Dashboard is added to Google Doc

### Evidence Required

TODO: QA should capture and verify:

```
Grafana username: admin
Grafana password: [TODO: Confirm from values file]
Dashboard name: Flask USE Dashboard
Panels visible: [TODO: Confirm all three]
Panel with data: [TODO: Note which panels show data]
```

## Deliverable 5: Grafana Alerts

### Criteria

- [ ] HTTP error rate alert is configured on the Flask USE Dashboard
- [ ] Alert threshold is set to fire at error rate > 1%
- [ ] Alert duration is set to fire after 1 minute of threshold breach
- [ ] Alert rule is saved and displayed in Grafana

### Evidence Required

TODO: QA should verify alert configuration:

```
Alert name: [TODO: Record alert name]
Threshold: [TODO: Confirm 1% or >0.01]
Duration: [TODO: Confirm 1 minute]
Alert rule exists: Yes/No
```

## Deliverable 6: Validation Script

### Criteria

- [ ] `./scripts/check-week5.sh` file exists and is executable
- [ ] Script runs without errors: exit code is 0
- [ ] Script output shows all validation checks passing
- [ ] Script output can be reproduced reliably

### Evidence Required

TODO: QA should run and record:

```
bash ./scripts/check-week5.sh

Output:
[TODO: Paste full script output]

Exit code: [TODO: Record 0 for success]
```

## Deliverable 7: Repository State

### Criteria

- [ ] All files committed to git: `week-5/prometheus-values.yaml`, `week-5/smoke-test.js`, `scripts/check-week5.sh`
- [ ] No uncommitted changes: `git status` shows clean working directory
- [ ] Commits have clear messages describing changes

### Evidence Required

TODO: QA should verify:

```
git status:
[TODO: Paste output]

git log --oneline -5:
[TODO: Paste last 5 commits]
```

## Deliverable 8: Google Doc Screenshots

### Criteria

- [ ] Screenshot 1: All monitoring pods in Running state
- [ ] Screenshot 2: Prometheus query returning data for `container_cpu_cfs_throttled_seconds_total` (MANDATORY)
- [ ] Screenshot 3: Flask USE Dashboard with at least one panel showing data
- [ ] Screenshot 4: `./scripts/check-week5.sh` passing

All screenshots added to team Google Doc under "Week 5 Screenshots."

## Deliverable 9: Reflection Questions

### Criteria

- [ ] All five reflection questions answered in Google Doc
- [ ] Answers reference specific metrics observed during testing
- [ ] Answers demonstrate understanding of USE method and observability concepts

### Evidence Required

TODO: QA should confirm in Google Doc:

- [ ] Question 1 answered with specific CPU utilization, saturation, and error metrics
- [ ] Question 2 answered with distinction between node_exporter, kubelet, and cAdvisor
- [ ] Question 3 answered with troubleshooting approach for unknown metrics
- [ ] Question 4 answered with difference between Helm and kubectl apply
- [ ] Question 5 answered with alert threshold risks (if attempted)

## Sign-Off

QA Lead: [TODO: Name]

Date: [TODO: Date]

All criteria verified: [ ] Yes [ ] No

Notes for team:

TODO: QA should add any additional notes or issues found during verification.
