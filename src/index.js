import { normalize, denormalize, schema } from "normalizr";

const response = [
  {
    item_id: 18901,
    item_uuid: 12,
    pictures_uri: [
      "/shoe/picture/1/top_xxx.jpg",
      "/shoe/picture/1/1_xxx.jpg",
      "/shoe/picture/1/2_xxx.jpg"
    ]
  },
  {
    item_id: 18902,
    item_uuid: 13,
    pictures_uri: [
      "/shoe/picture/1/top_xxx.jpg",
      "/shoe/picture/1/1_xxx.jpg",
      "/shoe/picture/1/2_xxx.jpg"
    ]
  }
];

const pictureSchema = new schema.Entity(
  "pictures",
  {},
  {
    processStrategy: value => {
      return value.pictures;
    }
  }
);
const itemSchema = new schema.Entity(
  "items",
  { pictures_uri: pictureSchema },
  {
    idAttribute: "item_id",
    processStrategy: value => {
      console.log(value);
      return {
        ...value,
        pictures_uri: { id: value.item_id, pictures: value.pictures_uri }
      };
    }
  }
);

const normalizeData = normalize(response, [itemSchema]);
console.log("===== 正規化したデータ =====");
console.log(normalizeData);

const denormalizedData = denormalize(
  normalizeData.result,
  [itemSchema],
  normalizeData.entities
);
console.log("===== 非正規化したデータ =====");
console.log(denormalizedData);
