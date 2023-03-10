const PinataAPIKey = "638a1b8c7f96760c305b"
const PinataAPISecret = "1bbbebc24331818d65565aca64d2a74377d5bea1b8024471a95fe5de97d96df4"
const PinataAPIJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\n" +
    "eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0NjJlNWYxMi00NjNmLTQwNjgtYWVlNC0zZGNjMmE4MGE5OWMiLCJlbWFpbCI6InByb2N0b3BhdDExMjgxOEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYzk4YjZiNzRiZjM1MzBkOTMwN2QiLCJzY29wZWRLZXlTZWNyZXQiOiI4YjEwMjYxZWJlZGFlMzZkNzljYmExMmY4NWFhMDQwMTdlOWNkZDZhYTAwMzkxNGI1YjBkNjQwZWFiZTE2OTZhIiwiaWF0IjoxNjc1ODE5NjIyfQ.ZILtKLZ23QmYQoef-9NT3m8-LXbHgJEVIsy--hs_ORI"
const PinataGateWay="https://firedao.mypinata.cloud/ipfs"
const PinataToken = "pinataGatewayToken=56JDDIrkxPZKrpQ9Bw6ToqJuSz_qcSIr5m48sLAlRDEcxkAIiUrlvl3MemfWshTm"
const ethScan = "https://goerli-rollup-explorer.arbitrum.io/"
const openSeaNFT = "https://testnets.opensea.io/zh-CN/collection/fireseed-3"
export default {
    Name:"Arbitrum Goerli Testnet",
    ENV: "testproduction",
    chainId:421613,
    webside:"http://apptest.firedao.co",
    forum: "http://forumtest.firedao.co",
    graphUrl:"https://api.thegraph.com/subgraphs/name/henry-maker-commits/hu-zhao-she-qu-ce-shi-ban",
    PinataAPIKey,
    PinataAPISecret,
    PinataAPIJWT,
    ethScan,
    PinataGateWay,
    PinataToken,
    openSeaNFT
}
