// //Scrape Button - posts to the site
$("#scrape_btn").on("click",function(){
    $.getJSON("/scrape", function(data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
          // Display the apropos information on the page
          $("#article_section").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        }
      });
    });
 
 // Save Article
 $(".save_article").on("click",function(){
     console.log("something");
     var this_article = {
         title: $(this).attr("title"),
         link: $(this).attr("link"),
         // author:$(this).attr(".byline")
     };
     $.post("/save_article",this_article,function(data){
         alert("article saved: " + data.title)
     });
    });
  
 
 // Delete Article
 $(".delete_article").on("click",function(){
     var article = $(this).attr("value");
     var delete_info = {
         id: article
     };
     $.post("/delete_article",delete_info,function(data){
         $("#container_" + article).css("display","none");
     })
    });

    // Save Notes
 $(".submit_note").on("click",function(){
    var article_id = $(this).attr("value");
    var note = {
        id: article_id,
        text: $("#note_text_" + article_id).val()
    }
    $.post("/save_note",note,function(data){
        //alert("article saved: " + data.title);
        $("#" + article_id).modal('hide');
    })
});


// Delete Note
$(".delete_note").on("click",function(){
    var note = $(this).attr("value");
    var delete_info = {
        text: note
    }
    $.post("/delete_note",delete_info,function(data){
        $(".modal").modal('hide');
        location.reload();
    })
});

