import {fetchQuery} from "./index";

export function getPidList(amount, skip) {
    return fetchQuery("firepportmain",{
        text: `{
                  registers (first:${amount} ,orderBy: pid,orderDirection: desc ,skip:${skip} ) {
                    id
                    pid
                    account
                    email
                   username
                   information  
                  }
        }`
    }, "")
}

export function getPidCount(amount) {
    return fetchQuery("firepportmain",{

        text: `{
                  registers (first:1 orderBy:pid orderDirection:desc) {
                    pid
                  }
        }`
    }, "")
}

export function getSearchData(searchData, web3) {
    let isAddress = web3.utils.isAddress(searchData);
    if (isAddress) {
        return fetchQuery("firepportmain",{
            text: `{
                  registers (first:1 where:{account:"${searchData}"} ) {
                            id
                    pid
                    account
                    email
                   username
                   information  
                  }
            }`
        }, "")
    } else {
        return fetchQuery("firepportmain",{
            text: `{
                  registers (first:1 where:{pid:${searchData}} ) {
                           id
                    pid
                    account
                    email
                   username
                   information  
                  }
            }`
        }, "")
    }

}
