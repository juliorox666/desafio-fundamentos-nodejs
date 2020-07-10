import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter((transaction: Transaction) => transaction.type === 'income')
      .reduce(
        (totalIncome: number, transaction: Transaction) =>
          totalIncome + transaction.value,
        0,
      );
    const outcome = this.transactions
      .filter((transaction: Transaction) => transaction.type === 'outcome')
      .reduce(
        (totalOutcome: number, transaction: Transaction) =>
          totalOutcome + transaction.value,
        0,
      );
    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create(data: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(data);
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
