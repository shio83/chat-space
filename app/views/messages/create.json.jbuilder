json.id         @message.id
json.content    @message.content
json.data       @message.created_at.strftime('%Y/%m/%d %R')
json.user_name  @message.user.name
json.image      @message.image.url