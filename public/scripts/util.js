// Create Blog using POST
// 'id' Selector for single button
$("#saveButton").on('click', async (event) => {
    event.preventDefault();

    // Get blog text
    let bloggerName = $("#nameInputBox").val();
    let bloggingTittle = $("#tittleInputBox").val();
    let bloggingData = $("#blogInputBox").val();

    if (!bloggerName && !bloggerName && !bloggingData) {
        alert("Create a Blog to save !");
        return;
    } else if (!bloggerName) {
        alert("Please write yor name !");
        return;
    } else if (!bloggingTittle) {
        alert("Please write blogging tittle !");
        return;
    } else if (!bloggingData) {
        alert("Please write your blog !");
        return;
    }

    let data = {
        name: bloggerName,
        tittle: bloggingTittle,
        blog: bloggingData
    };

    if (event.type === 'click' && bloggerName && bloggingTittle && bloggingData) {
        // Send blog text
        $.post('/save', data)
            .done((data, textStatus, jqXHR) => {
                if (jqXHR.status === 201) {
                    alert('Client: Blog post created successfully', data);
                    // Refresh the page
                    // true for a complete server refresh
                    window.location.reload(false);
                }
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                console.error('Client: Error creating blog post:', errorThrown);
            });
    }
});

// This code uses $.get to make an AJAX GET request to the /view URL with the specified postId.
// However this does not change the browser’s location.
// Instead it sends a request to the server and expects a response, but the user remains on the same page.
/*$(".blogViewButton").on('click', (event) => {
    if (event.type === 'click') {
        // Get the clicked button's ID
        const buttonId = event.target.id;
        // Send blog text
        $.get(`/view?postId=${buttonId}`);
    }
});*/

// ==> using 'class' Selector for multiple buttons
// Below we are using window.location.href = url; to change the browser’s location to the new URL.
// This effectively redirects the browser to the /view page with the specified postId.
// It works because it explicitly redirects the browser to the new URL.
$(".blogViewButton").on('click', async (event) => {
    try {
        event.preventDefault();
        if (event.type === 'click') {
            // Get the clicked button's ID
            const buttonId = event.target.id;
            // Send blog text
            let url = `/view?postId=${buttonId}`;
            window.location.href = url;
        }
    } catch (error) {
        console.log(`Client: Error in loading blog view page: ${error}`)
    }
});

$(".blogEditButton").on('click', async (event) => {
    event.preventDefault();
    if (event.type === 'click') {
        // Get the clicked button's ID
        const buttonId = event.target.id;
        // Send blog text
        let url = `/edit?postId=${buttonId}`;
        window.location.href = url;
    }
});

// Append Blog using POST
// 'id' Selector for single button
$("#appendButton").on('click', async (event) => {
    event.preventDefault();

    let bloggingTittle = $("#formControlInput2").val();
    let bloggingBody = $("#formControlTextarea").val();

    if (bloggingBody === 'NaN' || bloggingTittle === 'NaN' || (bloggingBody === 'NaN' && bloggingTittle === 'NaN')) {
        alert("Redirecting to BLOG page again");
        window.location.href = '/blogs';
        return;
    } else if (!bloggingBody || !bloggingTittle || (!bloggingBody && !bloggingTittle)) {
        alert("Input Fields are Empty !");
        window.location.href = '/blogs';
        return;
    }

    let data = {
        tittle: bloggingTittle,
        blog: bloggingBody
    };

    if (event.type === 'click' && bloggingBody) {
        // Get the clicked button's ID
        const fileName = $("#appendButton").attr('file');

        // Send blog text
        let url = `/append?fileName=${fileName}`;

        // Send blog text
        $.post(url, data)
            .done((data, textStatus, jqXHR) => {
                if (jqXHR.status === 201) {
                    alert('Client: Blog post updated successfully', data);
                    window.location.href = '/blogs';
                }
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                console.error('Client: Error updating blog post:', errorThrown);
            });
    }
});

$(".blogDeleteButton").on('click', async (event) => {
    event.preventDefault();
    if (event.type === 'click') {
        // Get the clicked button's ID
        const buttonId = event.target.id;

        $.post('/delete', {id : buttonId})
        .done((data, textStatus, jqXHR) => {
            if (jqXHR.status === 201) {
                alert('Blog post deleted successfully', data);
                // Refresh the page
                // true for a complete server refresh
                window.location.reload(false);
            }
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error('Client: Error in deleting blog post: ', errorThrown);
        });
    }
});