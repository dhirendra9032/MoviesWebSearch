const APIURL = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const search_res = document.getElementById("search_res");
const total_records = document.getElementById("total_records");

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    if (respData.results.length == 0) {
        search_res.innerHTML = "No Results Founds";
        total_records.innerHTML = '';
    } else {
        total_records.innerHTML = "Total Records " + respData.total_results
    }

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";
    movies.forEach((movie, index) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        if (movie.poster_path != null) {
            poster_path = IMGPATH + movie.poster_path;
        } else {
            poster_path = 'https://www.peakndt.com/wp-content/uploads/2017/02/No_picture_available.png';
        }

        movieEl.innerHTML = `
            <img
                src="${poster_path}"
                alt="${movie.title}"
            />
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${getClassByRate(
            movie.vote_average
        )}"> Rating ${movie.vote_average}</span>
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = searchTerm;
        search_res.innerHTML = "Search Result for " + searchTerm;
    } else {
        getMovies(APIURL);
    }

});

function signUp() {
    let fname = document.getElementById('full_name').value;
    let email = document.getElementById('email_id').value;
    let username = document.getElementById('user_name').value;
    let password = document.getElementById('password').value;

    let data = JSON.parse(localStorage.getItem('database'));

    let userData = {
        full_name: fname,
        email_id: email,
        user_name: username,
        password: password
    }

    if (data == null) {
        let data = new Array();
        data.push(userData);
        localStorage.setItem("database", JSON.stringify(data));
        alert("Signup Succesfully");
    } else {

        data.push(userData);
        localStorage.setItem("database", JSON.stringify(data));
        alert("Signup Succesfully");

    }
}


function login() {

    let username = document.getElementById('user_name').value;
    let password = document.getElementById('password').value;
    let data = localStorage.getItem('database');
    
   // for(let i=0;i<Array.length;i++){
        // if(data[i].user_name==username&&data[i].password==password){
        //     // window.location.href="./landingPage.html"
        //     alert(`${data[i].user_name}`)
        //     break;
        // }

       
   // }
    alert("hello");
}

function land(){
    //window.location.href="./landingPage.html"
    let username = document.getElementById('login_username').value;
    let password = document.getElementById('login_password').value;
    let data =JSON.parse(localStorage.getItem('database'));
    for(let i=0;i<data.length;i++){
        if(data[i].user_name===username&&data[i].password===password){
           window.location.href="./landingPage.html"
           
            break;
        }else{
            alert("Either user does'nt exist or wrong user id and password")
        }

       
   }
   
}
