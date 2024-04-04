const transactions = require("./transactions.json");

/**
 * Class analyzer for transactions
 * @class
 */
class TransactionAnalyzer {
  /**
   * create an example of transaction analyzer
   * @letructor
   * @param {Array} transactions 
   */
    constructor(transactions) {
   /**
    * transaction array
    * @type {Array}
    */     
        this.transactions = transactions;
    }
   
    
    
    /** 
     *  get all transactions
     * @returns {Array} array of transactions 
     */
    getAllTransactions() {
      return this.transactions;
    }
   
   
   
    /**
    * nive a posibility to add new transaction
    * @param {Object} transaction - new transaction to add
    */
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }
    
    
    
     /**
     * Calculate total amount
     * @returns {number} - sum of every transaction amount
     */
    calculateTotalAmount(){
        let total = 0;
        for(let i = 0; i < this.transactions.length; i++) {
            total += this.transactions[i].transaction_amount;
        }
        return total;
    }
    
    

     /**
     * calculate total amount
     * param can be null, nothing, or a number
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @returns the sum of transactions amount by te given date
     */
    calculateTotalAmountByDate(year, month, day) {
      let sum = 0;
      for(let i = 0; i < this.transactions.length; i++) {
          let transactionDate = transactions[i].transaction_date;
          let transactionYear = parseInt(transactionDate.split('-')[0]);
          let transactionMonth = parseInt(transactionDate.split('-')[1]);
          let transactionDay = parseInt(transactionDate.split('-')[2]);
          if ((year == null || transactionYear === year) &&
              (month == null || transactionMonth === month) &&
              (day == null || transactionDay === day)) {
                  sum += transactions[i].transaction_amount;
          }
      }
      return sum;
  }

    
    
     /**
     * get all transactions by the given type
     * @param {str} type 
     * @returns list of transactions by the given type (debit or credit)
     */
    getTransactionByType(type) {
      let transaction_by_type = [];
      for (let i = 0; i < this.transactions.length; i++) {
        if (this.transactions[i].transaction_type === type) {
          transaction_by_type.push(this.transactions[i]);
        }
      }
      return transaction_by_type;
    }


    
     /**
     * get transaction bu the given date range
     * @param {Date} startDate 
     * @param {Date} endDate 
     * @returns {Array} of transactions by the given date range
     */
    getTransactionsInDateRange(startDate, endDate){
      let transactions_date_array = [];
      let begin = new Date(startDate);
      let end = new Date(endDate);
      for (let i = 0; i < this.transactions.length; i++) {
        let transactionsDate = new Date(this.transactions[i].transaction_date) ;
        if (transactionsDate >= begin && transactionsDate <= end) {
          transactions_date_array.push(this.transactions[i])
        }
      }
      return transactions_date_array;
    }
    
    

     /**
     * get all transactions by the merchant name
     * @param {str} merchantName 
     * @returns {Array} of transactions by the given merchant name
     */
    getTransactionsByMerchant(merchantName){
      let transactions_merchant_array = [];
      let name = merchantName;
      for (let i = 0; i < this.transactions.length; i++) {
        let merchant_name = this.transactions[i].merchant_name;
        if (name === merchant_name) {
          transactions_merchant_array.push(this.transactions[i]);
        }
      }
      return transactions_merchant_array;
    }


     
     /**
     * @returns {number} returns average amount of all transactions
     */
    calculateAverageTransactionAmount(){
      let total_tr_sum = this.calculateTotalAmount();
      let getAllTransactions = this.transactions.length;
      let average_sum = total_tr_sum / getAllTransactions;
      return average_sum
    }

  
     /**
     * get all transactions by the given min and max amount range
     * @param {number} minAmount - min amount
     * @param {number} maxAmount - max a,ount
     * @returns {Array} of transactions by the giben amount range
     */
    getTransactionsByAmountRange(minAmount, maxAmount){
      let transaction_array_by_amount_range = [];
      for (let i = 0; i < this.transactions.length; i++) 
      {
      let transacionAmount = this.transactions[i].transaction_amount
      if(transacionAmount >= minAmount && transacionAmount <= maxAmount) {
        transaction_array_by_amount_range.push(this.transactions[i]);
      }  
      }
      return transaction_array_by_amount_range;
    }

    
    
     /**
     * calculate total debit amount
     * @returns {number} of all debit transactions
     */
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
    
    
    
     /**
     * find month in with wast the most number of transaction
     * @returns {srt} of most transaction month
     */
    findMostTransactionsMonth() {
        let monthCounts = [0, 0, 0, 0]; 
        for (let i = 0; i < this.transactions.length; i++) {
            let transactionMonth = parseInt(this.transactions[i].transaction_date.split('-')[1]);
            monthCounts[transactionMonth - 1]++;
        }
    
        let mostTransactionsMonth = 0; 
    
        for (let i = 0; i < monthCounts.length; i++) {
            if (monthCounts[i] > monthCounts[mostTransactionsMonth]) {
                mostTransactionsMonth = i;
            }
        }
        let most_tr_month = mostTransactionsMonth + 1;
        if(most_tr_month === 1) {
            return 'January';
        }else if (most_tr_month === 2) {
            return 'February';
        }else if (most_tr_month === 3) {
            return 'March';
        }else {
            return 'April';
        }
    }
    
  
  
   /**
   *  find month in with wast the most number of debit transaction
   * @returns {srt} of most debit transaction month
   */
    findMostDebitTransactionMonth() {
        let monthCounts = [0, 0, 0, 0]; 
        for (let i = 0; i < this.transactions.length; i++) {
            let transactionMonth = parseInt(this.transactions[i].transaction_date.split('-')[1]) - 1;
            if (this.transactions[i].transaction_type === 'debit') {
                monthCounts[transactionMonth]++;
            }
        }
        let mostDebitMonth = 0;
        for (let i = 0; i < monthCounts.length; i++) {
            if (monthCounts[i] > monthCounts[mostDebitMonth]) {
                mostDebitMonth = i;
            }
        }
        let most_debit_tr_month = mostDebitMonth + 1
        if(most_debit_tr_month === 1) {
            return 'January';
        }else if (most_debit_tr_month === 2) {
            return 'February';
        }else if (most_debit_tr_month === 3) {
            return 'March';
        }else {
            return 'April';
        }
    }
    


    /**
     * find most type of transaction
     * @returns {str} of most transaction type or equal
     */
    mostTransactionTypes(){
        let debitTransaction = this.getTransactionByType("debit").length
        let creditTransaction = this.getTransactionByType("credit").length
        if(debitTransaction > creditTransaction) {
            return 'debit';
        } else if (debitTransaction < creditTransaction) {
            return 'credit';
        }else {
            return 'equal';
        }
    }



    /**
     * gel the list of transactions before the given date
     * @param {Date} date 
     * @returns {Array} of all transactions before the given date
     */
    getTransactionsBeforeDate(date) {
        let transactionsBeforeDate = [];
        let beforeDate = new Date(date);

        for (let i = 0; i < this.transactions.length; i++) {
            let transactionDate = new Date(this.transactions[i].transaction_date);
        if (beforeDate > transactionDate) {
            transactionsBeforeDate.push(this.transactions[i]);
            }
        }
        return transactionsBeforeDate;
    }

    
    
    /**
     * get the transaction by the given id
     * @param {str} id 
     * @returns {object} transaction by the given id
     */
    findTransactionById(id) {
        for (let i = 0; i < this.transactions.length; i++) {
        let transaction = this.transactions[i];
        if (transaction.transaction_id === id) {
            return transaction;
            }
        }
        return null;
    }
    
    
    
    /**
     * get the description of all transactions
     * @returns {Array} of all desctiptions
     */
    mapTransactionDescriptions(){
        let description = [];
        for(let i = 0; i < this.transactions.length; i++) {
        let desc = this.transactions[i].transaction_description;
        description.push(desc); 
            }
        return description;
    }

}

