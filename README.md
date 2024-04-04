
## Отчет по индивидуальной работе N1
#### Студент группы I2302 : Джуринский Андрей
#### Преподаватель: Нартя Никита


## Цель

Освоение основных функций JS и создание консольного предложения для манипуляций с транзакциями

## Создание класса

```js
const transactions = require("./transactions.json");
```
Эта строка импортирует все транзакции из файла `transactions.json` и передает все файлы в переменную `transactions`

```js
class TransactionAnalyzer {
	constructor(transactions) {
		this.transactions = transactions;
	}
```
Эта часть кода определяет класс `TransactionAnalyzer`. Класс имеет конструктор, который принимает массив транзакций в качестве параметра. Внутри самого конструктора я присваиваю значение массива в свойство  `transactions`, который является объектом класса `TransactionAnalyzer`.
## getAllTransactions() 
```js
getAllTransactions() { return  this.transactions; }
```
Данный метод возвращает все транзакции
## addTransaction()
```js
addTransaction(transaction) { this.transactions.push(transaction); }
```
Данный метод позволяет добавить транзакцию в массив благодаря методу `push`
В качестве параметра здесь выступает одна транзакция - `transaction` 

## calculateTotalAmount()
```js
calculateTotalAmount(){
let total = 0; 
for(let i = 0; i < this.transactions.length; i++)
{
	total += this.transactions[i].transaction_amount; 
}
return total; 
}
```
Метод `calculateTotalAmount()` вычисляет общую сумму в массиве с транзакциями.
Через цикл `for` я пробегаюсь по каждой транзакции `[i]` и складываю свойство `transaction_amount` с текущим значением `total`. После того как все транзакции пройдены, метод возвращает общую сумму всех транзакций.

## calculateTotalAmountByDate(year, month, day)
```js
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
```
В данном методе я прохожусь по каждой транзакции и присваиваю переменной `transactionDate` свойства `transaction_date`. Далее благодаря методу `split` и функции `ParseInt` я разделяю на три части переменную  `transactionDate`  и присваиваю каждую часть соответствующим переменным `transactionYear` `transactionMonth` `transactionDay`.
> Каждая дата имеет формат (хххх-хх-хх).
> **`ParseInt`**  - преобразование строки в число
> **`Split('-')[n]`**  - делит на части по знаку '-' и обращается к индексу элемента
Далее у меня идет цикл `if` который проверяет, если переданный в метод параметр является `null`, то он игнорируется, однако если пользователь все-таки указал значения хотя-бы одного параметра, то по всему массиву ищут сходства с переданным числом и суммируют свойство `transaction_amount` с переменной sum


## getTransactionByType(type)
```js
getTransactionByType(type) {
	let  transaction_by_type  = [];
	for (let  i  =  0; i  <  this.transactions.length; i++) {
		if (this.transactions[i].transaction_type  ===  type) {
			transaction_by_type.push(this.transactions[i]);
		}
	}
	return  transaction_by_type;
}
```
Тут метод принимает один параметр `type`, который указывает на тип транзакции, которую мы хотим найти (`'debit'` или `'credit'`). Далее я создаю пустой массив `transaction_by_type` в который я буду передавать все транзакции указанного типа. Цикл `for` проходит по каждой транзакции, и если свойство `transaction_type`, равно параметру `type`, то данная транзакция записывается в массив `transaction_by_type`, который в последжствии я возвращаю. 

## getTransactionsInDateRange(startDate, endDate)

```js
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

```
Первым делом я создаю пустые массив `transactions_date_array` для указания диапазона дат. Далее переменные `begin` и `end` создают новые объекты `Date` для указания диапазона. Затем свойство `transaction_date` извлекается из каждой транзакции, переводится в объект `Date`  присвается переменной `transactionsDate`. 
В блоке `if` уже данная переменная сравнивается с указанным диапазоном дат, и если он подходит по параметру, то записывается в массив  `transactions_date_array`.

## getTransactionsByMerchant(merchantName)

```js
getTransactionsByMerchant(merchantName){
	let  transactions_merchant_array  = [];
	let  name  =  merchantName;
	for (let  i  =  0; i  <  this.transactions.length; i++) {
		let  merchant_name  =  this.transactions[i].merchant_name;
		if (name  ===  merchant_name) {
			transactions_merchant_array.push(this.transactions[i]);
		}
	}
	return  transactions_merchant_array;
}
```
Метод `getTransactionsByMerchant` принимает параметр `merchantName`. 

