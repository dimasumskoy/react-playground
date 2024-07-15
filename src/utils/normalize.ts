interface Entity {
  id: number;
  [key: string]: any;
}

interface NormalizedData<T extends Entity> {
  entities: { [id: number]: T };
  ids: number[];
}

export function normalize<T extends Entity>(data: T[]): NormalizedData<T> {
  const result: NormalizedData<T> = {
    entities: {},
    ids: []
  };

  for (let i = 0; i < data.length; i++) {
    const entity = data[i];

    result.entities[entity.id] = entity;
    result.ids.push(entity.id);
  }

  return result;
}

// Пример использования
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const normalizedUsers = normalize(users);
console.log(normalizedUsers);
