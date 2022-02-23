import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "1m30s", target: 10 },
    { duration: "20s", target: 0 },
  ],

  thresholds: {
    http_req_duration: ["p(90)<3000"], // 90% of requests must complete below 3s
  },
};

export default function () {
  const res = http.get(`https://${__ENV.HOSTNAME}`);
  check(res, {
    "Homepage loaded": (r) =>
      r.body.includes(
        "Generacija potpuno održivog i povezanog javnog prostora"
      ),
  });
  sleep(1);
}
