$(function() {
    $(".create-form").on("submit", event => {
        event.preventDefault();

        //get burger info from index.handlebars form 
        const newBurger = {
            name: $("#bur").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };

        //POST request 
        $.ajax("/api/burgers", {
            type: "POST",
            data: newCat
        }).then(
            function() {
                console.log("Added a new burger");
                location.reload();
            }
        );
    });
})