import {fetchQuery} from "./index";

export function getPasslist() {
    return fetchQuery("arbogshequceshiban",{
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