**Действия идентичные:**
1. создаю пустой объект
2. параметр присваиваю переменной
3. прохожусь по транзакциям
4. если свойство `===` параметру, то транзакция под данным индексом записывается в мой массив
5. возвращаю данный массив

## Export a file

```js
calculateAverageTransactionAmount(){
	let  total_tr_sum  =  this.calculateTotalAmount();
	let  getAllTransactions  =  this.transactions.length;
	let  average_sum  =  total_tr_sum  /  getAllTransactions;
	return  average_sum
}
```
`calculateAverageTransactionAmount()` вычисляет среднюю сумму транзакции в массиве. Сначала мы вызываем раннее использованный метод `calculateTotalAmount` и передаем его в переменную `total_tr_sum`. Далее `this.transactions.length` кол-во тразакций в нашем массиве передаем в соответсвующую переменную и делим общую сумму на количество.
```js	
let  average_sum  =  total_tr_sum  /  getAllTransactions;
return  average_sum
```
## getTransactionsByAmountRange(minAmount, maxAmount)

```js
getTransactionsByAmountRange(minAmount, maxAmount){
	let  transaction_array_by_amount_range  = [];
	for (let  i  =  0; i  <  this.transactions.length; i++){
		let  transacionAmount  =  this.transactions[i].transaction_amount
		if(transacionAmount  >=  minAmount  &&  transacionAmount  <=  maxAmount) {
			transaction_array_by_amount_range.push(this.transactions[i]);
		}
	}
	return  transaction_array_by_amount_range;
}
```
Синтаксис метода `getTransactionsByAmountRange(minAmount, maxAmount)` идентичен синтаксису метода с диапазон дат, принцип работы точно такой же.
## calculateTotalDebitAmount()

```js
calculateTotalDebitAmount(){
	let  debit_sum  =  0
	for(let  i  =  0; i  <  this.transactions.length; i++){
		let  name_of_type  =  this.transactions[i].transaction_type;
		if (name_of_type  ===  'debit') {
			debit_sum  +=  this.transactions[i].transaction_amount;
		}
	}
	return  debit_sum;
}
```
Синтаксис данного метода так же не имеет в себе ничего особенного, он схож с другими методами, связанными с суммами
## findMostTransactionsMonth()
```js
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
```
Метод `findMostTransactionsMonth()` вернет нам месяц, в котором было больше всего транзакций. Для начала я создаю массив с 4-мя элементами, которые равны `0`. Они отображают 4 месяца. Так как массивы индексируются с 0, а номера месяцев начинаются с 1, мы вычитаем 1 из `transactionMonth`, чтобы получить правильный индекс массива, после чего его увеличиваем на единицу(кол-во транзакций). ДАлее создаем переменную `mostTransactionMonth` и цикл `for` для перебора массива `monthCounts`. Если текущий имеет наибольшее значение, чем предыдущий, то переменная `mostTransactionsMonth` будет равна индексу этого месяца в массиве. `most_tr_month` поможет мне вернуть индекс = месяцу для удобства. Далее индекс используется для определения названия месяца
## findMostDebitTransactionMonth()
```js
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
```
Данный метод работает по такому же принципу.
## mostTransactionTypes()
```js
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
```
Данный метод сравнивает типы всех транзакций и выводит наибольший тип (`equal` при равном кол-ве). Сначала получаю в переменные длину каждого типа, после чего начинаю его сравнивать с другим типом.
## getTransactionsBeforeDate(date)
```js
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
```
Метод `getTransactionsBeforeDate(date)` записывает в аустой массив каждую транзакцию, которая находится до введенной даты.
 ## findTransactionById(id) 
 ```js
     findTransactionById(id) {
        for (let i = 0; i < this.transactions.length; i++) {
        let transaction = this.transactions[i];
        if (transaction.transaction_id === id) {
            return transaction;
            }
        }
        return null;
    }
```
Принцип работы данного метода индентичен другим методам в моей программе
## mapTransactionDescriptions()
```js
    mapTransactionDescriptions(){
        let description = [];
        for(let i = 0; i < this.transactions.length; i++) {
        let desc = this.transactions[i].transaction_description;
        description.push(desc); 
            }
        return description;
    }
```
Принцип работы данного метода индентичен другим методам в моей программе

# Теперь проверим работу моей программы:
```js
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
```

# Источники:

[learn js](https://learn.javascript.ru/first-steps)
[Youtube](https://www.youtube.com/)

