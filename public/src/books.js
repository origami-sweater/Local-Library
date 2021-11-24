function findAuthorById(authors, id) {
  let result = authors.find((author) => author.id === id);
  return result;
}

function findBookById(books, id) {
  let result = books.find((book) => book.id === id);
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  let result = [];
  let available = [];
  const borrowed = books.filter((book) => {
    let notReturned = book.borrows.some((borrow) => borrow.returned === false)
    if(notReturned === true){
      return true;
    } else {
      available.push(book);
      return false;
    }
  })
  result.push(borrowed);
  result.push(available);
  return result;
}

function getBorrowersForBook(book, accounts) {
  let firstTen = [];
  for(let i = 0; i < book.borrows.length; i++){
    if (i < 11) {
      firstTen.push(book.borrows[i]);
    }  
  };
  const filterById = firstTen.map((borrow) => borrow.id);
  const returnedStatus = firstTen.map((borrow) => borrow.returned);
    const filteredAccounts = accounts.filter((account) => filterById.includes(account.id));
  filteredAccounts.forEach((account) => {
    for (let i = 0; i < filterById.length; i++){
      if (account.id === filterById[i]){
        account.returned = returnedStatus[i];
      }
    }
  });
  return filteredAccounts;
 }

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
