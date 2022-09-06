import ajax from "superagent";
const url = "http://localhost:8000";

export default class MongoDbApi {
  static getItems() {
    return ajax.get(`${url}/items`).then((res) => res.body);
  }

  static addItem(item) {
    return ajax
      .post(`${url}/items`)
      .send(item)
      .then((res) => res.body);
  }

  static updateItemCount(item, count) {
    const newCount = item.count - count;

    return newCount >= 0
      ? ajax
        .put(`${url}/items`)
        .send({ ...item, count: newCount })
          .then((res) => res.body)
      : false;
  }

  static deleteItem(item) {
    return ajax
      .delete(`${url}/items`)
      .send(item)
      .then((res) => res.body);
  }
}
