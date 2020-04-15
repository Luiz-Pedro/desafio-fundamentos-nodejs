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

  public all(): {} {
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  public isGreaterThanCurrentValue(value: number, type: string): boolean {
    if (type === 'outcome') {
      const balance = this.getBalance();

      if (value > balance.total) {
        return true;
      }
      return false;
    }
    return false;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    // eslint-disable-next-line array-callback-return
    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        income += transaction.value;
      } else {
        outcome += transaction.value;
      }
    });
    const total = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
