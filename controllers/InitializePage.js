class InitializePage {

    constructor(){

        this.apiKey = /* Enter your OMDbAPI key here */
        this.imgDefaultMoviePoster = "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg";
        this.searchForm = document.querySelector('form');
        this.pageNumber = '1';
        this.btnMoreMovies = document.querySelector('.load-more');
        this.btnReturnMovies = document.querySelector('.return');
        this.countPageBtn = '1';
        this.targetMovie = '';
        this.lastMovie = '';

        this.startMoviePage();
        this.searchMovies();

        this.btnMoreMovies.addEventListener('click', () => {

            this.countPageBtn++;
            window.scrollTo(0, 0);
            
            fetch(`http://www.omdbapi.com/?apikey=${this.apiKey}&s=${this.targetMovie}&page=${this.countPageBtn}`)
                .then(result => result.json())
                .then(json => this.loadMoviesList(json))
                .catch(error => console.log(error))

        });

        this.btnReturnMovies.addEventListener('click', () => {

            this.countPageBtn--;
            window.scrollTo(0, 0);

            fetch(`http://www.omdbapi.com/?apikey=${this.apiKey}&s=${this.targetMovie}&page=${this.countPageBtn}`)
                .then(result => result.json())
                .then(json => this.loadMoviesList(json))
                .catch(error => console.log(error))

        });

    }

    generateNumberID(){
        let randomNumber = Math.trunc(Math.random()*10000000);
        let randomID = `tt${randomNumber}`;
        return randomID;
    }

    loadInfoRandomMovies(){

        fetch(`https://www.omdbapi.com/?apikey=${this.apiKey}&i=${this.generateNumberID()}&plot=full`)
            .then(result => result.json())
            .then(json => this.movieValidation(json))
            .catch(error => console.log(error))
    
    }

    movieValidation(json){

        if (json.Response == 'False' || json.Genre == 'Adult') {
            this.loadInfoRandomMovies();
        } else {
            this.showMoviesInitPage(json);
        }
    
    }

    showMoviesInitPage(json){

        const list = document.querySelector('div.row');
    
        if (json.Poster == 'N/A') {
    
            let item = document.createElement('div');
            item.classList.add('col-lg-4');
    
            item.innerHTML = `
                <div class="styles-movies">
                    <img class="bd-placeholder-img rounded-circle" width="200" height="200" src=${this.imgDefaultMoviePoster} role="img" preserveAspectRatio="xMidYMid slice" focusable="false" alt="img movie poster">
                    <h3 class="fw-normal">${json.Title}</h3>
                    <i class="fa-solid fa-calendar-days fa-2xl"></i><p>${json.Year}</p>
                    <i class="fa-solid fa-film fa-2xl"></i><p>${json.Type}</p>
                    <i class="fa-solid fa-masks-theater fa-2xl"></i><p>${json.Genre}</p>
                    <i class="fa-solid fa-circle-info fa-bounce fa-2xl"></i>
                    <details>
                        <summary>More details</summary>
                        <i class="fa-solid fa-people-group fa-2xl"></i><p><em>Actors:</em> ${json.Actors}</p>
                        <i class="fa-solid fa-trophy fa-2xl"></i><p><em>Awards:</em> ${json.Awards}</p>
                        <i class="fa-solid fa-sack-dollar fa-2xl"></i><p><em>BoxOffice:</em> ${json.BoxOffice}</p>
                        <i class="fa-solid fa-earth-americas fa-2xl"></i><p><em>Country:</em> ${json.Country}</p>
                        <i class="fa-solid fa-user fa-2xl"></i><p><em>Director:</em> ${json.Director}</p>
                        <i class="fa-solid fa-language fa-2xl"></i><p><em>Language:</em> ${json.Language}</p>
                        <i class="fa-solid fa-file-pen fa-2xl"></i><p><em>Plot:</em> ${json.Plot}</p>
                        <i class="fa-solid fa-video fa-2xl"></i><p><em>Production:</em> ${json.Production}</p>
                        <i class="fa-solid fa-calendar fa-2xl"></i><p><em>Released:</em> ${json.Released}</p>
                        <i class="fa-solid fa-clock fa-2xl"></i><p><em>Runtime:</em> ${json.Runtime}</p>
                        <i class="fa-solid fa-pen fa-2xl"></i><p><em>Writer:</em> ${json.Writer}</p>
                    </details>
                </div>
            `;
    
            list.appendChild(item);
            
        } else {
    
            let item = document.createElement('div');
            item.classList.add('col-lg-4');
    
            item.innerHTML = `
                <div class="styles-movies">
                    <img class="bd-placeholder-img rounded-circle img-hover" width="200" height="200" src=${json.Poster} role="img" preserveAspectRatio="xMidYMid slice" focusable="false" alt="img movie poster">
                    <h3 class="fw-normal">${json.Title}</h3>
                    <i class="fa-solid fa-calendar-days fa-2xl"></i><p>${json.Year}</p>
                    <i class="fa-solid fa-film fa-2xl"></i><p>${json.Type}</p>
                    <i class="fa-solid fa-masks-theater fa-2xl"></i><p>${json.Genre}</p>
                    <i class="fa-solid fa-circle-info fa-bounce fa-2xl"></i>
                    <details>
                        <summary>More details</summary>
                        <i class="fa-solid fa-people-group fa-2xl"></i><p><em>Actors:</em> ${json.Actors}</p>
                        <i class="fa-solid fa-trophy fa-2xl"></i><p><em>Awards:</em> ${json.Awards}</p>
                        <i class="fa-solid fa-sack-dollar fa-2xl"></i><p><em>BoxOffice:</em> ${json.BoxOffice}</p>
                        <i class="fa-solid fa-earth-americas fa-2xl"></i><p><em>Country:</em> ${json.Country}</p>
                        <i class="fa-solid fa-user fa-2xl"></i><p><em>Director:</em> ${json.Director}</p>
                        <i class="fa-solid fa-language fa-2xl"></i><p><em>Language:</em> ${json.Language}</p>
                        <i class="fa-solid fa-file-pen fa-2xl"></i><p><em>Plot:</em> ${json.Plot}</p>
                        <i class="fa-solid fa-video fa-2xl"></i><p><em>Production:</em> ${json.Production}</p>
                        <i class="fa-solid fa-calendar fa-2xl"></i><p><em>Released:</em> ${json.Released}</p>
                        <i class="fa-solid fa-clock fa-2xl"></i><p><em>Runtime:</em> ${json.Runtime}</p>
                        <i class="fa-solid fa-pen fa-2xl"></i><p><em>Writer:</em> ${json.Writer}</p>
                    </details>
                </div>
            `;
    
            list.appendChild(item);
    
        }
    
    }

    startMoviePage(){

        this.loadInfoRandomMovies();
        this.loadInfoRandomMovies();
        this.loadInfoRandomMovies();

    }

    searchMovies(){

        this.searchForm.onsubmit = (ev) => {

            ev.preventDefault();
            const search = ev.target.search.value;

            this.targetMovie = search;
            window.scrollTo(0, 0);

            if (search == '') {
                alert('Fill in the field, please.')
                return
            } else if (this.lastMovie !== search) {
                this.countPageBtn = 1;
            }
        
            fetch(`http://www.omdbapi.com/?apikey=${this.apiKey}&s=${search}&page=${this.pageNumber}`)
                .then(result => result.json())
                .then(json => this.loadMoviesList(json))
                .catch(error => console.log(error))

        }

    }

    loadMoviesList(json){   

        this.lastMovie = this.targetMovie;

        const list = document.querySelector('div.row');
        list.innerHTML = '';

        if (json.Response == 'False') {
            alert('Movie not found!');
            this.btnMoreMovies.classList.add('hidden');
            this.btnReturnMovies.classList.add('hidden');
            list.innerHTML = '';
            return
        } else if (json.totalResults > 10) {
            this.btnMoreMovies.classList.remove('hidden');
            if (this.countPageBtn > 1) {
                this.btnReturnMovies.classList.remove('hidden');
            } else {
                this.btnReturnMovies.classList.add('hidden');
            }
        } else if (json.totalResults <= 10) {
            this.btnMoreMovies.classList.add('hidden');
            this.btnReturnMovies.classList.add('hidden');
        }

        let movieAndPage = document.createElement('h2');
        movieAndPage.classList.add('text-center');
        movieAndPage.innerHTML = `'${this.targetMovie}' Search results, page nº${this.countPageBtn}.`;
        list.appendChild(movieAndPage);
        
        json.Search.forEach(element => {
    
            if (element.Poster == 'N/A') {
    
                let item = document.createElement('div');
                item.classList.add('col-lg-4');
        
                item.innerHTML = `
                    <div class="styles-movies">
                        <img class="bd-placeholder-img rounded-circle" width="200" height="200" src=${this.imgDefaultMoviePoster} role="img" preserveAspectRatio="xMidYMid slice" focusable="false" alt="img movie poster">
                        <h3 class="fw-normal">${element.Title}</h3>
                        <i class="fa-solid fa-calendar-days fa-2xl"></i><p>${element.Year}</p>
                        <i class="fa-solid fa-film fa-2xl"></i><p>${element.Type}</p>        
                    </div>
                `;
        
                list.appendChild(item);
                
            } else {
        
                let item = document.createElement('div');
                item.classList.add('col-lg-4');
        
                item.innerHTML = `
                    <div class="styles-movies">
                        <img class="bd-placeholder-img rounded-circle img-hover" width="200" height="200" src=${element.Poster} role="img" preserveAspectRatio="xMidYMid slice" focusable="false" alt="img movie poster">
                        <h3 class="fw-normal">${element.Title}</h3>
                        <i class="fa-solid fa-calendar-days fa-2xl"></i><p>${element.Year}</p>
                        <i class="fa-solid fa-film fa-2xl"></i><p>${element.Type}</p>
                    </div>
                `;
        
                list.appendChild(item);
        
            }
            
        });

    }

}