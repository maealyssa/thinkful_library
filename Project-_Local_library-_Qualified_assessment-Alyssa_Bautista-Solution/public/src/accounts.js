function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((first, second) => 
    first.name.last.toLowerCase() > 
    second.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  let borrowed = 0;
  for(let i = 0; i < books.length; i++){
    for(let j = 0; j < books[i].borrows.length; j++){
    if(books[i].borrows[j].id === account.id){
      borrowed += 1;
    }
   }
  }
 return borrowed;
}


function getBooksPossessedByAccount(account, books, authors) {
  let result = [];
  let checkedOut =[];
  books.forEach(item => {
    const borrowed = item.borrows;
    const book = {id: item.id,
          title: item.title,
          genre: item.genre,
          authorId: item.authorId,
          author: {},
          borrows: {},
    };
  let {id, title, genre, authorId, author, borrows}
      = book;
    
  borrowed.forEach(borrow => {
    if(borrow.id == account.id && !borrow.returned){
      result.push(book);
      checkedOut.push(borrow);
      book.borrows = checkedOut;
      book.author = authors.filter((auth) => 
        auth.id === book.authorId)[0];
    }
  });
 });
 return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
