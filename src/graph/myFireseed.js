import {fetchQuery} from "./index";

export function getPasslist() {
    return fetchQuery("firepportmain",{
        text: `{
                  passFireSeeds (first: 5) {
                    id
                    from
                    to
                    tokenId
                    amount
                    transferTime
                  }
        }`
    }, "")
}
