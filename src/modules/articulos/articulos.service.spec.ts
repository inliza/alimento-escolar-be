import { ArticuloDesayuno } from '../../entities/articulos-desayuno.entity';
import { ArticulosService } from './articulos.service';

describe('ArticulosService', () => {
  let service: ArticulosService;
  const repo = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(() => {
    service = new ArticulosService(repo as any);
    jest.clearAllMocks();
  });

  it('should update the article price', async () => {
    const existing: ArticuloDesayuno = {
      id: 1,
      nombre: 'Pan integral',
      precio: '12.50',
      itbis: false,
      isDeleted: false,
      menus: [],
      conduces: [],
    };

    repo.findOne.mockResolvedValue(existing);
    repo.save.mockImplementation(async (articulo) => articulo);

    const result = await service.updatePrice(1, 15.75);

    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repo.save).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, precio: '15.75' }),
    );
    expect(result.code).toBe(200);
    expect(result.content).toEqual(expect.objectContaining({ precio: '15.75' }));
  });

  it('should return 404 when the article does not exist', async () => {
    repo.findOne.mockResolvedValue(null);

    const result = await service.updatePrice(99, 20);

    expect(result.code).toBe(404);
    expect(result.message).toContain('99');
  });
});
