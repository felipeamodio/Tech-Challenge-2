const mongoose = require('mongoose');
const connectDB = require('../db');

const originalConsole = console;
beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalConsole.error;
  console.log = originalConsole.log;
});

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('Conexão com o MongoDB', () => {
  it('Deve conectar ao MongoDB com sucesso', async () => {
    mongoose.connect.mockResolvedValueOnce({});
    await connectDB();
    expect(mongoose.connect).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Conectado ao MongoDB com sucesso');
  });

  it('Deve falhar ao conectar ao MongoDB e chamar process.exit', async () => {
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {}); 
    mongoose.connect.mockRejectedValueOnce(new Error('Falha de conexão'));
    
    await connectDB();
    expect(console.error).toHaveBeenCalledWith('Erro ao conectar ao MongoDB:', expect.any(Error));
    expect(exitSpy).toHaveBeenCalledWith(1);

    exitSpy.mockRestore();
  });
});
