import { Test, TestingModule } from '@nestjs/testing';
import { AgendaController } from './agenda.controller';
import { AgendaService } from './agenda.service';

const mockAgendaService = {
  getByProfesional: jest.fn(),
};

describe('AgendaController', () => {
  let controller: AgendaController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendaController],
      providers: [{ provide: AgendaService, useValue: mockAgendaService }],
    }).compile();

    controller = module.get<AgendaController>(AgendaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /agenda/:profesional_id', () => {
    it('returns agenda for a profesional with no filters', async () => {
      mockAgendaService.getByProfesional.mockResolvedValueOnce({
        profesional_id: 'prof-123',
        turnos: [],
      });

      const result = await controller.getAgenda('prof-123', {});

      expect(result).toEqual({ profesional_id: 'prof-123', turnos: [] });
      expect(mockAgendaService.getByProfesional).toHaveBeenCalledWith('prof-123', {});
    });

    it('passes fecha query param to service', async () => {
      mockAgendaService.getByProfesional.mockResolvedValueOnce({
        profesional_id: 'prof-456',
        turnos: [],
      });

      await controller.getAgenda('prof-456', { fecha: '2026-07-22' });

      expect(mockAgendaService.getByProfesional).toHaveBeenCalledWith(
        'prof-456',
        { fecha: '2026-07-22' },
      );
    });

    it('passes date range query params to service', async () => {
      mockAgendaService.getByProfesional.mockResolvedValueOnce({
        profesional_id: 'prof-789',
        turnos: [],
      });

      await controller.getAgenda('prof-789', {
        fecha_inicio: '2026-07-01',
        fecha_fin: '2026-07-31',
      });

      expect(mockAgendaService.getByProfesional).toHaveBeenCalledWith('prof-789', {
        fecha_inicio: '2026-07-01',
        fecha_fin: '2026-07-31',
      });
    });
  });
});
