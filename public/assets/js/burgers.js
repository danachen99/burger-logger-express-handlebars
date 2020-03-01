$(function() {
    $(".change-dev").on("click", target => {
        // let id = $(this).data("id");
        // let newDev = $(this).data("newdev");
        let id = event.target.dataset.id;
        let newDev = event.target.dataset.newdev;

        let devouredState = {
            devoured: newDev
        };

        console.log(devouredState)

        //PUT request 
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        }).then(() => {
            console.log(`changed burger boolean to ${newDev}`);
            location.reload();
        });
    });

    //create/add burger when submitted
    $(".create-form").on("submit", event => {
        event.preventDefault();

        //get burger info from index.handlebars form 
        let newBurger = {
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


});