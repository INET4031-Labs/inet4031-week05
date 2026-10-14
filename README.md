# Week 5: Observability and Monitoring

**Sprint 3 Kickoff**

## Overview

In this lab, you deploy the kube-prometheus-stack using Helm into your k3d cluster, configure Prometheus to scrape container metrics from cAdvisor and kubelet, and build Grafana dashboards that surface the USE method (Utilization, Saturation, Errors) for your application stack.

**This lab has a mandatory metric-verification step.** Week 9's entire CPU-throttling diagnosis depends on Prometheus correctly scraping a specific metric this week. The exact metric name and the verification query are in the Wiki, follow them exactly, don't rely on paraphrased versions from anywhere else.

## Learning Objectives

- Deploy kube-prometheus-stack using Helm into a Kubernetes namespace
- Verify Prometheus is scraping cAdvisor and kubelet metrics (not just node_exporter)
- Build Grafana dashboards using the USE method for CPU, memory, and network
- Configure a Grafana alert on error rate
- Interpret metric output to distinguish utilization from saturation

## Prerequisites

- Week 4 complete: k3d cluster running, application deployed, OpenTofu managing Kubernetes resources
- `helm` available in the container (installed in this lab)

## Pulling This Week's Starter Content Into Your Team Repo

This repo (`inet4031-week05`) is instructor-provided starter/reference content for
Week 5, not something you clone standalone. Pull the pieces you need into your
team's single repo:

```bash
git remote add week5 https://github.com/INET4031-Labs/inet4031-week05.git
git fetch week5
git checkout week5/main -- prometheus-values.yaml smoke-test.js scripts docs
mkdir -p week-5
mv prometheus-values.yaml smoke-test.js week-5/
git remote remove week5
```

Do this before you start editing `week-5/` locally, or your local changes will be
silently overwritten by the checkout.

## Role Distribution

- **Scrum Master:** facilitates the Sprint 2 review, keeps board current
- **System Admin:** installs Helm, configures the alert rule
- **QA:** verifies the mandatory metric-verification step and all dashboard panels before sign-off
- **Developers:** build the Grafana dashboard, write and run the k6 smoke test

## Deliverables

- `week-5/prometheus-values.yaml` committed (with kubelet scraping enabled)
- `week-5/smoke-test.js` committed
- Grafana "Flask USE Dashboard" screenshot in Google Doc
- Screenshot confirming the Week 9 dependency metric returns data (labeled "Week 9 Dependency Verified")
- `./scripts/check-week5.sh` runs clean

## Full Instructions

The complete step-by-step lab, including the exact metric name, PromQL queries, and dashboard panel configuration, is in this repo's Wiki tab. This README is a reference, not a substitute.
