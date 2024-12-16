$(document).ready(function () {
    // Scroll to top button.
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll-to-top').fadeIn();
        } else {
            $('#scroll-to-top').fadeOut();
        }
    });

    $('#scroll-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    // Animated scrolling
    $('a[href^="#"]').click(function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 800);
    });
});
let commentsArray = JSON.parse(localStorage.getItem('comments')) || [];

// function to load comments from local storage when the page loads
window.onload = function () {
    // if there are comments in the array, display them
    if (commentsArray.length > 0) {
        commentsArray.forEach(displayComment);
    }
};

// handle comment form submission
document.getElementById("commentForm").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent form submission

    const userName = document.getElementById("userName").value;
    const commentText = document.getElementById("commentText").value;

    if (userName && commentText) {
        const currentDate = new Date();
        const commentDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

        // create a comment object
        const comment = {
            name: userName,
            text: commentText,
            date: commentDate
        };


        // add comment to the array
        commentsArray.push(comment);

        // save the updated array to localStorage
        localStorage.setItem("comments", JSON.stringify(commentsArray));

        // display the comment in the comments section
        displayComment(comment);

        // clear the input fields
        document.getElementById("userName").value = '';
        document.getElementById("commentText").value = '';
    } else {
        alert("Please enter both a name and a comment.");
    }
});

// function to display a comment
function displayComment(comment) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const commentName = document.createElement("div");
    commentName.classList.add("comment-name");
    commentName.textContent = comment.name;

    const commentDate = document.createElement("div");
    commentDate.classList.add("comment-date");
    commentDate.textContent = comment.date;

    const commentText = document.createElement("div");
    commentText.classList.add("comment-text");
    commentText.textContent = comment.text;

    commentDiv.appendChild(commentName);
    commentDiv.appendChild(commentDate);
    commentDiv.appendChild(commentText);

    document.getElementById("commentsList").appendChild(commentDiv);
}// JavaScript source code
window.onload = function () {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
        commentsArray = JSON.parse(storedComments);
        console.log("Loaded comments:", commentsArray); // Debugging line
        commentsArray.forEach(displayComment);
    } else {
        console.log("No comments found in localStorage.");
    }
};
