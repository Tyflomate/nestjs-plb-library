import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GenericsService {
  getAll(repository) {
    return repository.find({
      loadRelationIds: true,
    });
  }

  getById(repository, id: number) {
    return repository.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }

  add(repository, item) {
    return repository.save(item);
  }

  async update(repository, id: number, item) {
    const dbItem = await repository.preload({ id, ...item });

    if (!dbItem) throw new NotFoundException("L'objet n'existe pas");

    return repository.save(dbItem);
  }

  delete(repository, id: number) {
    return repository.delete(id);
  }

  softDelete(repository, id: number) {
    return repository.softDelete(id);
  }

  restore(repository, id: number) {
    return repository.restore(id);
  }
}
