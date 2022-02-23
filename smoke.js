import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1, // 1 user looping for 1 minute
  duration: "1m",

  thresholds: {
    http_req_duration: ["p(99)<3000"], // 99% of requests must complete below 3s
  },
};

export default function () {
  http.get("http://test.k6.io");
  sleep(1);
}
