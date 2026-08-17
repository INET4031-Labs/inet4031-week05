import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // TODO: Adjust virtual users (vus) to increase or decrease load intensity
  // Higher vus means more concurrent users; start with 5 for baseline testing
  vus: 5,

  // TODO: Adjust duration to run the test longer or shorter
  // Format: '1m' for 1 minute, '30s' for 30 seconds, '2m' for 2 minutes
  duration: '1m',
};

export default function () {
  // TODO: Verify this endpoint path matches your Flask application
  // The endpoint should return a list of incidents or similar application data
  http.get('http://localhost:8080/incidents');

  // TODO: Adjust sleep duration to change request frequency
  // sleep(1) means wait 1 second between each request per virtual user
  sleep(1);
}
