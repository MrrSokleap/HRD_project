$(function () {
    // $('#showModal').click(function(){
    //     $('#modalArticle').modal('show')
    //     $('#modalTitle').text('Add')
    // })
    // $('#save').click(function(){
    //    let article = {
    //        ID: $('#idArticle').val(),
    //        TITLE: $('#title').val(),
    //        DESCRIPTION: $('#desc').val()
    //    }
    //    console.log(article)
    //    if ($('#modalTitle').text() == "Add"){
    //     insertArticle(article)
    //    }else{
    //        updateArticle(article)
    //    }

    // })

    $('#search').keyup(function () {
        searchArticle($(this).val())
    })
    //
    // $(document).on('click', '.delete', function(e){
    //     console.log($(e.currentTarget).attr('data-id'))
    //     // let id = $(this).parents('tr').children().eq(0).text()
    //     deleteArticle($(e.currentTarget).attr('data-id'))
    // })
    // $(document).on('click', '.edit', function(e){
    //     let title = $(this).parents('tr').children().eq(0).text()
    //     let desc = $(this).parents('tr').children().eq(1).text()

    //     $('#title').val(title)
    //     $('#desc').val(desc)
    //     $('#idArticle').val($(e.currentTarget).attr('data-id'))
    //     // $('#modalArticle').modal('show')
    //     // $('#modalTitle').text('Update')
    // })



})

//load data from article.json
// function loadLocalJSON(){
//     var xhtp = new XMLHttpRequest()
//     xhtp.onreadystatechange = function(){
//         if (this.readyState == 4 && this.status == 200){
//             var o = JSON.parse(this.response);
//            appendToTable(o.DATA)
//         }
//     }
//     xhtp.open("GET", "../json/article.json", true);
//     xhtp.send()
// }
function loadArticle() {
    var xhtp = new XMLHttpRequest()
    xhtp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var o = JSON.parse(this.response);
            appendToTable(o.DATA, o.MESSAGE)

        }
    }
    xhtp.open("GET", "http://api-ams.me/v1/api/articles?page=1&limit=5", true);
    xhtp.send()
    //-------------other way with jquery-------------

    $.ajax({
        url: "http://api-ams.me/v1/api/articles?page=1&limit=15",
        method: "GET",
        success: function (res) {
            appendToTable(res.DATA, res.MESSAGE)
        },
        error: function (er) {
            console.log(er)
        }
    })
}
loadArticle()
function appendToTable(article, msg) {
    var content = "";
    for (a of article) {
        content += `
        <tr>
            <td><img class="img-responsive w-25" src=${a.IMAGE} /></td>
            <td class="tiltle">${a.TITLE}</td>
            <td class="description">${a.DESCRIPTION}</td>
            
        </tr>
    `
    }
    $('tbody').html(content)
    // toastr.success(`${msg}`)
}
function loadPhotos() {
    var xhtp = new XMLHttpRequest()
    xhtp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var o = JSON.parse(this.response);
            appendTable(o)
        }
    }
    xhtp.open("GET", "https://jsonplaceholder.typicode.com/photos", true);
    xhtp.send()
}
function appendTable(data) {
    var content = "";
    for (a of data) {
        content += `
        <tr>
             <td><img src=${a.thumbnailUrl} /></td>
            <td>${a.id}</td>
            <td>${a.title}</td>
            
        </tr>
    `
    }
    $('tbody').html(content)
}
// loadPhotos()

//insert article
// function insertArticle(article){
//     $.ajax({
//         url: "http://api-ams.me/v1/api/articles",
//         method: "POST",
//         headers: {
//             "content-type":"application/json"
//         },
//         data: JSON.stringify(article),
//         success: function(res){
//             loadArticle()
//             $('#modalArticle').modal('hide')
//         },
//         error: function(er){
//             console.log(er)
//         }
//     })
// }
function searchArticle(title) {
    $.ajax({
        url: `http://api-ams.me/v1/api/articles?title=${title}&page=1&limit=15`,
        method: "GET",
        success: function (res) {
            appendToTable(res.DATA, res.MESSAGE)
        },
        error: function (er) {
            console.log(er)
        }
    })
}
// function deleteArticle(id){
//     $.ajax({
//         url: `http://api-ams.me/v1/api/articles/${id}`,
//         method: "DELETE",
//         success: function(res){
//             toastr.info(`${res.MESSAGE}`)
//             loadArticle()
//             console.log("success delete")
//         }, 
//         error: function(er){
//             console.log(er)
//         }
//     })
// }
// function updateArticle(article){
//     $.ajax({
//         url: `http://api-ams.me/v1/api/articles/${article.ID}`,
//         method: "PUT",
//         headers: {
//             "content-type": "application/json"
//         },
//         data: JSON.stringify(article),
//         success: function(res){
//             loadArticle()
//             toastr.info(`${res.MESSAGE}`)
//             $('#modalArticle').modal('hide')
//         },
//         error: function(er){
//             console.log(er)
//         }
//     })
// }

//document ready
$(function () {
    //jQuery Ajax
    fetchArticle()


})

function fetchArticle() {
    $.ajax({
        url: "http://api-ams.me/v1/api/articles?page=1&limit=4",
        method: "GET",
        success: function (article) {
            // console.log(response)
            /*-------------display data to table and show message------*/
            // appendToTable(article.DATA, article.MESSAGE)
            loadCard(article.DATA, article.MESSAGE)
        },
        error: function (er) {
            console.log(er)
        }
    })
}

// function loadCard(article, msg) {
//     var content = ""
//     for (a of article) {
//         content += `
//         <div class="col-md-6 col-sm-6 col-lg-6">
//                 <div class="card">
//                     <img class="img" src=${a.IMAGE} alt="img">
//                     // <div class="card-body">
//                         <h4 class="title"> <a>${a.TITLE}</a></h4>
//                         // <p class="card-text">${a.DESCRIPTION}</p>
//                         // <a href="#" class="btn btn-primary">Button</a>
//                     // </div>
//                 </div>
//         </div>
//         `
//     }
//     $('.row').html(content)
//     toastr.success(`${msg}`)

// }