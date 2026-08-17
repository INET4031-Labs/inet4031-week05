# QA Report - Sprint 3

**Sprint:** 3 (Week 5)

**QA Lead:** [TODO: Add QA lead name]

**Report Date:** [TODO: Add date]

**Testing Period:** [TODO: Add start and end dates of Sprint 3]

## Executive Summary

TODO: Provide a brief summary of the testing results, including pass/fail status and any critical issues found.

## Test Coverage

### Test Suite 1: Helm and Prometheus Installation

- [ ] Helm installation successful
- [ ] Prometheus community repository added
- [ ] kube-prometheus-stack deployed without errors
- [ ] All monitoring pods reached Running state

**Result:** [TODO: PASS/FAIL]

**Notes:** 
TODO: Record any observations about the installation process, timeouts, or resource constraints.

### Test Suite 2: Prometheus Metric Collection (MANDATORY)

- [ ] Prometheus scraping pod metrics
- [ ] kubelet ServiceMonitor exists
- [ ] Prometheus query for `container_cpu_cfs_throttled_seconds_total` returns data
- [ ] At least one metric series returned

**Result:** [TODO: PASS/FAIL - THIS IS MANDATORY FOR WEEK 9]

**Metric Series Count:** [TODO: Number of series returned]

**Notes:**
TODO: If this test fails, record what was attempted to fix it (upgrade, reconfigure, etc.)

### Test Suite 3: Grafana Dashboard Creation

- [ ] Grafana accessible and login works
- [ ] Flask USE Dashboard created
- [ ] CPU Utilization panel created and displays data
- [ ] CPU Throttle Rate panel created and displays data
- [ ] HTTP 5xx Error Rate panel created and displays data

**Result:** [TODO: PASS/FAIL]

**Panels Verified:**
- [ ] Flask CPU Utilization: [TODO: Data visible Y/N]
- [ ] Flask CPU Throttle Rate: [TODO: Data visible Y/N]
- [ ] HTTP 5xx Error Rate: [TODO: Data visible Y/N]

**Notes:**
TODO: Record any issues with panel queries or metric availability.

### Test Suite 4: Grafana Alerts

- [ ] Error rate alert configured
- [ ] Alert threshold set correctly (> 1%)
- [ ] Alert duration set correctly (1 minute)
- [ ] Alert rule saved

**Result:** [TODO: PASS/FAIL]

**Notes:**
TODO: Record alert configuration details and any issues encountered.

### Test Suite 5: k6 Load Testing

- [ ] k6 installed successfully
- [ ] smoke-test.js created and formatted correctly
- [ ] Load test runs without errors
- [ ] Grafana metrics respond to load test activity

**Result:** [TODO: PASS/FAIL]

**Test Parameters:**
- Virtual users: [TODO: Record vus value]
- Duration: [TODO: Record duration]
- Requests per user: [TODO: Estimate]

**Metrics Observed:**
- CPU utilization increased: Yes/No
- Memory utilization increased: Yes/No
- Network activity increased: Yes/No
- HTTP requests recorded: Yes/No

**Notes:**
TODO: Document metrics observed during load test and any anomalies.

### Test Suite 6: Validation Scripts

- [ ] check-week5.sh exists and is executable
- [ ] All validation checks pass
- [ ] Exit code is 0
- [ ] Script output is clear and actionable

**Result:** [TODO: PASS/FAIL]

**Validation Results:**
- [ ] All monitoring pods running: PASS/FAIL
- [ ] kubelet ServiceMonitor exists: PASS/FAIL
- [ ] container_cpu_cfs_throttled_seconds_total returns data: PASS/FAIL

**Notes:**
TODO: Record any validation failures and corrective actions taken.

## Issues Found

### Issue 1: [TODO: Add issue title]

**Severity:** [Critical/High/Medium/Low]

**Description:** 
TODO: Describe the issue, including when it was detected and under what conditions.

**Impact:** 
TODO: How does this issue affect the lab requirements and Week 9 dependency?

**Root Cause:** 
TODO: What caused the issue?

**Resolution:** 
TODO: How was it fixed or what action items remain?

**Status:** [Open/Closed]

### Issue 2: [TODO: Add if needed]

[Repeat issue template above]

## Cross-Week Dependency Verification

**Week 9 CPU Throttling Diagnosis Dependency:**

- [ ] Prometheus is scraping kubelet metrics
- [ ] Query for `rate(container_cpu_cfs_throttled_seconds_total[5m])` returns data
- [ ] Metric series is non-empty and consistent
- [ ] No manual fixes required; this will persist across restarts

**Status:** [VERIFIED/NOT VERIFIED]

**Notes:** 
TODO: Confirm that the Week 5 configuration will support Week 9's CPU diagnosis lab. If any issues, document them here.

## Test Artifacts

### Logs Captured

TODO: Document location of test logs and output files:

```
Helm install logs: [TODO: Location or note "not captured"]
Prometheus startup logs: kubectl logs -n monitoring [pod-name]
Grafana access logs: [TODO: Not typically captured]
k6 test output: [TODO: Save console output]
Validation script output: [TODO: Save output]
```

### Screenshots Captured

- [ ] Helm installation complete
- [ ] All monitoring pods running
- [ ] Prometheus query result for throttling metric
- [ ] Flask USE Dashboard
- [ ] Grafana alert configuration
- [ ] k6 load test output
- [ ] Validation script passing

Location: Team Google Doc "Week 5 Screenshots" section

## Recommendations

TODO: Provide recommendations for the team going forward:

1. [TODO: First recommendation - e.g., "Monitor disk growth if adding more custom dashboards"]
2. [TODO: Second recommendation]
3. [TODO: Third recommendation - extend section if needed]

## Sign-Off

QA Lead: [TODO: Name]

Date Completed: [TODO: Date]

Overall Result: [ ] PASS [ ] FAIL

Approval for Week 6 Handoff: [ ] Yes [ ] No

Additional QA Notes:

TODO: Any final observations or concerns for the next sprint.
