function getTotalBooksCount(books) {
  let total = 0;
  for(let object in books){
    total += 1;
  }
  return total;
}

function getTotalAccountsCount(accounts) {
  let total = 0;
  for(let object in accounts){
    total += 1;
  }
  return total;
}

function getBooksBorrowedCount(books) {
  let checkedOut = books.filter(book =>
    book.borrows.filter(borrowed =>
      !borrowed.returned).length > 0);
  return checkedOut.length;
}

function helper(books) {
 let counter = {};
  books.forEach(aBook => {
    if (counter[aBook.genre] != null) {
      counter[aBook.genre]++;
    } else {
      counter[aBook.genre] = 1;
    }
  });
 return counter;
}

function getMostCommonGenres(books) { 
  let counter = helper(books);
  let countArray = [];
  for (const [key, value] of Object.entries(counter)) {
    countArray.push({
      'name' : key,
      'count' : value
    }); 
  }
  countArray.sort((first, second) => second.count - first.count);
  return countArray.slice(0, 5);
}

function getMostPopularBooks(books, count=5) {
    const borrows = books.map(book => 
      ({name:book.title, count:book.borrows.length}));
    borrows.sort((a,b) => b.count - a.count);
    return borrows.slice(0,count);
}

function getMostPopularAuthors(books, authors) {
 let result = [];
 authors.forEach((author) => {
  let theAuthor = {
   name: `${author.name.first} ${author.name.last}`,
   count: 0
  };
  books.forEach((book) => {
   if (book.authorId === author.id) {
    theAuthor.count += book.borrows.length;
   }
  });
  result.push(theAuthor);
 });
 return result.sort((first, second) => second.count - first.count).slice(0, 5);
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
