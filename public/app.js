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
            $('#article_section').append(`<div class=container panel panel-default style= padding-top: 5px; padding-bottom: 5px id=container_5a73b73e86292500110b6ac0 > <div class=col-xs-8 ><h4> ${data[i].title} <h4></div> <button class=col-xs-2 btn btn-info submit_note data-toggle= modal data-target= #5a73b73e86292500110b6ac0 > Notes </a>
                 <button class=col-xs-2 btn btn-danger delete_article value= 5a73b73e86292500110b6ac0 > Delete Article </button> <br>
                  <a class= col-xs-10 >  ${data[i]._id}  <br /> <a href= ${data[i].link}> ${data[i].link}</a> </div> <div class=container> <br>
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
 $("#saved_articles_btn").on("click",function(){
     console.log("SAVED");
     app.get("/articles", function(req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
          .then(function(dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
             res.sendFile(path.join(__dirname, "../ScrapperMongoDB/public/saved_articles.html"));
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          })
     
     
     $.post("/saved_articles",articles,function (data){
         alert("Articles Saved");
     })
    })
});
 
 // Delete Article
 $(".delete_article").on("click",function(){
     $(this).remove();
     
    });

    // Save Notes
 $(".submit_note").on("click",function(){
     // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("_id");
  var baseURL = window.location.origin;

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
      console.log(submit_note); 
    });
});

// When you click the savenote button

//});


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

