# Week 5: Observability and Monitoring

**Sprint 3 Kickoff**

## Overview

In this lab, you deploy Prometheus using Helm into your k3d cluster, configure Prometheus to scrape container metrics from cAdvisor, and query Prometheus from the command line to surface the USE method (Utilization, Saturation, Errors) for your application stack.

**This lab has a mandatory metric-verification step.** Week 9's entire CPU-throttling diagnosis depends on Prometheus correctly scraping a specific metric this week. The exact metric name and the verification query are in the Wiki, follow them exactly, don't rely on paraphrased versions from anywhere else.

## Learning Objectives

- Deploy Prometheus using Helm into a Kubernetes namespace
- Verify Prometheus is scraping cAdvisor container metrics
- Query Prometheus from the command line using the USE method for CPU, memory, and network
- Configure a Prometheus alerting rule on error rate
- Interpret metric output to distinguish utilization from saturation

## Prerequisites

- Week 4 complete: k3d cluster running, application deployed
- `helm` and `k6` installed on your team's VM
- Your team's Prometheus port (9090 plus your team number, e.g. 9093 for Team 3). See the Team Port Assignments table in the Wiki.

## Pulling This Week's Starter Content Into Your Team Repo

This repo (`inet4031-week05`) is instructor-provided starter/reference content for
Week 5, not something you clone standalone. Pull the pieces you need into your
team's single repo:

```bash
git clone https://github.com/INET4031-Labs/inet4031-week05.git temp-week05
rm -rf temp-week05/.git
mkdir -p week-5
mv temp-week05/prometheus-values.yaml temp-week05/pq.sh week-5/
cp -r temp-week05/docs/. docs/
cp temp-week05/scripts/check-week5.sh scripts/
rm -rf temp-week05
```

`prometheus-values.yaml` is the Helm values file for Prometheus, and `pq.sh` is a
small helper script for querying Prometheus from the command line. You create
`week-5/smoke-test.js` yourself during the lab.

## Role Distribution

- **Scrum Master:** facilitates the Sprint 2 review, keeps board current
- **System Admin:** deploys Prometheus with Helm, configures the alert rule
- **QA:** verifies the mandatory metric-verification step and all USE query results before sign-off
- **Developers:** instrument Flask, run the USE queries, write and run the k6 smoke test

## Deliverables

- `week-5/prometheus-values.yaml` committed (with cAdvisor scraping enabled and the `HTTP5xxErrorRateHigh` alert rule)
- `week-5/smoke-test.js` committed
- Screenshot of the three Flask USE queries' output in Google Doc
- Screenshot confirming the Week 9 dependency metric returns data (labeled "Week 9 Dependency Verified")
- `./scripts/check-week5.sh` runs clean

## Full Instructions

The complete step-by-step lab, including the exact metric name, PromQL queries, and alert rule configuration, is in this repo's Wiki tab. This README is a reference, not a substitute.
