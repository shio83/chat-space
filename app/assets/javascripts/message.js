$(function(){

  function buildMessage(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-info">
                    <div class="upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="upper-info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-info">
                    <p class="lower-info__text">
                      ${content}
                    </p>
                      ${img}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.form__mask').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'slow');
    })
    .fail(function(message){ 
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(message){
      $('.form__submit').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");

      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })

      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildMessage(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'slow');
        })
      })

      .fail(function() {
        alert('自動更新失敗');
      });

    }
  };
  setInterval(reloadMessages, 5000);
});
