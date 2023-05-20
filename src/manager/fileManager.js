import fs from 'fs';
import Product from '../models/product';

class FileManager {
  constructor(path) {
    this.path = path;
  }

  read = () => {
    if (fs.existsSync(this.path)) {
      return fs.promises
        .readFile(this.path, 'utf-8')
        .then((r) => JSON.parse(r));
    }
    return [];
  };

  getNextId = (list) => {
    const count = list.length;
    return count > 0 ? list[count - 1].id + 1 : 1;
  };

  write = (list) => {
    return fs.promises.writeFile(this.path, JSON.stringify(list));
  };

  get = async () => {
    const data = await this.read();
    return data;
  };

  add = async (obj) => {
    const list = await this.read();
    const nextId = this.getNextId(list);
    obj.id = nextId;
  
    const product = new Product(
      obj.id,
      obj.title,
      obj.description,
      obj.code,
      obj.price,
      obj.status,
      obj.stock,
      obj.category,
      obj.thumbnails
    );
  
    list.push(product);
  
    await this.write(list);
  
    return product;
  };

  update = async (id, obj) => {
    obj.id = id;
    const list = await this.read();

    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i] = obj;
        break;
      }
    }

    await this.write(list);
  };

  updateIdx = async (id, obj) => {
    obj.id = id;
    const list = await this.read();

    const idx = list.findIndex((e) => e.id === id);
    if (idx < 0) return;

    list[idx] = obj;

    await this.write(list);
  };

  getById = async (id) => {
    const data = await this.read();
    return data.find((p) => p.id === id);
  };

  delete = async (id) => {
    const list = await this.read();

    const itemIndex = list.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return { error: 'El elemento no existe.' };
    }

    const deletedItem = list.splice(itemIndex, 1)[0];

    await this.write(list);

    return deletedItem;
  };
}

export default FileManager;