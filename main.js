const transactions = require("./transactions.json");

class TransactionAnalyzer {
  constructor(transactions) {
        this.transactions = transactions;
    }
   
   
    getAllTransactions() {
      return this.transactions;
    }
   
   
    addTransaction(transaction) {
        console.log('Добавить новую транзакцию в массив');
        this.transactions.push(transaction);
    }
    
    
    calculateTotalAmount(){
        let total = 0;
        for(let i = 0; i < this.transactions.length; i++) {
            total += this.transactions[i].transaction_amount;
        }
        return total;
    }
    
    
    calculateTotalAmountByDate(year, month, day) {
      let sum = 0;
      for(let i = 0; i < this.transactions.length; i++) {
          const transactionDate = transactions[i].transaction_date;
          const transactionYear = parseInt(transactionDate.split('-')[0]);
          const transactionMonth = parseInt(transactionDate.split('-')[1]);
          const transactionDay = parseInt(transactionDate.split('-')[2]);
          if ((year == null || transactionYear === year) &&
              (month == null || transactionMonth === month) &&
              (day == null || transactionDay === day)) {
                  sum += transactions[i].transaction_amount;
          }
      }
      return sum;
  }

    
    
  
  getTransactionByType(type) {
      let transaction_by_type = [];
      for (let i = 0; i < this.transactions.length; i++) {
        if (this.transactions[i].transaction_type === type) {
          transaction_by_type.push(this.transactions[i]);
        }
      }
      return transaction_by_type;
    }


    
    
    getTransactionsInDateRange(startDate, endDate){
      const transactions_date_array = [];
      const begin = new Date(startDate);
      const end = new Date(endDate);
      for (let i = 0; i < this.transactions.length; i++) {
        const transactionsDate = new Date(this.transactions[i].transaction_date) ;
        if (transactionsDate >= begin && transactionsDate <= end) {
          transactions_date_array.push(this.transactions[i])
        }
      }
      return transactions_date_array;
    }
    
    

    
    
    getTransactionsByMerchant(merchantName){
      const transactions_merchant_array = [];
      const name = merchantName;
      for (let i = 0; i < this.transactions.length; i++) {
        const merrchant_name = this.transactions[i].merchant_name;
        if (name === merrchant_name) {
          transactions_merchant_array.push(this.transactions[i]);
        }
      }
      return transactions_merchant_array;
    }


    
    
    
    calculateAverageTransactionAmount(){
      const total_tr_sum = this.calculateTotalAmount();
      const getAllTransactions = this.transactions.length;
      const average_sum = total_tr_sum / getAllTransactions;
      return average_sum
    }

  
  
    
    
    getTransactionsByAmountRange(minAmount, maxAmount){
      const transaction_array_by_amount_range = [];
      for (let i = 0; i < this.transactions.length; i++) 
      {
      const transacionAmount = this.transactions[i].transaction_amount
      if(transacionAmount >= minAmount && transacionAmount <= maxAmount) {
        transaction_array_by_amount_range.push(this.transactions[i]);
      }  
      }
      return transaction_array_by_amount_range;
    }

    
    
    calculateTotalDebitAmount(){
     let debit_sum = 0
     for(let i = 0; i < this.transactions.length; i++){
     let name_of_type = this.transactions[i].transaction_type;
     if (name_of_type === 'debit') {
      debit_sum += this.transactions[i].transaction_amount;
     }
     } 
     return debit_sum;
    }
    
    
    
    
    findMostTransactionsMonth() {
      const monthCounts = [0, 0, 0, 0]; 
      for (let i = 0; i < this.transactions.length; i++) {
          const transactionMonth = parseInt(this.transactions[i].transaction_date.split('-')[1]);
          if (transactionMonth === 1) {
              monthCounts[0]++;
          } else if (transactionMonth === 2) {
              monthCounts[1]++;
          } else if (transactionMonth === 3) {
              monthCounts[2]++;
          } else {
              monthCounts[3]++;
          }
      }
  
      let mostTransactionsMonth = 0; 
      let maxTransactions = monthCounts[0] || 0; 
  

      for (let i = 1; i < monthCounts.length; i++) {
          if (monthCounts[i] > maxTransactions) {
              mostTransactionsMonth = i;
              maxTransactions = monthCounts[i];
          }
      }
      return mostTransactionsMonth + 1; 
  }
  
  
  
  
  findMostDebitTransactionMonth() {
    const monthCounts = [0, 0, 0, 0]; 

    for (let i = 0; i < this.transactions.length; i++) {
        const transaction = this.transactions[i];
        if (transaction.transaction_type === 'debit') {
            const transactionMonth = new Date(transaction.transaction_date).getMonth();
            monthCounts[transactionMonth]++;
        }
    }

    let mostDebitMonth = 0; 
    let maxDebitTransactions = monthCounts[0] || 0; 

   
    for (let i = 1; i < monthCounts.length; i++) {
        if (monthCounts[i] > maxDebitTransactions) {
            mostDebitMonth = i;
            maxDebitTransactions = monthCounts[i];
        }
    }

    return mostDebitMonth + 1;
}

mostTransactionTypes(){
  const debitTransaction = this.getTransactionByType("debit").length
  const creditTransaction = this.getTransactionByType("credit").length
  if(debitTransaction > creditTransaction) {
    return 'debit';
  } else if (debitTransaction < creditTransaction) {
    return 'credit';
  } else {
    return 'equal';
  }
}

getTransactionsBeforeDate(date) {
  const transactionsBeforeDate = [];
  const beforeDate = new Date(date);

  for (let i = 0; i < this.transactions.length; i++) {
      const transactionDate = new Date(this.transactions[i].transaction_date);
      if (beforeDate > transactionDate) {
          transactionsBeforeDate.push(this.transactions[i]);
      }
  }
  return transactionsBeforeDate;
}

findTransactionById(id) {
  for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];
      if (transaction.transaction_id === id) {
          return transaction;
      }
  }
  return null;
}

mapTransactionDescriptions(){
  const description = [];
  for(let i = 0; i < this.transactions.length; i++) {
    let desc = this.transactions[i].transaction_description;
    description.push(desc); 
  }
  return description;
}

}

let obj1 = new TransactionAnalyzer(transactions);

let average_sum = obj1.calculateAverageTransactionAmount()
console.log(average_sum) 

let tr_amount = obj1.getTransactionsByAmountRange(90,100)
console.log(tr_amount)

let debit_sum = obj1.calculateTotalDebitAmount();
console.log(debit_sum)

let month = obj1.findMostTransactionsMonth()
console.log(month)

console.log(obj1.mostTransactionTypes())
console.log(obj1.findTransactionById('2'))
console.log(obj1.mapTransactionDescriptions())



