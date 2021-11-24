function findAccountById(accounts, id) { 
  let match = accounts.find((account) => account.id === id)
  return match;
}

function sortAccountsByLastName(accounts) { 
  const match = accounts.sort((accountA, accountB) => {
    if (accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase()){
      return 1;
      } else {
      return -1;
      }
    });
  return match;
}

function getTotalNumberOfBorrows(account, books) {
 let initialValue = 0;
 const result = books.reduce((total, book) => {
   let accountMatch = book.borrows.filter(({id}) => id === account.id);
   return total + accountMatch.length}, initialValue);
 return result;
}

function getBooksPossessedByAccount(account, books, authors) {
 let filteredBooks = books.filter((book) => {
   const accountMatch = book.borrows.filter((borrow) => borrow.id === account.id && borrow.returned === false);
   if(accountMatch.length > 0){ 
     return true;
   } else {
     return false;
   }
 });
  filteredBooks.forEach((book) => {
   let authorOf = authors.find((author) => author.id === book.authorId)
   book.author = authorOf
 })
 return filteredBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
