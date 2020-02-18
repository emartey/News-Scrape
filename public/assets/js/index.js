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
            $("h3").append(
                $("<a class='article - link card-header' target='_blank' rel='noopener noreferrer'href={{this.url}}>{{this.title}}</a>")
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
});


    // function createCard(article) {
    //     // This function takes in a single JSON object for an article/headline
    //     // It constructs a jQuery element containing all of the formatted HTML for the
    //     // article card
    //     var card = $("<div class='card'>");
    //     var cardHeader = $("<div class='card-header'>").append(
    //         $("<h3>").append(
                // $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
                //     .attr("href", data.url)
                //     .text(data.title)
    //         )
    //     );

    //     var cardBody = $("<div class='card-body'>").text(article.summary);

    //     card.append(cardHeader, cardBody);
    //     // We attach the article's id to the jQuery element
    //     // We will use this when trying to figure out which article the user wants to save
    //     card.data("_id", article._id);
    //     // We return the constructed card jQuery element
    //     return card;
    // }