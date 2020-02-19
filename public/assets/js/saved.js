$(document).ready(function () {

    // Responsive hamburger menu
    $(".navbar-burger").on("click", function () {
        $(".navbar-burger").toggleClass("is-active");
        $(".dropdown").toggle();
        $(".dropdown").toggleClass("is-open");
    });

    // Display saved articles on page load
    $.getJSON("/articles", function (data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            // if article has been marked as saved
            if (data[i].saved === true) {
                // Display the information on the page
                // $("#saved-results").append("<div class='saved-div'><p class='saved-text'>" + data[i].title + "<br>" + data[i].description +
                //     "</p><a class='unsave-button button is-danger is-medium' data-id='" +
                //     data[i]._id + "'>Remove</a><a class='comments-button button is-info is-medium' data-id='" + data[i]._id +
                //     "'><span class='icon'><i class='fa fa-comments'></i></span>Comments</a></div>");

                $("#saved-results").append(
                    $("<a class='article - link card-header' target='_blank' rel='noopener noreferrer'href={{}}>{{this.title}}</a>")
                        .attr("href", data[i].url)
                        .text(data[i].title)
                ).append("<div class= 'saved-div card-body'><p class='saved-text'>" + data[i].description +
                    "</p><a class='unsave-button button is-danger is-medium' data-id='" +
                    data[i]._id + "'>Remove</a><a class='comments-button button is-info is-medium' data-id='" + data[i]._id + "'<span class='icon'><i class='fa fa-comments'></i></span>Comments</a></div>")

            }
        }
    });

    // Comment button opens the comments modal & displays any comments
    $(document).on("click", ".comments-button", function () {
        // Open the comments modal
        $(".modal").toggleClass("is-active");
        // Get article by article ID
        var articleID = $(this).attr("data-id");
        // Now make an ajax call for the Article
        $.ajax({
            method: "GET",
            url: "/articles/" + articleID
        }).done(function (data) {
            // Update modal header
            $("#comments-header").html("Article Comments (ID: " + data._id + ")");
            // If the article has comments
            if (data.comments.length !== 0) {
                // Clear out the comment div
                $("#comments-list").empty();
                for (i = 0; i < data.comments.length; i++) {
                    // Append all article comments
                    $("#comments-list").append("<div class='comment-div'><p class='comment'>" + data.comments[i].body + "</p></div>");
                }
            }
            // Append save comment button with article's ID saved as data-id attribute
            $("footer.modal-card-foot").html("<button id='save-comment' class='button is-success' data-id='" + data._id + "'>Save Comment</button>")
        });
    });

    // Modal X button closes modal and removes comments
    $(document).on("click", ".delete", function () {
        $(".modal").toggleClass("is-active");
        $("#comments-list").html("<p>Write the first comment for this article.</p>");
    });

    // Saving Comments
    $(document).on("click", "#save-comment", function () {
        // Grab the id associated with the article from the submit button
        var articleID = $(this).attr("data-id");
        // Run a POST request to add a comment, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/comment/" + articleID,
            data: {
                // Value taken from body input
                body: $("#new-comment-field").val()
            }
        }).done(function (data) {
            // Log the response
            console.log("data: ", data);
        });

        // Also, remove the values entered in the inputs for comment entry
        $("#new-comment-field").val("");
        // Close comment modal
        $(".modal").toggleClass("is-active");
    });

    // Deleting Comments
    $(document).on("click", ".delete-comment", function () {
        // delete comment
    });

    // Removing Saved Articles
    $(document).on("click", ".unsave-button", function () {
        // Get article id
        var articleID = $(this).attr("data-id");
        console.log(articleID);
        // Run a POST request to update the article to be saved
        $.ajax({
            method: "POST",
            url: "/unsave/" + articleID,
            data: {
                saved: false
            }
        });
    });

});