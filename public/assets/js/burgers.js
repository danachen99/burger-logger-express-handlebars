$(function() {
    //create/add burger when submitted
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
            data: newBurger
        }).then(
            function() {
                console.log("Added a new burger");
                location.reload();
            }
        );
    });

    $(".change-dev").on("click", event => {
        const id = $(this).data("id");
        const newDev = $(this).data("newdev");

        const devouredState = {
            devoured: newDev
        };

        //PUT request 
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        }).then(() => {
            console.log(`changed burger boolean to ${newDev}`);
            location.reload();
        });
    });
});