KeywordInput = document.querySelector(".KeywordInput");
SearchButton = document.querySelector(".SearchButton");
ListOfMovies = document.querySelector(".ListOfMovies");

// console.log("x = ", x);

SearchButton.addEventListener("click", UpdateUI);

async function UpdateUI() {
  if (KeywordInput.value != "") {
    Data = await getData("movielist", KeywordInput.value);
    HTMLInsertion = InsertToHTML(Data);
    console.log("yang dimasukin = ", HTMLInsertion);
    ListOfMovies.innerHTML = HTMLInsertion;
    PreparingButton();
  } else {
    ListOfMovies.innerHTML = "<div>tidak boleh kosong bos</div>";
  }
}

async function getData(datatype, arg) {
  //data type bisa movielist bisa detail. kalo movie list, argumennya keywordnya, kalo detail, argumennya imdbID nya
  if (datatype == "movielist") {
    url = "http://www.omdbapi.com/?apikey=8a501eb9&s=" + arg;
  } else {
    url = "http://www.omdbapi.com/?apikey=8a501eb9&i=" + arg;
  }
  //melakukan search dan mengembalikan object yg didapat dari search
  keyword = KeywordInput.value;
  //   ListOfMovies.innerHTML = "<h1> tes </h1>";
  Data = await fetch(url)
    .then((response) => {
      //   console.log("res = ", response);
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return Data;
}
function InsertToHTML(MoviesData) {
  console.log("movies data = ", MoviesData);
  console.log(MoviesData.Response == "True");
  if (MoviesData.Response == "False") {
    console.log(MoviesData.Error, "coba masukkan keyword yang lebih spesifik");
    return MoviesData.Error;
  } else {
    let tobeinserted = "";
    console.log("testing =", MoviesData.Search);
    MoviesData.Search.forEach((element) => {
      //   console.log(element);
      //   console.log(element.Title);
      //inserting individual item
      image = '<div class="CardImage"><img src="' + element.Poster + '"alt="' + element.Title + '"></div>';
      title = '<div class="CardTitle">' + element.Title + "</div>";
      year = '<div class="CardSub">' + element.Year + "</div>";
      button = "<div class='CardButton'><button class='DetailButton'" + "id = '" + element.imdbID + "'>" + "detail" + "</button></div>";
      tobeinserted += "<div class='MovieCard'>" + title + year + image + button + "</div>";

      //inserting individual item done
      //   console.log(tobeinserted);
    });
    console.log(tobeinserted);
    return tobeinserted;
  }
}

//detailButton
function PreparingButton() {
  console.log("preparing button");
  ListOfButton = document.querySelectorAll(".CardButton");
  ListOfButton.forEach((element) => {
    console.log("id =", element.id);
    imdbID = element.id;
    element.addEventListener("click", (e) => {
      ShowDetail(e.path[0].id);
    });
  });
}
async function ShowDetail(imdbID) {
  console.log("button clicked! id =", imdbID);
  popup = document.querySelector(".popup");
  Detail = await getData("detail", imdbID);
  console.log("detail = ", Detail);
  insertDetail(Detail);
  popup.style.display = "block";
  document.querySelector(".ClosePopUpButton").addEventListener("click", () => {
    popup.style.display = "none";
  });
}
function insertDetail(detail) {
  button = "<div><button class='ClosePopUpButton'" + "'>" + "close" + "</button></div>";
  title = "<div class='CardTitle'>" + detail.Title + "</div>";
  country = "<div class='CardSub'>" + detail.Country + "</div>";
  genre = "<div class = 'CardSub'>" + detail.Genre + "</div>";
  plot = "<div class = 'CardPlot'>" + detail.Plot + "</div>";
  tobeinserted = "<div>" + title + plot + country + genre + button + "</div>";
  document.querySelector(".popup").innerHTML = tobeinserted;
  console.log("detail insertion done");
}
