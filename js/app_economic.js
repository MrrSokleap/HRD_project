function loadArticle(){
        var xhtp = new XMLHttpRequest()
        xhtp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                var o = JSON.parse(this.response);
               for(res of o.DATA){
               console.log(o.DATA);
               addToCard(o.DATA)
              
                 }
             }
         };
        xhtp.open("GET", "../../json/economic.json", true);
        xhtp.send()
    }
    loadArticle()

    function addToCard(article, msg) {
        var content = ''
        for (a of article) {
            content += `
            <div class="col-md-3 py-3">
                <img class="card-img-top" src=${a.IMAGE} alt="Card image cap">
                    <div class="card-body p-2">
                        <h6 class="card-title"> <a>${a.TITLE}</a></h6>
                    </div>
                </div>
            
            </div>
             `
        }
        $('.row').html(content) 
        
    }