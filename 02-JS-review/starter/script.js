const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: false,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((book) => book.id === id);
}

// Desctructuring

/*
const books = getBooks();
const book = getBook(3);
const { title, author, pages, publicationDate, genres, reviews, hasMovieAdaptation } =
  book;
console.log(books);
console.log(author);
console.log(title);
console.log(pages);
console.log(publicationDate);
console.log(genres);
const [primaryGenre, secondaryGenre, ...otherGenres] = genres;
console.log(primaryGenre);
console.log(secondaryGenre);

//Rest & Spread
console.log(otherGenres);
const newGenres = ["epic fantasy", ...genres];
console.log(newGenres);
const upDatedBook = { ...book, moviePublication: "2001-12-19", pages: 1210 };
console.log(upDatedBook);

// Temple literals
const summary = `${title},  ${pages}-pages long book, was written by ${author} and published in ${publicationDate}.`;
summary;
console.log(true && "some strings");
console.log(false && "some strings");
console.log(hasMovieAdaptation && "The book has a dedicated movie");

// truthy and falsy. Falsy value = "", null, undefined, 0
console.log("John" && "some string");
console.log("" && "John");

function getTotalReviewCount (book) {
  const goodreads = book.reviews?.goodreads?.reviewsCount ?? 0;
  const librarything = book.reviews?.librarything?.reviewsCount ?? 0;
  return goodreads + librarything;
};
console.log(getTotalReviewCount(book));
*/

/*
const books = getBooks();
const titles = books.map((book) => book.title);
titles;

function getTotalReviewCount(book) {
  const goodreads = book.reviews?.goodreads?.reviewsCount ?? 0;
  const librarything = book.reviews?.librarything?.reviewsCount ?? 0;
  return goodreads + librarything;
}
const essentialData = books.map((book) => ({
  title: book.title,
  author: book.author,
  reviewCount: getTotalReviewCount(book),
}));
essentialData;

const longBooks = books
  .filter((book) => book.pages > 500)
  .filter((book) => book.hasMovieAdaptation);
longBooks;

const adventureBooks = books
  .filter((book) => book.genres.includes("adventure"))
  .map((book) => book.title);
adventureBooks;

const pagesAllBoks = books.reduce((sum, book) => sum + book.pages, 0);
pagesAllBoks;

const x = [3, 7, 1, 9, 6];
const sortedAsc = x.slice().sort((a, b) => a - b);
sortedAsc;
const sortedDsc = x.slice().sort((a, b) => b - a);
sortedDsc;

const sortedByPages = books.slice().sort((a, b) => b.pages - a.pages);
sortedByPages;

// Add book object to array
const newBook = {
  id: 6,
  title: "Harry Potter and the Chamber of Secret",
  author: "J. K. Rolling",
};

const booksAfterAdding = [...books, newBook];
booksAfterAdding;

const deleteBook = (id) => booksAfterAdding.filter((book) => book.id !== id);
const booksAfterDelete = deleteBook(3);
booksAfterDelete;

// update

const bookAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 1 ? { ...book, pages: 6532 } : book
);
bookAfterUpdate;
*/

// Fetch API
const getTodos = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const data = await res.json();
  // console.log(data);
  return data;
};

const todos = await getTodos();
todos
