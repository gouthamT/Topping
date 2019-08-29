export default {
  "name": "Sample WebApp",
  "children": [
    {
      "name": "Api Gateway",
      "children": [{
        "name": "Micro Service *"
      }, {
        "name": "Micro Service *"
      }, {
        "name": "Micro Service *",
        "children": [{
          "name": "Mongo Db*"
        }]
      }, {
        "name": "Micro Service *"
      }]
    }]
}