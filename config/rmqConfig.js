const config = {
  "vhosts": {
    "/": {
      "connection": {
        "hostname": "localhost",
        "user": "guest",
        "password": "guest",
        "port": 5672
      },
      "exchanges": [
        "shopify-exchange2"
      ]
    }
  },
  "publications": {
    "shopify-omuni": {
      "vhost": "/",
      "exchange": "shopify-exchange2"
    }
  }
}


export default { config }
