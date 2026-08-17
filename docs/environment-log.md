# Environment Log - Week 5

**Date:** [TODO: Add date]

**Team:** [TODO: Add team name]

## Baseline State (Start of Sprint 3)

Record the state of your environment at the start of Sprint 3:

```
k3d cluster list:
[TODO: Paste output]

kubectl get nodes:
[TODO: Paste output]

kubectl get pods -A:
[TODO: Paste output]

df -h:
[TODO: Paste output]

docker system df:
[TODO: Paste output]
```

## Changes Made During Sprint 3

### Helm Installation
- Helm version installed: [TODO: Record version]
- Date installed: [TODO: Record date]

### kube-prometheus-stack Deployment
- Deployment date: [TODO: Record date]
- Chart version: [TODO: Record version if available]
- Namespace: `monitoring`
- Custom values applied: Yes (prometheus-values.yaml)

### Grafana Configuration
- Admin password set: [TODO: Confirm]
- Service type: NodePort
- Service port: 30080
- Dashboards created: [TODO: List custom dashboards]

### k6 Installation
- k6 version installed: [TODO: Record version]
- Date installed: [TODO: Record date]
- Load tests executed: [TODO: Document tests run and dates]

## Issues Encountered

TODO: Document any issues that arose during deployment, configuration, or testing.

### Issue 1: [TODO: Add issue title]
- Symptom: [TODO: What went wrong]
- Root cause: [TODO: Why it happened]
- Fix applied: [TODO: How it was resolved]
- Date resolved: [TODO: When]

## Final State (End of Sprint 3)

Record the state of your environment at the end of Sprint 3:

```
kubectl get pods -n monitoring:
[TODO: Paste output]

kubectl get servicemonitor -n monitoring:
[TODO: Paste output]

Prometheus query test (container_cpu_cfs_throttled_seconds_total):
[TODO: Paste pass/fail result]

df -h:
[TODO: Paste output]

docker system df:
[TODO: Paste output]
```

## Storage Growth Analysis

Document the storage impact of deploying the monitoring stack:

- Disk space used by k3s images: [TODO: Estimate or measure]
- Disk space used by monitoring pods: [TODO: Estimate or measure]
- Growth from Week 4 to Week 5: [TODO: Calculate difference]

## Next Steps

TODO: Note any configuration or troubleshooting tasks to carry forward to Week 6.
