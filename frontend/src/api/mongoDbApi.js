import ajax from "superagent";
const url = "http://localhost:8000";

export default class MongoDbApi{
  static getItems() {
    return ajax.get(`${url}/items`).then(res => res.body);
  }

  static addItem(item) {
    return ajax.post(`${url}/items`).send(item).then(res => res.body);
  }

  static updateItemCount(item, count) {
    return ajax.put(`${url}/items`).send(item).then(res => res.body);
  }

  static deleteItem(item) {
    return ajax.delete(`${url}/items`).send(item).then(res => res.body);
  }

}