// Check!!!
const obj = new TransactionAnalyzer(transactions);

let new_tr1 = {
    "transaction_id": "121",
    "transaction_date": "2019-02-28",
    "transaction_amount": 1800.00,
    "transaction_type": "debit",
    "transaction_description": "Shopping at USM",
    "merchant_name": "FashionStoreUSM",
    "card_type": "STEPUHA"
  }
  let new_tr2 = {
    "transaction_id": "122",
    "transaction_date": "2019-02-28",
    "transaction_amount": 1800.00,
    "transaction_type": "debit",
    "transaction_description": "Shopping at USM",
    "merchant_name": "FashionStoreUSM",
    "card_type": "STEPUHAURA"
  }
  let new_tr3 = {
    "transaction_id": "123",
    "transaction_date": "2019-02-28",
    "transaction_amount": 1800.00,
    "transaction_type": "debit",
    "transaction_description": "Shopping at USM",
    "merchant_name": "FashionStoreUSM",
    "card_type": "STEPUHADA"
  }
  let new_tr4 = {
    "transaction_id": "124",
    "transaction_date": "2019-02-28",
    "transaction_amount": 1800.00,
    "transaction_type": "debit",
    "transaction_description": "Shopping at USM",
    "merchant_name": "FashionStoreUSM",
    "card_type": "STEPUHANET"
  }
console.log(obj.addTransaction(new_tr1))
console.log(obj.addTransaction(new_tr2))
console.log(obj.addTransaction(new_tr3))
console.log(obj.addTransaction(new_tr4)) //add new  tr


console.log(obj.findTransactionById('121'))//find(show) by id


let sum = obj.calculateTotalAmount()// SUM
console.log(sum)


let sum_date = obj.calculateTotalAmountByDate(null, 2, null )// sum by date
console.log(sum_date)


let type = obj.getTransactionByType('debit')// get by type
console.log(type)


let dateRange = obj.getTransactionsInDateRange('2019-03-05','2019-03-07')
console.log(dateRange)


let merchName = obj.getTransactionsByMerchant('FashionStoreUSM')
console.log(merchName)


let average_sum = obj.calculateAverageTransactionAmount()
console.log(average_sum)


let amount_range = obj.getTransactionsByAmountRange(150, 1900)
console.log(amount_range)


let debit_amount = obj.calculateTotalDebitAmount()
console.log(debit_amount)


let most_tr_ymd = obj.findMostTransactionsMonth()
console.log(most_tr_ymd)


let most_debit_tr_ymd = obj.findMostDebitTransactionMonth()
console.log(most_debit_tr_ymd)


let most_tr_types = obj.mostTransactionTypes()
console.log(most_tr_types)


let get_tr_before_date = obj.getTransactionsBeforeDate('2019-01-03')
console.log(get_tr_before_date)


let tr_desc = obj.mapTransactionDescriptions()
console.log(tr_desc)


