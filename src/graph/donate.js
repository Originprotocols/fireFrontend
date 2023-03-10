import {fetchQuery} from "./index";

export function getDonateRecord() {
    return fetchQuery("ogpoolkk", {
        text: `{
              allRecords(first: 1000) {
                id
                no
                pid
                name
                addr
                ethAmount
                usdtAmount
                rate
                fdtAmount
                time
              }
        }`
    }, "")
}
