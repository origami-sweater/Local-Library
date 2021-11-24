function topFive(array){
  //helper fucntion to limit results to top 5
  let v = [];
  for(let i = 0; i < 5; i++){
      v.push(array[i]);
     }
  return v;
}

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const borrowed = books.filter((book) => {
    let notReturned = book.borrows.some((borrow) => borrow.returned === false)
    return notReturned;
  })
  return borrowed.length;
}

function getMostCommonGenres(books) {
 const genres = books.reduce((acc, {genre}) => {
    if(!acc[genre]) {
      acc[genre] = {name: genre, count: 1};
    } else {
      acc[genre].count ++;
    }
    return acc;
    }, {});
  const newGenres = Object.values(genres);
  const sortedByCount = newGenres.sort((a, b) => b.count - a.count)
  return topFive(sortedByCount);
}

function getMostPopularBooks(books) {
const borrowCount = books.reduce((acc, book) => {
    if(!acc[book.title]) {
      acc[book.title] = {name: book.title, count: book.borrows.length};
    }
    return acc;
    }, {});
  const newBorrowCount = Object.values(borrowCount);
  const sortedByCount = newBorrowCount.sort((a, b) => b.count - a.count)
  return topFive(sortedByCount);
}

function getMostPopularAuthors(books, authors) {
  const borrowCount = books.reduce((acc, book) => {
    if(!acc[book.authorId]) {
      acc[book.authorId] = {name: book.authorId, count: book.borrows.length};
    } else {
      acc[book.authorId].count += book.borrows.length; 
    }
    return acc;
    }, {});
  const newBorrowCount = Object.values(borrowCount);
  const sortedByCount = newBorrowCount.sort((a, b) => b.count - a.count)
  sortedByCount.forEach((object) => {
    let v = authors.find((author) => author.id === object.name);
    object.name = `${v.name.first} ${v.name.last}`;
  })
  return topFive(sortedByCount);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
