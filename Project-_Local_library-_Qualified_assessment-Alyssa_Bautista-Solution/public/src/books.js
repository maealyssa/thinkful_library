function findAuthorById(authors, id) {
  return authors.find(author => author.id == id);
}

function findBookById(books, id) {
  return books.find(book => book.id == id);
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce((first, second) => {first[+ (second.borrows[0] &&         second.borrows[0].returned)].push(second); 
  return first}, [[],[]] );
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  let borrowArray = book.borrows;  
  borrowArray.forEach(borrow => {
    let account = accounts.find(acc => 
      acc.id === borrow.id);
    let object = account;
    object['returned'] =  borrow.returned;
    result.push(object);
  });
  return result.slice(0,10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
