const LOCAL_BASE_URL = "http://localhost:1337";

export const AUTH_TOKEN =
  "f39515056e91e790b3729b6633723dbef4d34dc1094464e1cf0204c1b4b2e62389d56e80155c5c4f0cf79a248c3c431ffff11febc2a39cab6674c8cee30d8ebe75edf58e5b3eeecf536485e98efab565819532936862fe1e8cad5946dd2b28dafcbd8bbc43e4e7476381aba402b0ba4f8b7d923ab84bdd3c9759ff2c4e2d6986";

export const LOCAL_API_ENDPOINTS = {
  product_master_txn: `${LOCAL_BASE_URL}/api/master-transactions`,
  pq_txn: `${LOCAL_BASE_URL}/api/pq-transactions`,
  wip_txn: `${LOCAL_BASE_URL}/api/wip-transactions`,
};
