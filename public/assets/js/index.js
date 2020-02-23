$(document).ready(function () {

    // Responsive hamburger menu
    $(".navbar-burger").on("click", function () {
        $(".navbar-burger").toggleClass("is-active");
        $(".dropdown").toggle();
        $(".dropdown").toggleClass("is-open");
    });

    // Grab the articles as a json when page loads, append to the page
    $.getJSON("/articles", function (data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the information on the page
            $(".card").append(
                $("<a class='article - link card-header' target='_blank' rel='noopener noreferrer'href={{}}>{{this.title}}</a>")
                    .attr("href", data[i].url)
                    .text(data[i].title)
            ).append("<div class= 'card-body'><p class= 'result-text'>" + data[i].description +
                "</p><button class='save-article button is-info is-medium' data-id='" + data[i]._id + "'><span class='icon'><i class='fa fa-bookmark'></i></span>Save Article</button></div>")

        }

    });

    // Save article button changes the saved property of the article model from false to true
    $(document).on("click", ".save-article", function () {
        // change icon to check mark
        $(this).children("span.icon").children("i.fa-bookmark").removeClass("fa-bookmark").addClass("fa-check-circle");
        // Get article id
        var articleID = $(this).attr("data-id");
        console.log(articleID);
        // Run a POST request to update the article to be saved
        $.ajax({
            method: "POST",
            url: "/save/" + articleID,
            data: {
                saved: true
            }
        }).done(function (data) {
            // Log the response
            console.log("data: ", data);
        });
    });

    // Clear all articles from db
    $(document).on("click", ".button is-danger", function () {
        $.ajax({
            method: "GET",
            url: "/articles/"
        }).deleteMany({}, function (err) {
            if (err) console.log(err);
            console.log("Successful deletion");
        });
    });
});
