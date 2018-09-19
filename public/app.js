// //Scrape Button - posts to the site
// $("#scrape_btn").on("click",function(){
//     $.getJSON("/scrape", function(data){
//         // For each one
//         for (var i = 0; i < data.length; i++) {
//     //       // Display the apropos information on the page
//           $("#article_section").append(
//         // "<div class=" "container panel panel-default" "style=" "padding-top: 5px; padding-bottom: 5px" "id=" "container_5a73b73e86292500110b6ac0" ">"
//     //       "<div class=" "col-xs-8" ">" + data[i]._id + "</div>" "<a class=" "col-xs-2 btn btn-info notes_article" "value=" "5a73b73e86292500110b6ac0" "data-toggle=" "modal" "data-target=" "#5a73b73e86292500110b6ac0" ">" "Notes" "</a>"
//     //       "<button class=" "col-xs-2 btn btn-danger delete_article" "value=" "5a73b73e86292500110b6ac0" ">" "Delete Article" "</button>"
//     //       "<a class=" "col-xs-10" ">" + data[i].title + "<br />" + data[i].link + "</a>" "</div>");
//     //     }
//     //   });
//     // });
//               "<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//         }
//       });
//     //  $.getJSON('/articles', function(data){
//     //     for (var i = 0; i < data.length; i++) {
//     //         //       // Display the apropos information on the page
//     //               $("#article_section").append(
//     //                 "<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     //             }
//     //  })
//     });
// //Scrape Button - posts to the site
$('#scrape').on('click', function(event){
    event.preventDefault();

    $.get('/scrape', function(data){
        alert('Added 20 new articles!');
        //console.log("Scrape Complete"); 
    });
        
    
    $.getJSON('/articles', function(data){
        //console.log(data);
        for (var i=0; i < data.length; i++){
            $('#article_section').append(`<div class=container panel panel-default style= padding-top: 5px; padding-bottom: 5px id=container_5a73b73e86292500110b6ac0 > <div class=col-xs-8 >  </div> <button class=col-xs-2 btn btn-info notes_article value= 5a73b73e86292500110b6ac0 data-toggle= modal data-target= #5a73b73e86292500110b6ac0 > Notes </a>
                 <button class=col-xs-2 btn btn-danger delete_article value= 5a73b73e86292500110b6ac0 > Delete Article </button> <br>
                  <a class= col-xs-10 > <h4>${data[i].title} <h4> <br /> <a href= ${data[i].link}> ${data[i].link}</a> </div> <div class=container>
                  <!-- Modal -->
                  <div class=modal fade id=5a73b73e86292500110b6ac0 role=dialog>
                      <div class=modal-dialog>
                          <!-- Modal content-->
                          <div class=modal-content>
                              <div class=modal-header>
                                  <button type=button class=close data-dismiss=modal>&times;</button>
                                  <h4 class=modal-title>Notes for Article: </h4>
                              </div>
                              <div class=modal-body>
                                  <div class=note_container panel panel-default>
              
                                  </div>
                                  <div>
                                      <form>
                                          <div class=form-group>
                                              <label for=comment>Comment:</label>
                                              <textarea class=form-control rows=5 id=note_text_5a73b73e86292500110b6ac0 placeholder=Add a note></textarea>
                                          </div>
                                          <button type=submit class=btn btn-default submit_note value=5a73b73e86292500110b6ac0>Submit</button>
                                      </form>
                                  </div>
                              </div>
                          </div>
              
                      </div>
                  </div>
              
              </div>
            
              `);

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
     console.log(delete_info); 
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

