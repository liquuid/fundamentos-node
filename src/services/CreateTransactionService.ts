import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: TransactionDTO): Transaction {
    if (['income', 'outcome'].includes(type)) {
      throw Error('Transaction type invalid');
    }
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && total < value) {
      throw Error('Insuficient fund');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
