$(function(){

  function buildMessage(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
                  <div class="upper-info">
                    <div class="upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="upper-info__date">
                      ${message.data}
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
});
