import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (data.type === 'outcome' && balance.total < data.value) {
      throw new Error('Valor de retirada superior o valor total em caixa.');
    }

    const transaction = this.transactionsRepository.create(data);
    return transaction;
  }
}

export default CreateTransactionService;
